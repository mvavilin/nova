import { ROOM_STATUS_RU, type RoomPreview, ROOM_PREVIEW_FIELDS } from '@types';
import { BaseComponent } from '@ComponentsAPI';
import { JoinButton } from '@components';
import { TABLE_CLASSES } from '@constants/styles';

export default class RoomRow extends BaseComponent {
  private nameTd: BaseComponent;
  private playersTd: BaseComponent;
  private statusTd: BaseComponent;
  private actionTd: BaseComponent;
  private joinButton: JoinButton | null = null;

  constructor(private room: RoomPreview) {
    super({ tag: 'tr', id: room.id, classes: TABLE_CLASSES.TBODY.TR });

    this.nameTd = new BaseComponent({
      tag: 'td',
      content: room.name,
      classes: TABLE_CLASSES.TBODY.TD.FIRST,
    });

    this.playersTd = new BaseComponent({
      tag: 'td',
      content: this.playersText,
      classes: TABLE_CLASSES.TBODY.TD.BASE,
    });

    this.statusTd = new BaseComponent({
      tag: 'td',
      content: ROOM_STATUS_RU[room.status],
      classes: TABLE_CLASSES.TBODY.TD.BASE,
    });

    this.actionTd = new BaseComponent({
      tag: 'td',
      classes: TABLE_CLASSES.TBODY.TD.BASE,
    });

    this.render();
  }

  private render(): void {
    this.syncJoinButton();

    this.appendChildren([this.nameTd, this.playersTd, this.statusTd, this.actionTd]);
  }

  private get playersText(): string {
    return `${this.room.playerCount}/${this.room.maxPlayers}`;
  }

  public getRoomId(): string {
    return this.room.id;
  }

  public removeRoom(): void {
    this.destroy();
  }

  public updateField<K extends keyof RoomPreview>(key: K, value: RoomPreview[K]): void {
    this.room[key] = value;
    this.reRenderField(key);
  }

  public updatePlayers(count: number): void {
    this.room.playerCount = count;
    this.playersTd.setContent(this.playersText);

    this.syncJoinButton();
  }

  public syncJoinButton(): void {
    if (this.room.playerCount < this.room.maxPlayers) {
      this.addJoinButton();
    } else {
      this.removeJoinButton();
    }
  }

  private addJoinButton(): void {
    if (this.joinButton) return;

    this.joinButton = new JoinButton({ roomId: this.room.id, isCustom: true });
    this.actionTd?.appendChildren(this.joinButton);
  }

  private removeJoinButton(): void {
    this.joinButton?.destroy();
    this.joinButton = null;
  }

  private reRenderField(key: keyof RoomPreview): void {
    if (key === ROOM_PREVIEW_FIELDS.NAME) {
      this.nameTd.setContent(this.room.name);
    }

    if (key === ROOM_PREVIEW_FIELDS.STATUS) {
      this.statusTd.setContent(ROOM_STATUS_RU[this.room.status]);
    }

    if (key === ROOM_PREVIEW_FIELDS.PLAYER_COUNT || key === ROOM_PREVIEW_FIELDS.MAX_PLAYERS) {
      this.playersTd.setContent(this.playersText);
      this.syncJoinButton();
    }
  }
}
