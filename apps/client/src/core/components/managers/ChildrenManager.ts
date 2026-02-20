import type BaseComponent from '../../../core/components/BaseComponent';
import type { DOMElement } from '../../../types/components/BaseComponent.types';

export default class ChildrenManager {
  private element: DOMElement | null;
  private owner: BaseComponent | null;
  private children: BaseComponent[] = [];

  constructor(owner: BaseComponent | null, element: DOMElement | null) {
    this.owner = owner;
    this.element = element;
  }

  get list(): BaseComponent[] {
    return this.children;
  }

  set(children: BaseComponent | BaseComponent[]): this {
    return this.add(children, false);
  }

  append(children: BaseComponent | BaseComponent[]): this {
    return this.add(children, true);
  }

  private add(
    children: BaseComponent | BaseComponent[],
    append: boolean,
  ): this {
    const childrenArray = Array.isArray(children) ? children : [children];
    const fragment = document.createDocumentFragment();

    if (!append) this.destroy();

    childrenArray.forEach((child) => {
      if (child.parent) child.parent.detachChildren(child);
      if (child.element) fragment.appendChild(child.element);
      this.children.push(child);
      child['setParent'](this.owner);
    });

    this.element?.appendChild(fragment);

    return this;
  }

  detach(children: BaseComponent | BaseComponent[] = this.children): this {
    return this.remove(children, false);
  }

  destroy(children: BaseComponent | BaseComponent[] = this.children): this {
    return this.remove(children, true);
  }

  private remove(
    children: BaseComponent | BaseComponent[],
    full: boolean,
  ): this {
    const childrenArray = Array.isArray(children) ? children : [children];

    childrenArray.forEach((child) => {
      const index = this.children.indexOf(child);
      if (index !== -1) this.children.splice(index, 1);
      child.element?.remove();
      child['setParent'](null);
      if (full) child.remove();
    });

    return this;
  }
}
