import type { DOMElement } from '../../BaseComponent.types';

export default class VisibilityManager {
  private element: DOMElement | null;

  constructor(element: DOMElement | null) {
    this.element = element;
  }

  public show(animated = true, duration = 500): this {
    if (!this.element) return this;

    this.element.removeAttribute('hidden');

    if (animated && this.element instanceof HTMLElement) {
      this.element.style.transition = `opacity ${duration}ms`;
      this.element.style.opacity = '0';

      requestAnimationFrame(() => {
        this.element!.style.opacity = '1';
      });
    } else if (this.element instanceof HTMLElement) {
      this.element.style.opacity = '1';
      this.element.style.transition = '';
    }

    return this;
  }

  public hide(animated = true, duration = 500): this {
    if (!this.element) return this;

    if (animated && this.element instanceof HTMLElement) {
      this.element.style.transition = `opacity ${duration}ms`;
      this.element.style.opacity = '0';

      setTimeout(() => {
        this.element?.setAttribute('hidden', 'true');
      }, duration);
    } else {
      this.element.setAttribute('hidden', 'true');
      if (this.element instanceof HTMLElement) {
        this.element.style.opacity = '0';
        this.element.style.transition = '';
      }
    }

    return this;
  }
}
