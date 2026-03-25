import store from '@store';
import { BaseComponent, ContainerComponent, HeadingComponent } from '@ComponentsAPI';
import { Logo, ExitButton } from '@components';
import RoomUser from '../RoomUser/RoomUser';
import LanguageButton from '@/components/LanguageButton/LanguageButton';
import { TranslationKeys } from '@/i18n/translationKeys';
import { t } from '@/i18n';
import type { State } from '@/store/types/state';
import type { Action } from '@/api/StateAPI';
import { AppActionTypes } from '@/store/actions';

const styles = {
  header: 'w-full max-w-7xl grid grid-cols-3 items-center p-4 bg-white/25 text-white rounded',
  title: 'text-2xl text-center font-bold',
  container: 'flex justify-between items-center',
  userMenu: 'flex items-center justify-end gap-4 justify-self-end',
};

export default class RoomHeader extends ContainerComponent {
  private userMenu = new BaseComponent({ classes: styles.userMenu });
  private title: HeadingComponent;

  constructor() {
    super({ tag: 'header', classes: styles.header });

    this.title = new HeadingComponent({
      level: 1,
      content: t(TranslationKeys.ROOM_TITLE),
      classes: styles.title,
    });

    this.render();

    this.addSubscriptions([store.subscribe((state, action) => this.switchLanguage(state, action))]);
  }

  private render(): void {
    const username = store.getState().username;
    const userId = store.getState().id;
    if (username && userId) {
      this.userMenu.appendChildren([new RoomUser({ username: username, id: userId })]);
    }
    this.userMenu.appendChildren([new ExitButton()]);

    const container = new ContainerComponent({ classes: styles.container });
    container.appendChildren([new LanguageButton(), this.userMenu]);

    this.appendChildren([new Logo(), this.title, container]);
  }

  private switchLanguage(_state: State, action: Action): void {
    if (action.type === AppActionTypes.SWITCH_LANGUAGE) {
      this.title.setContent(t(TranslationKeys.ROOM_TITLE));
    }
  }
}
