import { TextComponent } from '@/api/ComponentsAPI';
import type { TestTextProperties } from './TestText.types';

export default class TestText extends TextComponent {
  constructor({ ...rest }: TestTextProperties = {}) {
    super({
      id: 'test-text',
      classes: `text-base leading-relaxed text-gray-900`,
      ...rest,
    });

    this.render();
  }

  private render(): void {
    this.setContent('Lorem Ipsum Fetch Text');
  }
}
