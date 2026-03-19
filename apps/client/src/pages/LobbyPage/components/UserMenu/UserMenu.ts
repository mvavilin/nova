import store from '@store';
import { BaseComponent } from '@ComponentsAPI';
import { ProfileSection } from '@pages/LobbyPage/components';
import { ExitButton } from '@components';

const USER_MENU_CLASSES = `flex items-center justify-end gap-4 justify-self-end`;

export default class UserMenu extends BaseComponent {
  constructor() {
    super({ classes: USER_MENU_CLASSES });

    this.render();
  }

  private render(): void {
    this.appendChildren([
      new ProfileSection({ name: store.getState().username }),
      new ExitButton(),
    ]);
  }
}
