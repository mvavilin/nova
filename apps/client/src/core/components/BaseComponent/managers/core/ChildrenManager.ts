import type BaseComponent from '../../BaseComponent';
import type { DOMElement } from '../../BaseComponent.types';

export default class ChildrenManager {
  private element: DOMElement | null;
  private owner: BaseComponent | null;
  private children: BaseComponent[] = [];

  constructor(owner: BaseComponent, element: DOMElement | null) {
    this.owner = owner;
    this.element = element;
  }

  get list(): BaseComponent[] {
    return this.children;
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
      if (!this.children.includes(child)) this.children.push(child);
      child.setParent(this.owner);
    });

    this.element?.appendChild(fragment);

    return this;
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
      child.setParent(null);
      if (full) child.destroy();
    });

    return this;
  }

  set(children: BaseComponent | BaseComponent[]): this {
    return this.add(children, false);
  }

  append(children: BaseComponent | BaseComponent[]): this {
    return this.add(children, true);
  }

  detach(children: BaseComponent | BaseComponent[] = this.children): this {
    return this.remove(children, false);
  }

  destroy(children: BaseComponent | BaseComponent[] = this.children): this {
    return this.remove(children, true);
  }
}
