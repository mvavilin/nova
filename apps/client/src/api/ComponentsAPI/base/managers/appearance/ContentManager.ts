import type { DOMElement } from '../../BaseComponent.types';

export default class ContentManager {
  private element: DOMElement | null;

  constructor(element: DOMElement | null) {
    this.element = element;
  }

  public set(content: string | number): this {
    if (!this.element) return this;

    this.clear();
    this.element.textContent = String(content);

    return this;
  }

  public clear(): this {
    if (!this.element) return this;

    while (this.element.firstChild) {
      this.element.firstChild.remove();
    }

    return this;
  }
}
