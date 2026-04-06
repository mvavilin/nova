import { ButtonComponent } from '@/api/ComponentsAPI';
import { TranslationKeys } from '@/i18n/translationKeys';
import { t } from '@/i18n';
import type { State } from '@/store/types/state';
import type { Action } from '@/api/StateAPI';
import store from '@/store/store';
import { AppActionTypes } from '@/store/actions';

export default class RegistrationSubmitButton extends ButtonComponent {
  private unsubscribe: () => void;
  constructor() {
    super({
      classes:
        'mt-6 bg-green-600 text-sm w-30 h-8 md:w-36 md:h-9 md:text-base rounded-md font-main font-bold hover:cursor-pointer hover:bg-green-700 hover:transition-colors hover:duration-300',
      type: 'submit',
    });

    this.render();

    this.unsubscribe = store.subscribe((state, action) => this.switchLanguage(state, action));
  }

  private render(): void {
    this.setContent(t(TranslationKeys.REGISTRATION_SUBMIT_BTN));
  }

  private switchLanguage(_state: State, action: Action): void {
    if (action.type === AppActionTypes.SWITCH_LANGUAGE) {
      this.setContent(t(TranslationKeys.REGISTRATION_SUBMIT_BTN));
    }
  }

  public override destroy(): this {
    this.unsubscribe();
    super.destroy();
    return this;
  }
}
