import type { DOMElement, AttributesMap } from '../../BaseComponent.types';

export default class AttributeManager {
  private element: DOMElement | null;

  constructor(element: DOMElement | null) {
    this.element = element;
  }

  public set(attributes: AttributesMap): this {
    for (const [key, value] of Object.entries(attributes)) {
      if (value === false || value === null || value === undefined) {
        this.element?.removeAttribute(key);
      } else {
        this.element?.setAttribute(key, String(value));
      }
    }

    return this;
  }

  public has(key: string): boolean | undefined {
    return this.element?.hasAttribute(key);
  }

  public remove(...keys: string[]): this {
    for (const key of keys) {
      this.element?.removeAttribute(key);
    }

    return this;
  }

  public toggle(keyOrKeys: string | string[], force?: boolean): this {
    const keys = Array.isArray(keyOrKeys) ? keyOrKeys : [keyOrKeys];

    for (const key of keys) {
      const has = this.element?.hasAttribute(key);

      if (force === undefined) {
        if (has) {
          this.element?.removeAttribute(key);
        } else {
          this.element?.setAttribute(key, '');
        }
      } else if (force) {
        this.element?.setAttribute(key, '');
      } else {
        this.element?.removeAttribute(key);
      }
    }

    return this;
  }
}
