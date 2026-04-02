import { ButtonComponent } from '@/api/ComponentsAPI';
import type { RegistrationButtonProperties } from './RegistrationButton.types';
import store from '@store/store';
import { WelcomeActions } from '@/store/actions/welcome.actions';
import { TranslationKeys } from '@/i18n/translationKeys';
import type { State } from '@store/types/state';
import type { Action } from '@/api/StateAPI';
import { t } from '@/i18n';
import { AppActionTypes } from '@/store/actions';

export default class RegistrationButton extends ButtonComponent {
  constructor({ ...rest }: RegistrationButtonProperties = {}) {
    super({
      id: 'registration-button',
      classes:
        'font-main font-bold text-white px-6 py-2 rounded-lg bg-[var(--color-accent)] font-medium ease-in-out active:scale-95 cursor-pointer justify-self-center text-base md:text-lg uppercase hover:bg-green-700 hover:transition-colors hover:duration-300',
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
    if (action.type === AppActionTypes.SWITCH_LANGUAGE) {
      this.setContent(t(TranslationKeys.WELCOME_REGISTRATION));
    }
  }
}
