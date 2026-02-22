import BaseComponent from './BaseComponent/BaseComponent';
import type { ContainerComponentProps } from '../../types/components/ContainerComponent.types';

export class ContainerComponent extends BaseComponent {
  constructor(props: ContainerComponentProps = {}) {
    super({
      tag: 'div',
      ...props,
    });
  }

  private get container(): HTMLDivElement {
    if (!(this.element instanceof HTMLDivElement)) {
      throw new Error('Element is not a div');
    }
    return this.element;
  }

  public getChildren(): HTMLCollection {
    return this.container.children;
  }
}
