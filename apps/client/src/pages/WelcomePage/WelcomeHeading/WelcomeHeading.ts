import { HeadingComponent } from '@/api/ComponentsAPI';
import type { WelcomeHeadingProperties } from './WelcomeHeading.types';

export default class WelcomeHeading extends HeadingComponent {
  constructor({ ...rest }: WelcomeHeadingProperties = {}) {
    super({
      id: 'welcome-heading',
      classes: `text-4xl font-bold text-purple-600`,
      ...rest,
    });

    this.render();
  }

  private render(): void {
    this.setContent('NOVA CODENAMES');
  }
}
