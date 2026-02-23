import type { Namespace, DOMElement } from '../../base-component.types';

export default class ElementManager {
  private element: DOMElement | null = null;
  private namespace: Namespace = 'html';

  constructor(tag = 'div', namespace?: Namespace) {
    if (this.element) return this;

    if (namespace) this.namespace = namespace;
    this.createElement(tag);
  }

  private createElement(tag: string): void {
    this.element =
      this.namespace === 'svg'
        ? document.createElementNS('http://www.w3.org/2000/svg', tag)
        : document.createElement(tag);
  }

  public get domElement(): DOMElement {
    if (!this.element) throw new Error('Element not created');
    return this.element;
  }
}
