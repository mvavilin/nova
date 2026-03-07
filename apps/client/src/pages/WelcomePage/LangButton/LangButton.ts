import { ButtonComponent } from '@/api/ComponentsAPI';
import type { LangButtonProperties } from './LangButton.types';
import clientUserStore from '@store/clientUserStore';
import { WelcomeActions } from '@/store/actions/welcome.actions';
import { t } from '@/i18n';
import { TranslationKeys } from '@/i18n/translationKeys';
import type { ClientUser } from '@/types';
import type { Action } from '@/api/StateAPI';

export default class LangButton extends ButtonComponent {
  constructor({ ...rest }: LangButtonProperties = {}) {
    super({
      id: 'language-button',
      classes:
        'px-6 py-2 rounded-lg bg-violet-100 text-black font-medium transition duration-200 ease-in-out hover:bg-purple-200 active:scale-95 cursor-pointer',
      ...rest,
    });

    this.addSubscriptions([
      clientUserStore.subscribe((state, action) => this.switchLanguage(state, action)),
    ]);

    this.render();
  }

  private render(): void {
    this.setContent(t(TranslationKeys.LANGUAGE));
    this.setListeners({
      click: (): void => {
        clientUserStore.dispatch({ type: WelcomeActions.SWITCH_LANGUAGE });
      },
    });
  }

  private switchLanguage(_state: ClientUser, action: Action): void {
    if (action.type === WelcomeActions.SWITCH_LANGUAGE) {
      this.setContent(t(TranslationKeys.LANGUAGE));
    }
  }
}
