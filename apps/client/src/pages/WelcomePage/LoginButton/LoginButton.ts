import { ButtonComponent } from '@/api/ComponentsAPI';
import type { LoginButtonProperties } from './LoginButton.types';
import store from '@store/store';
import { WelcomeActions } from '@/store/actions/welcome.actions';
import type { State } from '@/store/types/state';
import type { Action } from '@/api/StateAPI';
import { TranslationKeys } from '@/i18n/translationKeys';
import { t } from '@/i18n';

export default class LoginButton extends ButtonComponent {
  constructor({ ...rest }: LoginButtonProperties = {}) {
    super({
      id: 'login-button',
      classes:
        'font-brand px-6 py-2 text-[var(--color-dark)] rounded-lg bg-[var(--color-light)] font-medium transition duration-200 ease-in-out active:scale-95 cursor-pointer justify-self-center text-xs md:text-base',
      ...rest,
    });

    this.addSubscriptions([store.subscribe((state, action) => this.switchLanguage(state, action))]);

    this.render();
  }

  private render(): void {
    this.setContent(t(TranslationKeys.WELCOME_LOGIN));
    this.setListeners({
      click: (): void => {
        store.dispatch({
          type: WelcomeActions.GO_TO_LOGIN_PAGE,
        });
      },
    });
  }

  private switchLanguage(_state: State, action: Action): void {
    if (action.type === WelcomeActions.SWITCH_LANGUAGE) {
      this.setContent(t(TranslationKeys.WELCOME_LOGIN));
    }
  }
}
