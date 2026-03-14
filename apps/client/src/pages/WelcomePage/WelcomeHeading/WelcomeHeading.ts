import { HeadingComponent } from '@/api/ComponentsAPI';
import type { WelcomeHeadingProperties } from './WelcomeHeading.types';
import { t } from '@/i18n';
import { TranslationKeys } from '@/i18n/translationKeys';

export default class WelcomeHeading extends HeadingComponent {
  constructor({ ...rest }: WelcomeHeadingProperties = {}) {
    super({
      id: 'welcome-heading',
      classes: `font-brand font-normal text-3xl md:text-6xl leading-none tracking-[0.02em] text-center text-transparent [-webkit-text-stroke:2px_var(--color-brand)]`,
      ...rest,
    });

    this.render();
  }

  private render(): void {
    this.setContent(t(TranslationKeys.WELCOME_HEADING));
  }
}
