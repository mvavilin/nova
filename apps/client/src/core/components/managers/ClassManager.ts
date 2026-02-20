import type { DOMElement } from '../../../types/components/BaseComponent.types';

export default class ClassManager {
  private element: DOMElement | null;

  constructor(element: DOMElement | null) {
    this.element = element;
  }

  private normalize(classes: string | string[]): string[] {
    return Array.isArray(classes) ? classes : [classes];
  }

  private get classList(): DOMTokenList | null {
    if (this.element instanceof HTMLElement || this.element instanceof SVGElement) {
      return this.element.classList;
    }
    return null;
  }

  has(classes: string | string[]): boolean {
    return this.normalize(classes).every((cls) => this.classList?.contains(cls) ?? false);
  }

  add(classes: string | string[]): this {
    this.classList?.add(...this.normalize(classes));
    return this;
  }

  remove(classes: string | string[]): this {
    this.classList?.remove(...this.normalize(classes));
    return this;
  }

  toggle(classes: string | string[], force?: boolean): this {
    this.normalize(classes).forEach((cls) => this.classList?.toggle(cls, force));
    return this;
  }

  replace(oldClasses: string | string[], newClasses: string | string[]): this {
    const oldArray = this.normalize(oldClasses);
    const newArray = this.normalize(newClasses);
    oldArray.forEach((cls) => this.classList?.remove(cls));
    newArray.forEach((cls) => this.classList?.add(cls));
    return this;
  }
}
