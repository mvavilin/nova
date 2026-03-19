import { ButtonComponent } from '@/api/ComponentsAPI';
import store from '@store/store';
import { t } from '@/i18n';
import { TranslationKeys } from '@/i18n/translationKeys';
import type { State } from '@/store/types/state';
import type { Action } from '@/api/StateAPI';
import { AppActionTypes } from '@/store/actions';

export default class LanguageButton extends ButtonComponent {
  constructor() {
    super({
      classes:
        'bg-cyan-600 w-14 h-8 rounded-md font-main font-bold text-white hover:cursor-pointer hover:bg-green-600 hover:transition-colors hover:duration-300',
    });

    this.addSubscriptions([store.subscribe((state, action) => this.switchLanguage(state, action))]);

    this.render();
  }

  private render(): void {
    this.setContent(t(TranslationKeys.LANGUAGE_BUTTON));
    this.setListeners({
      click: (): void => {
        store.dispatch({ type: AppActionTypes.SWITCH_LANGUAGE });
      },
    });
  }

  private switchLanguage(_state: State, action: Action): void {
    if (action.type === AppActionTypes.SWITCH_LANGUAGE) {
      this.setContent(t(TranslationKeys.LANGUAGE_BUTTON));
    }
  }
}
