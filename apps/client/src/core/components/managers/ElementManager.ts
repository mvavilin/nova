import type { Namespace, DOMElement } from '../../../types/components/BaseComponent.types';

export default class ElementManager {
  private element: DOMElement | null = null;
  private namespace: Namespace = 'html';

  constructor(tag = 'div', namespace?: Namespace) {
    if (namespace) this.namespace = namespace;
    this.createElement(tag);
  }

  private createElement(tag: string): void {
    this.element =
      this.namespace === 'svg'
        ? document.createElementNS('http://www.w3.org/2000/svg', tag)
        : document.createElement(tag);
  }

  get domElement(): DOMElement | null {
    return this.element;
  }
}
