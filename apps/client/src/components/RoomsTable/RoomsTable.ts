import { type RoomPreview, ROOM_PREVIEW_FIELDS } from '@types';
import { BaseComponent } from '@ComponentsAPI';
import { RoomRow } from '@components';
import { TABLE_CLASSES, HEADER_TITLES } from '@constants/styles';
import { initialRooms } from '@__mocks__';

export default class RoomsTable extends BaseComponent {
  private rooms: RoomPreview[] = [];
  private tbody: BaseComponent;

  constructor() {
    super({ tag: 'table', classes: TABLE_CLASSES.TABLE });

    this.rooms = initialRooms;
    this.tbody = this.createBody();

    this.render();
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

  private createBody(): BaseComponent {
    const tbody = new BaseComponent({ tag: 'tbody', classes: TABLE_CLASSES.TBODY.TBODY });

    for (const room of this.rooms) tbody.appendChildren(new RoomRow(room));

    return tbody;
  }

  private isRoom(component: BaseComponent): component is RoomRow {
    return component instanceof RoomRow;
  }

  public getRoomsByField<K extends keyof RoomPreview>(key: K, value: RoomPreview[K]): RoomRow[] {
    const result: RoomRow[] = [];

    for (const child of this.tbody.children) {
      if (this.isRoom(child)) {
        const roomValue = child['room'][key];

        if (typeof roomValue === 'string' && typeof value === 'string') {
          if (roomValue.toLowerCase() === value.toLowerCase()) {
            result.push(child);
          }
        } else if (roomValue === value) {
          result.push(child);
        }
      }
    }

    return result;
  }

  public addRoom(room: RoomPreview): void {
    this.rooms.push(room);
    this.tbody.appendChildren(new RoomRow(room));
  }

  public removeRoom(id: string): void {
    const rows = this.getRoomsByField(ROOM_PREVIEW_FIELDS.ID, id);

    for (const row of rows) row.removeRoom();

    this.rooms = this.rooms.filter((room) => room.id !== id);
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

  public getAllRows(): RoomRow[] {
    return this.tbody.children.filter((child) => this.isRoom(child));
  }

  public clearRooms(): void {
    this.tbody.destroyChildren();
    this.rooms = [];
  }
}
