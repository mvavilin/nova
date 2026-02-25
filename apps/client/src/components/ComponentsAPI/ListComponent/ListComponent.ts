import BaseComponent from '../BaseComponent/BaseComponent';
import type { ListComponentProperties } from './ListComponent.types';

export default class ListComponent extends BaseComponent {
  constructor({ type = 'ul', items, ...rest }: ListComponentProperties = {}) {
    super({
      tag: type,
      ...rest,
    });

    if (items) this.setItems(items);
  }

  public setItems(items: (string | number)[]): this {
    this.clearItems();
    for (const item of items) this.addItem(item);
    return this;
  }

  public addItem(item: string | number): this {
    const li = new BaseComponent({ tag: 'li', content: item });
    this.appendChildren(li);
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
