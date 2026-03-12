import { HeadingComponent } from '@/api/ComponentsAPI';
import { TranslationKeys } from '@/i18n/translationKeys';
import { t } from '@/i18n';
import type { State } from '@/store/types/state';
import type { Action } from '@/api/StateAPI';
import store from '@/store/store';
import { FormActions } from '@/store/actions/form.actions';

export default class RegistrationHeading extends HeadingComponent {
  constructor() {
    super({
      classes:
        'mb-4 text-2xl font-brand font-black text-black [text-stroke:0.5px_#FFE81F] [-webkit-text-stroke:0.5px_#FFE81F] drop-shadow-[0_0_10px_rgba(255,232,31,0.4)] paint-order: stroke fill;',
    });

    this.addSubscriptions([store.subscribe((state, action) => this.switchLanguage(state, action))]);

    this.render();
  }
  private render(): void {
    const context = t(TranslationKeys.REGISTRATION_TITLE);
    if (typeof context === 'string') {
      this.setContent(context);
    }
  }

  private switchLanguage(_state: State, action: Action): void {
    if (action.type === FormActions.SWITCH_LANGUAGE) {
      this.setContent(t(TranslationKeys.REGISTRATION_TITLE));
    }
  }
}
