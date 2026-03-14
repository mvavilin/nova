import { TextComponent } from '@/api/ComponentsAPI';
import type { GameDescriptionProperties } from './GameDescription.types';
import store from '@store/store';
import { WelcomeActions } from '@/store/actions/welcome.actions';
import { t } from '@/i18n';
import { TranslationKeys } from '@/i18n/translationKeys';
import type { State } from '@store/types/state';
import type { Action } from '@/api/StateAPI';

export default class GameDescription extends TextComponent {
  constructor({ ...rest }: GameDescriptionProperties = {}) {
    super({
      id: 'game-description',
      classes:
        'font-main text-1xl md:text-2xl leading-[1.17] text-center text-[var(--color-light)] whitespace-pre-line text-center',
      ...rest,
    });

    this.addSubscriptions([store.subscribe((state, action) => this.switchLanguage(state, action))]);

    this.render();
  }

  private render(): void {
    this.setContent(t(TranslationKeys.WELCOME_DESCRIPTION));
  }

  private switchLanguage(_state: State, action: Action): void {
    if (action.type === WelcomeActions.SWITCH_LANGUAGE) {
      this.setContent(t(TranslationKeys.WELCOME_DESCRIPTION));
    }
  }
}
