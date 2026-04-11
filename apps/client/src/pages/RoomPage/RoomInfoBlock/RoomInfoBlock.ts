import { ButtonComponent, ContainerComponent, TextComponent } from '@/api/ComponentsAPI';
import type { RoomInfoBlockProps } from './RoomInfoBlock.types';
import { TranslationKeys } from '@/i18n/translationKeys';
import { t } from '@/i18n';
import store from '@/store/store';
import { SocketActionTypes } from '@/store/actions';
import type { RoomInfo } from '@shared/types/room';
import { Timer } from '@/pages/GamePage/components';
import { Toast } from '@/components';
import MessageType from '@constants/messageType';

const styles = {
  container:
    'flex flex-col justify-center max-[640px]:w-full sm:flex-row sm:justify-between items-center gap-8 text-white text-xl min-[450px]:text-2xl font-bold bg-white/25 px-4 py-4 rounded',
  textContainerRow: 'w-full flex gap-2 items-center',
  textContainerCol: 'flex flex-col self-center flex-1',
  span: 'max-w-[150px] min-[450px]:max-w-[200px] text-brand truncate',
  button:
    'w-44 min-h-9 h-12 shrink-0 bg-blue-500 rounded-md whitespace-normal leading-tight text-sm min-[450px]:text-base hover:cursor-pointer hover:bg-blue-600 hover:transition-colors hover:duration-300 flex-1',
  timerContainer:
    'h-full flex-[2] p-2 bg-green-600/70 flex flex-col justify-center items-center gap-5 text-brand text-xl min-[450px]:text-2xl font-bold transition-all duration-500 rounded hidden',
  timerMessage: 'text-center',
  copyButton:
    'w-10 h-10 rounded bg-transparent hover:bg-white/10 hover:cursor-pointer hover:duration-300',
};

export default class RoomInfoBlock extends ContainerComponent {
  private roomTitle: TextComponent | null = null;
  private playersTitle: TextComponent | null = null;
  private playersCount: TextComponent | null = null;
  private leaveButton: ButtonComponent | null = null;
  private timerContainer: ContainerComponent | null = null;
  private timer: Timer | null = null;
  private timerMessage: TextComponent | null = null;

  constructor({ roomName, roomId, currentCount, totalCount }: RoomInfoBlockProps) {
    super({ classes: styles.container });

    this.render({ roomName, roomId, currentCount, totalCount });
  }

  private render({ roomName, roomId, currentCount, totalCount }: RoomInfoBlockProps): void {
    const textContainerColumn = new ContainerComponent({
      classes: styles.textContainerCol,
    });
    const textContainerRoomName = new ContainerComponent({
      classes: styles.textContainerRow,
    });
    const textContainerRoomId = new ContainerComponent({
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
    textContainerRoomName.appendChildren([this.roomTitle, name]);

    const idContainer = new ContainerComponent({
      classes: styles.textContainerRow,
    });
    const id = new TextComponent({ content: roomId, classes: styles.span });
    if (id.element instanceof HTMLElement) {
      id.element.title = roomId;
    }

    textContainerRoomId.appendChildren([new TextComponent({ content: 'ID:' }), id]);

    const copyButton = new ButtonComponent({
      content: '📄',
      classes: styles.copyButton,
      listeners: {
        click: (): void => {
          navigator.clipboard.writeText(roomId);
          new Toast({
            type: MessageType.SUCCESS,
            message: t(TranslationKeys.ROOM_COPY_MESSAGE),
          });
        },
      },
    });
    if (copyButton.element instanceof HTMLElement) {
      copyButton.element.title = 'Скопировать ID';
    }
    idContainer.appendChildren([textContainerRoomId, copyButton]);

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

    textContainerColumn.appendChildren([
      textContainerRoomName,
      idContainer,
      textContainerCountRow2,
    ]);

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
}
