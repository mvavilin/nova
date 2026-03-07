import { ContainerComponent } from '@/api/ComponentsAPI';
import type { WelcomePageProperties } from './WelcomePage.types';
import LoginButton from '@/pages/WelcomePage/LoginButton/LoginButton';
import WelcomeHeading from './WelcomeHeading/WelcomeHeading';
import type { Action } from '@/api/StateAPI';
import { clientUserStore } from '@store/clientUserStore';
import RegButton from './RegButton/RegButton';
import { WelcomeActions } from '@/store/actions/welcome.actions';
import type { ClientUser } from '@types';
import { TestActions } from '@/store/actions/test.actions';

export default class WelcomePage extends ContainerComponent {
  constructor({ ...rest }: WelcomePageProperties = {}) {
    super({
      id: 'welcome-page',
      classes: 'flex flex-col items-center gap-6 p-10 bg-white rounded-2xl shadow-xl',
      ...rest,
    });

    this.addSubscriptions([
      clientUserStore.subscribe((state, action) => this.showPage(state, action)),
      clientUserStore.subscribe((state, action) => this.hidePage(state, action)),
    ]);

    this.render();
  }

  private render(): void {
    this.appendChildren([new WelcomeHeading(), new RegButton(), new LoginButton()]);
  }

  private hidePage(_state: ClientUser, action: Action): void {
    if (action.type === WelcomeActions.GO_TO_TEST_PAGE) {
      this.hide(true, 500);
    }
  }

  private showPage(_state: ClientUser, action: Action): void {
    if (action.type === TestActions.GO_TO_WELCOME_PAGE) {
      setTimeout(() => {
        this.show(true, 500);
      }, 500);
    }
  }
}
