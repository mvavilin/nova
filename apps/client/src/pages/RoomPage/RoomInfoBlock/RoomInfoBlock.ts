import { ButtonComponent, ContainerComponent, TextComponent } from '@/api/ComponentsAPI';
import type { RoomInfoBlockProps } from './RoomInfoBlock.types';
import { TranslationKeys } from '@/i18n/translationKeys';
import { t } from '@/i18n';
import store from '@/store/store';
import { SocketActionTypes } from '@/store/actions';
import type { RoomInfo } from '@shared/types/room';
import { Timer } from '@/pages/GamePage/components';

const styles = {
  container:
    'min-w-[350px] flex justify-center max-[950px]:flex-col max-[950px]:justify-between items-center gap-8 text-white text-2xl font-bold bg-white/25 px-4 py-4 rounded',
  textContainerRow: 'w-full flex gap-2 items-center',
  textContainerCol: 'flex flex-col self-center',
  span: 'text-brand truncate',
  button:
    'w-34 h-12 shrink-0 bg-cyan-600 rounded-md whitespace-normal leading-tight text-base hover:cursor-pointer hover:bg-green-600 hover:transition-colors hover:duration-300',
  timerContainer:
    'h-full p-2 bg-green-600/70 flex flex-col justify-center items-center gap-5 text-brand text-2xl font-bold transition-all duration-500 opacity-0 scale-95 -> opacity-100 scale-100 rounded hidden',
  timerMessage: 'text-center',
};

export default class RoomInfoBlock extends ContainerComponent {
  private roomTitle: TextComponent | null = null;
  private playersTitle: TextComponent | null = null;
  private playersCount: TextComponent | null = null;
  private leaveButton: ButtonComponent | null = null;
  private timerContainer: ContainerComponent | null = null;
  private timer: Timer | null = null;
  private timerMessage: TextComponent | null = null;

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

    this.timerContainer = new ContainerComponent({ classes: styles.timerContainer });
    this.timer = new Timer(0, true);
    this.timerMessage = new TextComponent({
      classes: styles.timerMessage,
      content: t(TranslationKeys.ROOM_TIMER_MESSAGE),
    });
    this.timerContainer.appendChildren([this.timerMessage, this.timer]);

    this.appendChildren([textContainerColumn, this.timerContainer, this.leaveButton]);
  }

  private leaveRoom(): void {
    this.timer?.stop();
    this.hideTimer();

    store.dispatch({
      type: SocketActionTypes.LEAVE_ROOM,
    });
  }

  public showTimer(duration: number): void {
    if (!this.timerContainer || !this.timer) return;

    this.timerContainer.removeClasses('hidden');
    this.timer.reset(duration, true);
    this.timer.onEnd = (): void => {
      this.sendReadyStatus();
    };
  }

  private sendReadyStatus(): void {
    store.dispatch({
      type: SocketActionTypes.GAME_ADD_PLAYER,
    });

    this.hideTimer();
  }

  public hideTimer(): void {
    if (!this.timerContainer || !this.timer) return;
    this.timerContainer.setClasses('hidden');
    this.timer.stop();
  }

  public handlePlayerCounts(room: RoomInfo): void {
    if (!this.playersCount) return;
    this.playersCount.setContent(room.playerCount);
  }

  public switchLanguage(): void {
    if (!this.roomTitle || !this.playersTitle || !this.leaveButton || !this.timerMessage) return;

    this.roomTitle.setContent(t(TranslationKeys.ROOM_INFO_TITLE));
    this.playersTitle.setContent(t(TranslationKeys.ROOM_INFO_PLAYERS));
    this.leaveButton.setContent(t(TranslationKeys.ROOM_LEAVE_ROOM_BTN));
    this.timerMessage.setContent(t(TranslationKeys.ROOM_TIMER_MESSAGE));
  }

  public destroyComponent(): void {
    this.roomTitle = null;
    this.playersTitle = null;
    this.playersCount = null;
    this.leaveButton = null;
    this.timerContainer = null;
    this.timer = null;
    this.timerMessage = null;

    this.destroyChildren();

    super.destroy();
  }
}
