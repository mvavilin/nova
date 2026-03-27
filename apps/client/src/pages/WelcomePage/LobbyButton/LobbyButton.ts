import { ButtonComponent } from '@/api/ComponentsAPI';
import type { LobbyButtonProperties } from './LobbyButton.types';
import store from '@store/store';
import { WelcomeActions } from '@/store/actions/welcome.actions';
import { TranslationKeys } from '@/i18n/translationKeys';
import type { State } from '@/store/types/state';
import type { Action } from '@/api/StateAPI';
import { t } from '@/i18n';
import { AppActionTypes } from '@/store/actions';

export default class LobbyButton extends ButtonComponent {
  constructor({ ...rest }: LobbyButtonProperties = {}) {
    super({
      id: 'lobby-button',
      classes:
        'font-brand text-[var(--color-dark)] px-6 py-2 rounded-lg bg-[var(--color-accent)] font-medium transition duration-200 ease-in-out active:scale-95 cursor-pointer justify-self-center text-xs md:text-base',
      ...rest,
    });

    this.addSubscriptions([store.subscribe((state, action) => this.switchLanguage(state, action))]);

    this.render();
  }

  private render(): void {
    this.setContent(t(TranslationKeys.WELCOME_LOBBY));
    this.setListeners({
      click: (): void => {
        store.dispatch({ type: WelcomeActions.GO_TO_LOBBY_PAGE });
      },
    });
  }

  private switchLanguage(_state: State, action: Action): void {
    if (action.type === AppActionTypes.SWITCH_LANGUAGE) {
      this.setContent(t(TranslationKeys.WELCOME_LOBBY));
    }
  }
}
