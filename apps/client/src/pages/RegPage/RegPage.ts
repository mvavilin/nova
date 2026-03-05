import { ContainerComponent } from '@/api/ComponentsAPI';
import type { RegPageProperties } from './RegPage.types';
import BackButton from '@/pages/RegPage/BackButton/BackButton';
import RegHeading from './RegHeading/RegHeading';
import type { State } from '@/store/types/state.types';
import { WelcomeActions } from '@/store/actions/welcome.actions';
import type { Action } from '@/api/StateAPI';
import store from '@/store/clientUserStore';
import { RegistrationActions } from '@/store/actions/registration.actions';
import SendButton from './SendButton/SendButton';
import FetchButton from './FetchButton/FetchButton';
import RegText from './RegText/RegText';

export default class RegPage extends ContainerComponent {
  constructor({ ...rest }: RegPageProperties = {}) {
    super({
      id: 'reg-page',
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
    this.appendChildren([
      new RegHeading(),
      new RegText(),
      new SendButton(),
      new FetchButton(),
      new BackButton(),
    ]);
  }

  private showPage(_state: State, action: Action): void {
    if (action.type === WelcomeActions.GO_TO_REGISTRATION_PAGE) {
      setTimeout(() => {
        this.show(true, 500);
      }, 500);
    }
  }

  private hidePage(_state: State, action: Action): void {
    if (action.type === RegistrationActions.GO_TO_WELCOME_PAGE) {
      this.hide(true, 500);
    }
  }
}
