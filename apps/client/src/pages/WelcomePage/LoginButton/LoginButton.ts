import { ButtonComponent } from '@/api/ComponentsAPI';
import type { LoginButtonProperties } from './LoginButton.types';
import store from '@/store/clientUserStore';
import { WelcomeActions } from '@/store/actions/welcome.actions';
import type { ClientUser } from '@/types';
import type { Action } from '@/api/StateAPI';
import { TranslationKeys } from '@/i18n/translationKeys';
import { t } from '@/i18n';
import clientUserStore from '@/store/clientUserStore';

export default class LoginButton extends ButtonComponent {
  constructor({ ...rest }: LoginButtonProperties = {}) {
    super({
      id: 'login-button',
      classes:
        'px-6 py-2 rounded-lg bg-gray-200 text-black font-medium opacity-50 cursor-not-allowed pointer-events-none',
      ...rest,
    });

    this.addSubscriptions([
      clientUserStore.subscribe((state, action) => this.switchLanguage(state, action)),
    ]);

    this.render();
  }

  private render(): void {
    this.setContent(t(TranslationKeys.LOGIN));
    this.setListeners({
      click: (): void => {
        store.dispatch({
          type: WelcomeActions.GO_TO_LOGIN_PAGE,
        });
      },
    });
  }

  private switchLanguage(_state: ClientUser, action: Action): void {
    if (action.type === WelcomeActions.SWITCH_LANGUAGE) {
      this.setContent(t(TranslationKeys.LOGIN));
    }
  }
}
