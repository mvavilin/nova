import TextComponent from '../TextComponent/TextComponent';
import type { HeadingComponentProperties, HeadingLevel } from './HeadingComponent.types';

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
    const oldElement = this.heading;
    const newElement = document.createElement(`h${level}`);

    newElement.textContent = oldElement.textContent;
    newElement.className = oldElement.className;

    for (const attribute of oldElement.attributes) {
      newElement.setAttribute(attribute.name, attribute.value);
    }

    oldElement.replaceWith(newElement);

    this.setElement(newElement);

    return this;
  }

  protected override isValidElement(element: HTMLElement | SVGElement): boolean {
    return element instanceof HTMLHeadingElement;
  }
}
