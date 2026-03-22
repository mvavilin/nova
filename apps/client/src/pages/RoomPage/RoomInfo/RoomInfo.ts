import { ButtonComponent, ContainerComponent, TextComponent } from '@/api/ComponentsAPI';
import type { RoomInfoProps } from './RoomInfo.types';
import { TranslationKeys } from '@/i18n/translationKeys';
import { t } from '@/i18n';
import type { State } from '@/store/types/state';
import type { Action } from '@/api/StateAPI';
import store from '@/store/store';
import { AppActionTypes } from '@/store/actions';

const styles = {
  container:
    'w-[70%] max-w-[512px] min-w-[350px] flex flex-wrap justify-center min-[1070px]:justify-between items-center gap-5 text-white text-2xl font-bold bg-white/25 px-6 py-4 rounded',
  textContainerRow: 'w-full flex gap-2 items-center',
  textContainerCol: 'flex flex-col self-center min-[1070px]:w-[50%]',
  span: 'text-brand truncate',
  button:
    'w-34 h-14 shrink-0 bg-cyan-600 rounded-md text-base hover:cursor-pointer hover:bg-green-600 hover:transition-colors hover:duration-300',
};

export default class RoomInfo extends ContainerComponent {
  private roomTitle: TextComponent;
  private playersTitle: TextComponent;
  private leaveButton: ButtonComponent;

  constructor({ roomName, currentCount, totalCount }: RoomInfoProps) {
    super({ classes: styles.container });

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
    const nowCount = new TextComponent({
      content: `${currentCount}`,
      classes: styles.span,
    });
    const allCount = new TextComponent({
      content: `/${totalCount}`,
      classes: styles.span,
    });

    textContainerCountRow1.appendChildren([nowCount, allCount]);
    textContainerCountRow2.appendChildren([this.playersTitle, textContainerCountRow1]);

    textContainerColumn.appendChildren([textContainerRoomRow, textContainerCountRow2]);

    this.leaveButton = new ButtonComponent({
      classes: styles.button,
      content: t(TranslationKeys.ROOM_LEAVE_ROOM_BTN),
    });

    this.appendChildren([textContainerColumn, this.leaveButton]);

    this.addSubscriptions([store.subscribe((state, action) => this.switchLanguage(state, action))]);
  }

  private switchLanguage(_state: State, action: Action): void {
    if (action.type === AppActionTypes.SWITCH_LANGUAGE) {
      this.roomTitle.setContent(t(TranslationKeys.ROOM_INFO_TITLE));
      this.playersTitle.setContent(t(TranslationKeys.ROOM_INFO_PLAYERS));
      this.leaveButton.setContent(t(TranslationKeys.ROOM_LEAVE_ROOM_BTN));
    }
  }
}
