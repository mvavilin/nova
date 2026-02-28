import { HeadingComponent } from '@/api/ComponentsAPI';
import type { RegHeadingProperties } from './RegHeading.types';

export default class RegHeading extends HeadingComponent {
  constructor({ ...rest }: RegHeadingProperties = {}) {
    super({
      id: 'reg-heading',
      classes: `text-4xl font-bold text-purple-600`,
      ...rest,
    });

    this.render();
  }

  private render(): void {
    this.setContent('REGISTRATION');
  }
}
