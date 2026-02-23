import BaseComponent from '../BaseComponent/base-component';
import type { ContainerComponentProperties } from './container-component.types';

export default class ContainerComponent extends BaseComponent {
  constructor({ ...rest }: ContainerComponentProperties = {}) {
    super({
      tag: 'div',
      ...rest,
    });
  }

  private get container(): HTMLDivElement {
    if (!(this.element instanceof HTMLDivElement)) {
      throw new TypeError('Element is not a div');
    }
    return this.element;
  }

  public getChildren(): HTMLCollection {
    return this.container.children;
  }
}
