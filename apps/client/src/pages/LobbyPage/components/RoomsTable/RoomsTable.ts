import { type RoomPreview, ROOM_PREVIEW_FIELDS } from '@types';
import { BaseComponent } from '@ComponentsAPI';
import { RoomRow } from '@pages/LobbyPage/components';
import { TABLE_CLASSES } from '@constants/styles';
import store from '@store';
import { socketClient } from '@SocketClientAPI';
import { SocketActionTypes } from '@actions';
import { t } from '@i18n';
import { TranslationKeys } from '@i18n/translationKeys';

export default class RoomsTable extends BaseComponent {
  private rooms: RoomPreview[] = [];
  private tbody: BaseComponent;
  private thRoom: BaseComponent | null = null;
  private thPlayers: BaseComponent | null = null;
  private thStatus: BaseComponent | null = null;
  private roomComponents: RoomRow[] = [];

  constructor() {
    super({ tag: 'table', classes: TABLE_CLASSES.TABLE });

    this.tbody = new BaseComponent({ tag: 'tbody', classes: TABLE_CLASSES.TBODY.TBODY });

    this.render();

    this.subscribeToState();
    this.subscribeToSocket();

    store.dispatch({ type: SocketActionTypes.SOCKET_REQUEST_ROOM_LIST });
  }

  private render(): void {
    this.appendChildren([this.createHeader(), this.tbody]);
  }

  private createHeader(): BaseComponent {
    const thead = new BaseComponent({ tag: 'thead' });
    const tr = new BaseComponent({ tag: 'tr', classes: TABLE_CLASSES.THEAD.TR });

    this.thRoom = new BaseComponent({
      tag: 'th',
      content: t(TranslationKeys.ROOMS_TABLE_HEADER_TITLES_ROOM),
      classes: TABLE_CLASSES.THEAD.TH.FIRST,
    });

    tr.appendChildren(this.thRoom);

    this.thPlayers = new BaseComponent({
      tag: 'th',
      content: t(TranslationKeys.ROOMS_TABLE_HEADER_TITLES_PLAYERS),
      classes: TABLE_CLASSES.THEAD.TH.BASE,
    });
    tr.appendChildren(this.thPlayers);

    this.thStatus = new BaseComponent({
      tag: 'th',
      content: t(TranslationKeys.ROOMS_TABLE_HEADER_TITLES_STATUS),
      classes: TABLE_CLASSES.THEAD.TH.BASE,
    });
    tr.appendChildren(this.thStatus);

    const thEmpty = new BaseComponent({
      tag: 'th',
      classes: TABLE_CLASSES.THEAD.TH.BASE,
    });
    tr.appendChildren(thEmpty);

    thead.appendChildren(tr);

    return thead;
  }

  private isRoom(component: BaseComponent): component is RoomRow {
    return component instanceof RoomRow;
  }

  private subscribeToState(): void {
    store.subscribe((state) => {
      const newRooms = state.rooms;

      for (const newRoom of newRooms)
        if (!this.rooms.some((room) => room.id === newRoom.id)) this.addRoom(newRoom);
    });
  }

  private subscribeToSocket(): void {
    socketClient.onRoomList(({ roomPreviews }) => {
      for (const roomPreview of roomPreviews) {
        const existing = this.rooms.find((room) => room.id === roomPreview.id);

        if (existing) this.updateRoom(existing.id, roomPreview);
        else this.addRoom(roomPreview);
      }
    });

    socketClient.onRoomCreated(({ roomPreview }) => {
      this.addRoom(roomPreview);
    });

    socketClient.onRoomUpdated(({ roomPreview }) => {
      this.updateRoom(roomPreview.id, roomPreview);
    });
  }

  public addRoom(room: RoomPreview): void {
    this.rooms.push(room);
    const newRoom = new RoomRow(room);
    this.roomComponents.push(newRoom);
    this.tbody.appendChildren(newRoom);
  }

  public updateRoomField<K extends keyof RoomPreview>(
    id: string,
    key: K,
    value: RoomPreview[K]
  ): void {
    const rows = this.getRoomsByField(ROOM_PREVIEW_FIELDS.ID, id);

    for (const row of rows) row.updateField(key, value);

    const room = this.rooms.find((room) => room.id === id);

    if (room) room[key] = value;
  }

  public updateRoomPlayers(id: string, count: number): void {
    const rows = this.getRoomsByField(ROOM_PREVIEW_FIELDS.ID, id);

    for (const row of rows) row.updatePlayers(count);

    const room = this.rooms.find((room) => room.id === id);

    if (room) room.playerCount = count;
  }

  public getRoomsByField<K extends keyof RoomPreview>(key: K, value: RoomPreview[K]): RoomRow[] {
    const result: RoomRow[] = [];

    for (const child of this.tbody.children) {
      if (this.isRoom(child)) {
        const roomValue = child.room[key];

        if (typeof roomValue === 'string' && typeof value === 'string') {
          if (roomValue.toLowerCase() === value.toLowerCase()) result.push(child);
        } else if (roomValue === value) result.push(child);
      }
    }

    return result;
  }

  private updateRoom(roomId: string, newData: RoomPreview): void {
    this.updateRoomField(roomId, ROOM_PREVIEW_FIELDS.NAME, newData.name);
    this.updateRoomField(roomId, ROOM_PREVIEW_FIELDS.STATUS, newData.status);
    this.updateRoomPlayers(roomId, newData.playerCount);
    this.updateRoomField(roomId, ROOM_PREVIEW_FIELDS.MAX_PLAYERS, newData.maxPlayers);
  }

  public getAllRows(): RoomRow[] {
    return this.tbody.children.filter((child) => this.isRoom(child));
  }

  public switchLanguage(): void {
    if (!this.thRoom || !this.thPlayers || !this.thStatus) return;
    this.thRoom.setContent(t(TranslationKeys.ROOMS_TABLE_HEADER_TITLES_ROOM));
    this.thPlayers.setContent(t(TranslationKeys.ROOMS_TABLE_HEADER_TITLES_PLAYERS));
    this.thStatus.setContent(t(TranslationKeys.ROOMS_TABLE_HEADER_TITLES_STATUS));
    for (const room of this.roomComponents) {
      room.switchLanguage();
    }
  }
}
