import { ButtonComponent } from '@/api/ComponentsAPI';
import type { LangButtonProperties } from './LangButton.types';
import store from '@store/store';
import { WelcomeActions } from '@/store/actions/welcome.actions';
import { t } from '@/i18n';
import { TranslationKeys } from '@/i18n/translationKeys';
import type { State } from '@/store/types/state';
import type { Action } from '@/api/StateAPI';

export default class LangButton extends ButtonComponent {
  constructor({ ...rest }: LangButtonProperties = {}) {
    super({
      id: 'language-button',
      classes:
        'font-main font-normal text-1xl md:text-2xl leading-[0.83] underline text-center text-[var(--color-light)] cursor-pointer transition-colors duration-200 hover:text-[var(--color-brand)] min-h-[78px] px-[0px] md:px-[20px]',
      ...rest,
    });

    this.addSubscriptions([store.subscribe((state, action) => this.switchLanguage(state, action))]);

    this.render();
  }

  private render(): void {
    this.setContent(t(TranslationKeys.WELCOME_LANGUAGE));
    this.setListeners({
      click: (): void => {
        store.dispatch({ type: WelcomeActions.SWITCH_LANGUAGE });
      },
    });
  }

  private switchLanguage(_state: State, action: Action): void {
    if (action.type === WelcomeActions.SWITCH_LANGUAGE) {
      this.setContent(t(TranslationKeys.WELCOME_LANGUAGE));
    }
  }
}
