import { ContainerComponent, HeadingComponent, ListComponent } from '@/api/ComponentsAPI';
import type { CommandSectionProps } from './RoomCommandSection.types';
import RoomItem from '../RoomItem/RoomItem';
import RoomCommandButtons from '../RoomCommandButtons/RoomCommandButtons';
import { TranslationKeys } from '@/i18n/translationKeys';
import { t } from '@/i18n';
import type { State } from '@/store/types/state';
import type { Action } from '@/api/StateAPI';
import store from '@/store/store';
import { AppActionTypes } from '@/store/actions';

const styles = {
  container:
    'w-[45%] min-[950px]:w-[40%] min-w-[350px] shrink-0 flex flex-col flex-wrap gap-8 justify-between items-center text-white text-lg p-5 rounded',
  containerRed: 'bg-gradient-to-br from-red-600/25 to-white/25',
  containerBlue: 'bg-gradient-to-br from-cyan-600/25 to-white/25',
  titleRed: 'text-2xl text-red-500 font-bold',
  titleBlue: 'text-2xl text-cyan-500 font-bold',
  list: 'w-full flex flex-col items-stretch',
};

export default class RoomCommandSection extends ContainerComponent {
  private playersList: RoomItem[] = [];
  private title: HeadingComponent;
  private isRedCommand: boolean;

  constructor({ commandName, players }: CommandSectionProps) {
    super({ tag: 'section' });

    this.isRedCommand = commandName === 'red';

    const containerStyle = this.isRedCommand ? styles.containerRed : styles.containerBlue;
    this.setClasses(`${styles.container} ${containerStyle}`);

    const titleStyle = this.isRedCommand ? styles.titleRed : styles.titleBlue;

    const header = {
      number: '№',
      player: { username: t(TranslationKeys.ROOM_PLAYER), role: t(TranslationKeys.ROOM_ROLE) },
    };

    this.title = new HeadingComponent({
      level: 3,
      classes: titleStyle,
      content: this.isRedCommand
        ? t(TranslationKeys.ROOM_RED_TITLE)
        : t(TranslationKeys.ROOM_BLUE_TITLE),
    });

    const list = new ListComponent({ type: 'ol', classes: styles.list });

    const headerRow = new RoomItem(header);

    for (const [index, player] of players.entries()) {
      const options = { number: `${index + 1}.`, player };
      const item = new RoomItem(options);
      this.playersList.push(item);
    }

    list.appendChildren([headerRow, ...this.playersList]);
    const buttons = new RoomCommandButtons({ commandName: commandName });
    this.appendChildren([this.title, list, buttons]);

    this.addSubscriptions([store.subscribe((state, action) => this.switchLanguage(state, action))]);
  }
  private switchLanguage(_state: State, action: Action): void {
    const text = this.isRedCommand
      ? t(TranslationKeys.ROOM_RED_TITLE)
      : t(TranslationKeys.ROOM_BLUE_TITLE);

    if (action.type === AppActionTypes.SWITCH_LANGUAGE) {
      this.title.setContent(text);
    }
  }
}
