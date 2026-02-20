import type { DOMElement } from '../../../types/components/BaseComponent.types';

export default class StyleManager {
  private element: DOMElement | null;

  constructor(element: DOMElement | null) {
    this.element = element;
  }

  set(styles: Partial<CSSStyleDeclaration>): this {
    if (!(this.element instanceof HTMLElement)) return this;

    for (const key in styles) {
      const value = styles[key];
      if (value !== undefined && value !== null) {
        this.element.style[key] = value;
      }
    }
    return this;
  }

  remove(...keys: string[]): this {
    if (!(this.element instanceof HTMLElement)) return this;

    keys.forEach((key) => {
      const kebabKey = key.replace(/[A-Z]/g, (m) => '-' + m.toLowerCase());
      this.element?.style.removeProperty(kebabKey);
    });

    return this;
  }
}
