import BaseComponent from '../base-component/base-component';
import type { HeadingComponentProperties } from './heading-component.types';

export default class HeadingComponent extends BaseComponent {
  constructor({ level = 1, ...rest }: HeadingComponentProperties = {}) {
    super({
      tag: `h${level}`,
      content: 'Header',
      ...rest,
    });
  }

  public setLevel(level: 1 | 2 | 3 | 4 | 5 | 6): this {
    const currentContent = this.content ?? '';
    this.destroy();
    this.constructor({ ...this, level, content: currentContent });
    return this;
  }
}
