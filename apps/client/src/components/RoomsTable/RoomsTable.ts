import { ROOM_STATUS_RU, type RoomPreview } from '@types';
import { BaseComponent } from '@ComponentsAPI';
import { Button } from '@components/ui';

const HEADER_TITLES = ['Комната', 'Игроков', 'Статус', ''];
const roomsData: RoomPreview[] = [
  { id: '1', name: 'js-masters', playerCount: 3, maxPlayers: 4, status: 'waiting' },
  { id: '2', name: 'python-pro', playerCount: 2, maxPlayers: 4, status: 'waiting' },
  { id: '3', name: 'fronted-legends', playerCount: 4, maxPlayers: 4, status: 'playing' },
  { id: '4', name: 'backend-warriors', playerCount: 1, maxPlayers: 4, status: 'waiting' },
];

const CELL_BASE = 'truncate overflow-hidden whitespace-nowrap';
const GRID_ROW = 'w-full grid grid-cols-[3fr_2fr_3fr_2fr] px-3';
const TABLE_CLASSES = {
  TABLE: 'w-full flex flex-col gap-2 border-collapse border-0 p-0 m-0 flex-1 overflow-y-hidden',
  THEAD: {
    TR: GRID_ROW,
    TH: {
      FIRST: `text-left`,
      BASE: `text-center`,
    },
  },
  TBODY: {
    TBODY: `flex-1 flex flex-col gap-2 overflow-y-auto max-h-70`,
    TR: `${GRID_ROW} text-black bg-white rounded py-1`,
    TD: {
      FIRST: `${CELL_BASE} text-left`,
      BASE: `${CELL_BASE} text-center`,
    },
  },
};

export default class RoomsTable extends BaseComponent {
  private rooms: RoomPreview[] = roomsData;

  constructor() {
    super({ tag: 'table', classes: TABLE_CLASSES.TABLE });
    this.render();
  }

  private render(): void {
    this.appendChildren([this.createHeader(), this.createBody()]);
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

    for (const room of this.rooms) {
      const tr = new BaseComponent({ id: room.id, tag: 'tr', classes: TABLE_CLASSES.TBODY.TR });

      const nameTd = new BaseComponent({
        tag: 'td',
        content: room.name,
        classes: TABLE_CLASSES.TBODY.TD.FIRST,
      });

      const playersTd = new BaseComponent({
        tag: 'td',
        content: `${room.playerCount}/${room.maxPlayers}`,
        classes: TABLE_CLASSES.TBODY.TD.BASE,
      });

      const statusTd = new BaseComponent({
        tag: 'td',
        content: ROOM_STATUS_RU[room.status],
        classes: TABLE_CLASSES.TBODY.TD.BASE,
      });

      const emptyTd = new BaseComponent({
        tag: 'td',
        content: '',
        classes: TABLE_CLASSES.TBODY.TD.BASE,
      });

      if (room.playerCount < room.maxPlayers)
        emptyTd.appendChildren(
          new Button({
            content: 'Вступить',
            classes: 'text-xs bg-green-600 hover:bg-green-700 mx-auto',
            onClick: (): void => {
              console.log('Вступаем в комнату с id:', room.id);
            },
          })
        );

      tr.appendChildren([nameTd, playersTd, statusTd, emptyTd]);
      tbody.appendChildren(tr);
    }

    return tbody;
  }
}
