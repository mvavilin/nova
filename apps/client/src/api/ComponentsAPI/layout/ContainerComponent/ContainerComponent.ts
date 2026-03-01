import BaseComponent from '../../base/BaseComponent';
import type { ContainerComponentProperties } from './ContainerComponent.types';

export default class ContainerComponent extends BaseComponent {
  constructor({ ...rest }: ContainerComponentProperties = {}) {
    super({
      tag: 'div',
      ...rest,
    });
  }

  private get container(): HTMLDivElement {
    if (!(this.element instanceof HTMLDivElement)) {
      throw new TypeError('Element is not a container');
    }
    return this.element;
  }

  public getChildren(): HTMLCollection {
    return this.container.children;
  }
}
