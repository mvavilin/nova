import type BaseComponent from '../../base-component';
import type { DOMElement } from '../../base-component.types';

export default class ChildrenManager {
  private element: DOMElement | null;
  private owner: BaseComponent | null;
  private children: BaseComponent[] = [];

  constructor(owner: BaseComponent, element: DOMElement | null) {
    this.owner = owner;
    this.element = element;
  }

  public get list(): BaseComponent[] {
    return this.children;
  }

  private add(children: BaseComponent | BaseComponent[], append: boolean): this {
    const childrenArray = Array.isArray(children) ? children : [children];
    const fragment = document.createDocumentFragment();

    if (!append) this.destroy();

    for (const child of childrenArray) {
      if (child.parent) child.parent.detachChildren(child);
      if (child.element) fragment.append(child.element);
      if (!this.children.includes(child)) this.children.push(child);
      child['setParent'](this.owner);
    }

    this.element?.append(fragment);

    return this;
  }

  private remove(children: BaseComponent | BaseComponent[], full: boolean): this {
    const childrenArray = Array.isArray(children) ? [...children] : [children];

    for (const child of childrenArray) {
      const index = this.children.indexOf(child);
      if (index !== -1) this.children.splice(index, 1);
      child.element?.remove();
      child['setParent'](null);
      if (full) child.destroy();
    }

    return this;
  }

  public set(children: BaseComponent | BaseComponent[]): this {
    return this.add(children, false);
  }

  public append(children: BaseComponent | BaseComponent[]): this {
    return this.add(children, true);
  }

  public detach(children: BaseComponent | BaseComponent[] = this.children): this {
    return this.remove(children, false);
  }

  public destroy(children: BaseComponent | BaseComponent[] = this.children): this {
    return this.remove(children, true);
  }
}
