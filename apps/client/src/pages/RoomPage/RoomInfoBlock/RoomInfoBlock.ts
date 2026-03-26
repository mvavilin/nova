import { ButtonComponent, ContainerComponent, TextComponent } from '@/api/ComponentsAPI';
import type { RoomInfoBlockProps } from './RoomInfoBlock.types';
import { TranslationKeys } from '@/i18n/translationKeys';
import { t } from '@/i18n';
import store from '@/store/store';
import { SocketActionTypes } from '@/store/actions';
import type { RoomInfo } from '@shared/types/room';

const styles = {
  container:
    'w-[512px] max-[640px]:w-[350px] flex flex-wrap justify-center min-[640px]:justify-between items-center gap-5 text-white text-2xl font-bold bg-white/25 px-4 py-4 rounded',
  textContainerRow: 'w-full flex gap-2 items-center',
  textContainerCol: 'flex flex-col self-center',
  span: 'text-brand truncate',
  button:
    'w-34 h-12 shrink-0 bg-cyan-600 rounded-md whitespace-normal leading-tight text-base hover:cursor-pointer hover:bg-green-600 hover:transition-colors hover:duration-300',
};

export default class RoomInfoBlock extends ContainerComponent {
  private roomTitle: TextComponent | null = null;
  private playersTitle: TextComponent | null = null;
  private playersCount: TextComponent | null = null;
  private leaveButton: ButtonComponent | null = null;

  constructor({ roomName, currentCount, totalCount }: RoomInfoBlockProps) {
    super({ classes: styles.container });

    this.render({ roomName, currentCount, totalCount });
  }

  private render({ roomName, currentCount, totalCount }: RoomInfoBlockProps): void {
    const textContainerColumn = new ContainerComponent({
      classes: styles.textContainerCol,
    });
    const textContainerRoomRow = new ContainerComponent({
      classes: styles.textContainerRow,
    });
    const textContainerCountRow1 = new ContainerComponent({
      classes: 'flex',
    });
    const textContainerCountRow2 = new ContainerComponent({
      classes: styles.textContainerRow,
    });

    this.roomTitle = new TextComponent({
      content: t(TranslationKeys.ROOM_INFO_TITLE),
    });
    const name = new TextComponent({ content: roomName, classes: styles.span });
    textContainerRoomRow.appendChildren([this.roomTitle, name]);

    this.playersTitle = new TextComponent({
      content: t(TranslationKeys.ROOM_INFO_PLAYERS),
    });

    this.playersCount = new TextComponent({
      content: `${currentCount}`,
      classes: styles.span,
    });
    const allCount = new TextComponent({
      content: `/${totalCount}`,
      classes: styles.span,
    });

    textContainerCountRow1.appendChildren([this.playersCount, allCount]);
    textContainerCountRow2.appendChildren([this.playersTitle, textContainerCountRow1]);

    textContainerColumn.appendChildren([textContainerRoomRow, textContainerCountRow2]);

    this.leaveButton = new ButtonComponent({
      classes: styles.button,
      content: t(TranslationKeys.ROOM_LEAVE_ROOM_BTN),
      listeners: {
        click: (): void => this.leaveRoom(),
      },
    });

    this.appendChildren([textContainerColumn, this.leaveButton]);
  }

  private leaveRoom(): void {
    store.dispatch({
      type: SocketActionTypes.LEAVE_ROOM,
    });
  }

  public handlePlayerCounts(room: RoomInfo): void {
    if (!this.playersCount) return;
    this.playersCount.setContent(room.playerCount);
  }

  public switchLanguage(): void {
    if (!this.roomTitle || !this.playersTitle || !this.leaveButton) return;

    this.roomTitle.setContent(t(TranslationKeys.ROOM_INFO_TITLE));
    this.playersTitle.setContent(t(TranslationKeys.ROOM_INFO_PLAYERS));
    this.leaveButton.setContent(t(TranslationKeys.ROOM_LEAVE_ROOM_BTN));
  }

  public destroyComponent(): void {
    this.roomTitle = null;
    this.playersTitle = null;
    this.playersCount = null;
    this.leaveButton = null;

    this.destroyChildren();

    super.destroy();
  }
}
