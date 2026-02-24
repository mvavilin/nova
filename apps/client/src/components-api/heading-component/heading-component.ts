import TextComponent from '../text-component/text-component';
import type { HeadingComponentProperties, HeadingLevel } from './heading-component.types';

export default class HeadingComponent extends TextComponent {
  constructor({ level = 1, ...rest }: HeadingComponentProperties = {}) {
    super({
      tag: `h${level}`,
      content: 'Header',
      ...rest,
    });
  }

  private get heading(): HTMLHeadingElement {
    if (!(this.element instanceof HTMLHeadingElement)) {
      throw new TypeError('Element is not a heading');
    }
    return this.element;
  }

  public setLevel(level: HeadingLevel): this {
    const currentContent = this.content ?? '';
    this.heading.remove();
    this.constructor({ ...this, level, content: currentContent });
    return this;
  }
}
