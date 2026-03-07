import { HeadingComponent } from '@/api/ComponentsAPI';
import type { TestHeadingProperties } from './TestHeading.types';

export default class TestHeading extends HeadingComponent {
  constructor({ ...rest }: TestHeadingProperties = {}) {
    super({
      id: 'test-heading',
      classes: `text-4xl font-bold text-purple-600`,
      ...rest,
    });

    this.render();
  }

  private render(): void {
    this.setContent('Test Heading');
  }
}
