import BaseComponent from '../BaseComponent/BaseComponent';
import type { LinkComponentProperties } from './LinkComponent.types';

export default class LinkComponent extends BaseComponent {
  constructor({ href = '#', target = '_self', rel, ...rest }: LinkComponentProperties = {}) {
    super({
      tag: 'a',
      ...rest,
    });

    this.setHref(href);
    this.setTarget(target);
    if (rel) this.setRel(rel);
  }

  private get anchor(): HTMLAnchorElement {
    if (!(this.element instanceof HTMLAnchorElement)) {
      throw new TypeError('Element is not an anchor');
    }
    return this.element;
  }

  public setHref(href: string): this {
    this.anchor.href = href;
    return this;
  }

  public setTarget(target: HTMLAnchorElement['target']): this {
    this.anchor.target = target;
    return this;
  }

  public setRel(related: string): this {
    this.anchor.rel = related;
    return this;
  }
}
