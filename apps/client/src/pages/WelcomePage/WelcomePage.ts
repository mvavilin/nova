import { ContainerComponent } from '@/api/ComponentsAPI';
import type { WelcomePageProperties } from './WelcomePage.types';
import LoginButton from '@/pages/WelcomePage/LoginButton/LoginButton';
import WelcomeHeading from './WelcomeHeading/WelcomeHeading';
import type { Action } from '@/api/StateAPI';
import store from '@/store/store';
import RegButton from './RegButton/RegButton';
import { WelcomePageActionType } from '@/store/actions/welcomePage';
import type { State } from '@/store/types/state.types';
import { RegPageActionType } from '@/store/actions/regPage';

export default class WelcomePage extends ContainerComponent {
  constructor({ ...rest }: WelcomePageProperties = {}) {
    super({
      id: 'welcome-page',
      classes: 'flex flex-col items-center gap-6 p-10 bg-white rounded-2xl shadow-xl',
      ...rest,
    });

    this.addSubscriptions([
      store.subscribe((state, action) => this.showPage(state, action)),
      store.subscribe((state, action) => this.hidePage(state, action)),
    ]);

    this.render();
  }

  private render(): void {
    this.appendChildren([new WelcomeHeading(), new RegButton(), new LoginButton()]);
  }

  private hidePage(_state: State, action: Action): void {
    if (action.type === WelcomePageActionType.GO_TO_REG_PAGE) {
      this.hide(true, 500);
    }
  }

  private showPage(_state: State, action: Action): void {
    if (action.type === RegPageActionType.GO_TO_WELCOME_PAGE) {
      setTimeout(() => {
        this.show(true, 500);
      }, 500);
    }
  }
}
