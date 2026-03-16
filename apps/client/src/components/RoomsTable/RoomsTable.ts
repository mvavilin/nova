import { type RoomPreview, ROOM_PREVIEW_FIELDS } from '@types';
import { BaseComponent } from '@ComponentsAPI';
import { RoomRow } from '@components';
import { TABLE_CLASSES, HEADER_TITLES } from '@constants/styles';
import store from '@store';
import { socketClient } from '@SocketClientAPI';
import { SocketActionTypes } from '@actions';

export default class RoomsTable extends BaseComponent {
  private rooms: RoomPreview[] = [];
  private tbody: BaseComponent;

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

    for (const [index, text] of HEADER_TITLES.entries()) {
      const th = new BaseComponent({
        tag: 'th',
        content: text,
        classes: (index === 0 ? TABLE_CLASSES.THEAD.TH.FIRST : TABLE_CLASSES.THEAD.TH.BASE).trim(),
      });

      tr.appendChildren(th);
    }

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
    this.tbody.appendChildren(new RoomRow(room));
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
}
