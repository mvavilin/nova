import { ButtonComponent } from '@/api/ComponentsAPI';
import type { RegistrationButtonProperties } from './RegistrationButton.types';
import store from '@store/store';
import { WelcomeActions } from '@/store/actions/welcome.actions';
import { TranslationKeys } from '@/i18n/translationKeys';
import type { State } from '@store/types/state';
import type { Action } from '@/api/StateAPI';
import { t } from '@/i18n';

export default class RegistrationButton extends ButtonComponent {
  constructor({ ...rest }: RegistrationButtonProperties = {}) {
    super({
      id: 'reg-button',
      classes:
        'px-6 py-2 rounded-lg bg-violet-100 text-black font-medium transition duration-200 ease-in-out hover:bg-purple-200 active:scale-95 cursor-pointer',
      ...rest,
    });

    this.addSubscriptions([store.subscribe((state, action) => this.switchLanguage(state, action))]);

    this.render();
  }

  private render(): void {
    this.setContent(t(TranslationKeys.WELCOME_REGISTRATION));
    this.setListeners({
      click: (): void => {
        store.dispatch({ type: WelcomeActions.GO_TO_REGISTRATION_PAGE });
      },
    });
  }

  private switchLanguage(_state: State, action: Action): void {
    if (action.type === WelcomeActions.SWITCH_LANGUAGE) {
      this.setContent(t(TranslationKeys.WELCOME_REGISTRATION));
    }
  }
}
