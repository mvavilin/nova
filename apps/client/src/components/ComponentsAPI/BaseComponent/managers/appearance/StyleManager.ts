import type { DOMElement } from '../../BaseComponent.types';

export default class StyleManager {
  private element: DOMElement | null;

  constructor(element: DOMElement | null) {
    this.element = element;
  }

  public set(styles: Partial<CSSStyleDeclaration>): this {
    if (!(this.element instanceof HTMLElement)) return this;

    for (const key in styles) {
      const value = styles[key];
      if (value !== undefined && value !== null) {
        this.element.style[key] = value;
      }
    }
    return this;
  }

  public remove(...keys: string[]): this {
    if (!(this.element instanceof HTMLElement)) return this;

    for (const key of keys) {
      const kebabKey = key.replaceAll(/[A-Z]/g, (m) => '-' + m.toLowerCase());
      this.element?.style.removeProperty(kebabKey);
    }

    return this;
  }
}
