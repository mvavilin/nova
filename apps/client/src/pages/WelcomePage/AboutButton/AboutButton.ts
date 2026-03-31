import { ButtonComponent } from '@/api/ComponentsAPI';
import type { AboutButtonProperties } from './AboutButton.types';
import store from '@store/store';
import { WelcomeActions } from '@/store/actions/welcome.actions';
import { t } from '@/i18n';
import { TranslationKeys } from '@/i18n/translationKeys';
import type { State } from '@store/types/state';
import type { Action } from '@/api/StateAPI';
import { AppActionTypes } from '@/store/actions';

export default class AboutButton extends ButtonComponent {
  constructor({ ...rest }: AboutButtonProperties = {}) {
    super({
      id: 'about-button',
      classes:
        'font-main font-normal text-1xl md:text-2xl leading-[0.83] underline text-center text-[var(--color-light)] cursor-pointer transition-colors duration-200 hover:text-[var(--color-brand)] min-h-[78px] px-[20px]',
      ...rest,
    });

    this.addSubscriptions([store.subscribe((state, action) => this.switchLanguage(state, action))]);

    this.render();
  }

  private render(): void {
    this.setContent(t(TranslationKeys.WELCOME_ABOUT));
    this.setListeners({
      click: (): void => {
        store.dispatch({ type: WelcomeActions.SHOW_ABOUT_US });
      },
    });
  }

  private switchLanguage(_state: State, action: Action): void {
    if (action.type === AppActionTypes.SWITCH_LANGUAGE) {
      this.setContent(t(TranslationKeys.WELCOME_ABOUT));
    }
  }
}
