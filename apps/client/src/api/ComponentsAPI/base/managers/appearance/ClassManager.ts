import type { DOMElement } from '../../BaseComponent.types';

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

  public has(classes: string | string[]): boolean {
    return this.normalize(classes).every((cls) => this.classList?.contains(cls) ?? false);
  }

  public add(classes: string | string[]): this {
    this.classList?.add(...this.normalize(classes));
    return this;
  }

  public remove(classes: string | string[]): this {
    this.classList?.remove(...this.normalize(classes));
    return this;
  }

  public toggle(classes: string | string[], force?: boolean): this {
    for (const cls of this.normalize(classes)) this.classList?.toggle(cls, force);
    return this;
  }

  public replace(oldClasses: string | string[], newClasses: string | string[]): this {
    const oldArray = this.normalize(oldClasses);
    const newArray = this.normalize(newClasses);
    for (const cls of oldArray) this.classList?.remove(cls);
    for (const cls of newArray) this.classList?.add(cls);
    return this;
  }
}
