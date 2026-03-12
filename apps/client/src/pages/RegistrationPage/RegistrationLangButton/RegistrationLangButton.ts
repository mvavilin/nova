import { ButtonComponent } from '@/api/ComponentsAPI';
import store from '@store/store';
import { FormActions } from '@/store/actions/form.actions';
import { t } from '@/i18n';
import { TranslationKeys } from '@/i18n/translationKeys';
import type { State } from '@/store/types/state';
import type { Action } from '@/api/StateAPI';

export default class RegistrationLangButton extends ButtonComponent {
  constructor() {
    super({
      classes:
        'bg-cyan-600 w-16 h-9 self-end rounded-md font-main font-bold hover:cursor-pointer hover:bg-green-600 hover:transition-colors hover:duration-300',
    });

    this.addSubscriptions([store.subscribe((state, action) => this.switchLanguage(state, action))]);

    this.render();
  }

  private render(): void {
    this.setContent(t(TranslationKeys.REGISTRATION_LANG_BTN));
    this.setListeners({
      click: (): void => {
        store.dispatch({ type: FormActions.SWITCH_LANGUAGE });
      },
    });
  }

  private switchLanguage(_state: State, action: Action): void {
    if (action.type === FormActions.SWITCH_LANGUAGE) {
      this.setContent(t(TranslationKeys.REGISTRATION_LANG_BTN));
    }
  }
}
