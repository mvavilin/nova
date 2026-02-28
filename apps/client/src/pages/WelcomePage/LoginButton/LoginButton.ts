import { ButtonComponent } from '@/api/ComponentsAPI';
import type { LoginButtonProperties } from './LoginButton.types';
import store from '@/store/store';
import { WelcomePageActionType } from '@/store/actions/welcomePage';

export default class LoginButton extends ButtonComponent {
  constructor({ ...rest }: LoginButtonProperties = {}) {
    super({
      id: 'login-button',
      classes:
        'px-6 py-2 rounded-lg bg-gray-200 text-black font-medium opacity-50 cursor-not-allowed',
      ...rest,
    });

    this.render();
  }

  private render(): void {
    this.setContent('LOGIN');
    this.setListeners({
      click: (): void => {
        store.dispatch({
          type: WelcomePageActionType.GO_TO_LOGIN_PAGE,
          payload: { empty: 'some payload' },
        });
      },
    });
  }
}
