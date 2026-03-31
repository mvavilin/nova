import type { Action } from '@/api/StateAPI';
import { t } from '@/i18n';
import { TranslationKeys } from '@/i18n/translationKeys';
import { AppActionTypes } from '@/store/actions';
import store from '@/store/store';
import type { State } from '@/store/types';
import { ContainerComponent, HeadingComponent } from '@ComponentsAPI';

type TranslationKey = (typeof TranslationKeys)[keyof typeof TranslationKeys];

export default class Card extends ContainerComponent {
  private header: HeadingComponent | null = null;
  private titleKey: TranslationKey;

  constructor(titleKey: TranslationKey) {
    super({
      classes: `bg-white/25 backdrop-blur border border-white/20 text-white rounded p-4`,
    });

    this.titleKey = titleKey;

    this.addSubscriptions([
      store.subscribe((state, action) => this.switchHeaderLanguage(state, action)),
    ]);

    this.renderHeader();
  }

  private renderHeader(): void {
    this.header = new HeadingComponent({
      level: 2,
      content: t(this.titleKey),
      classes: 'text-lg font-semibold mb-3',
    });

    this.setChildren([this.header]);
  }

  private switchHeaderLanguage(_state: State, action: Action): void {
    if (action.type === AppActionTypes.SWITCH_LANGUAGE) {
      console.log(this.titleKey);

      this.header?.setContent(t(this.titleKey));
    }
  }
}
