import { ButtonComponent } from '@/api/ComponentsAPI';
import type { RulesButtonProperties } from './RulesButton.types';
import store from '@store/store';
import { WelcomeActions } from '@/store/actions/welcome.actions';
import { t } from '@/i18n';
import { TranslationKeys } from '@/i18n/translationKeys';
import type { State } from '@store/types/state';
import type { Action } from '@/api/StateAPI';
import { AppActionTypes } from '@/store/actions';

export default class RulesButton extends ButtonComponent {
  constructor({ ...rest }: RulesButtonProperties = {}) {
    super({
      id: 'rules-button',
      classes:
        'font-main font-normal text-1xl md:text-2xl leading-[0.83] text-center text-[var(--color-light)] cursor-pointer transition-colors duration-200 hover:text-[var(--color-brand)] min-h-[78px]',
      ...rest,
    });

    this.addSubscriptions([store.subscribe((state, action) => this.switchLanguage(state, action))]);

    this.render();
  }

  private render(): void {
    this.setContent(t(TranslationKeys.WELCOME_RULES));
    this.setListeners({
      click: (): void => {
        store.dispatch({ type: WelcomeActions.SHOW_GAME_RULES });
      },
    });
  }

  private switchLanguage(_state: State, action: Action): void {
    if (action.type === AppActionTypes.SWITCH_LANGUAGE) {
      this.setContent(t(TranslationKeys.WELCOME_RULES));
    }
  }
}
