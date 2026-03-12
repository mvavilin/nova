import { ButtonComponent } from '@/api/ComponentsAPI';
import { TranslationKeys } from '@/i18n/translationKeys';
import { t } from '@/i18n';
import type { State } from '@/store/types/state.types';
import type { Action } from '@/api/StateAPI';
import store from '@/store/store';
import { FormActions } from '@/store/actions/form.actions';

export default class RegistrationSubmitButton extends ButtonComponent {
  constructor() {
    super({
      classes:
        'mt-6 bg-cyan-600 w-36 h-9 rounded-md font-main font-bold hover:cursor-pointer hover:bg-green-600 hover:transition-colors hover:duration-300',
      type: 'submit',
    });

    this.addSubscriptions([store.subscribe((state, action) => this.switchLanguage(state, action))]);

    this.render();
  }

  private render(): void {
    this.setContent(t(TranslationKeys.REGISTRATION_SUBMIT_BTN));
  }

  private switchLanguage(_state: State, action: Action): void {
    if (action.type === FormActions.SWITCH_LANGUAGE) {
      this.setContent(t(TranslationKeys.REGISTRATION_SUBMIT_BTN));
    }
  }
}
