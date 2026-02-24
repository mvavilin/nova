import BaseComponent from '../base-component/base-component';
import type { ListComponentProperties } from './list-component.types';

export default class ListComponent extends BaseComponent {
  constructor({ type = 'ul', items, ...rest }: ListComponentProperties = {}) {
    super({
      tag: type,
      ...rest,
    });

    if (items) this.setItems(items);
  }

  // private get list(): HTMLUListElement | HTMLOListElement {
  //   if (!(this.element instanceof HTMLUListElement || this.element instanceof HTMLOListElement)) {
  //     throw new TypeError('Element is not a list');
  //   }
  //   return this.element;
  // }

  // ===== Methods =====

  public setItems(items: (string | number)[]): this {
    this.clearItems();
    for (const item of items) this.addItem(item);
    return this;
  }

  public addItem(item: string | number): this {
    new BaseComponent({ tag: 'li', content: item });
    return this;
  }

  public removeItem(index: number): this {
    const child = this.children[index];
    child?.destroy();
    return this;
  }

  public clearItems(): this {
    this.destroyChildren();
    return this;
  }
}
