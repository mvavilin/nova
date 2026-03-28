import store from '@store';
import { BaseComponent } from '@ComponentsAPI';
import { ProfileSection } from '@pages/LobbyPage/components';
import { ExitButton } from '@components';
import LanguageButton from '@/components/LanguageButton/LanguageButton';

const USER_MENU_CLASSES = `flex items-center justify-end gap-4 justify-self-end`;

export default class UserMenu extends BaseComponent {
  constructor() {
    super({ classes: USER_MENU_CLASSES });

    this.render();
  }

  private render(): void {
    this.appendChildren([
      new LanguageButton(),
      new ProfileSection({ name: store.getState().username, id: store.getState().id }),
      new ExitButton(),
    ]);
  }
}
