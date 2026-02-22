import type BaseComponent from '../../BaseComponent';

export default class HierarchyManager {
  private owner: BaseComponent;

  constructor(owner: BaseComponent) {
    this.owner = owner;
  }

  // ===== Parent Search =====

  public findParent<T extends BaseComponent>(Class: new (...arguments_: unknown[]) => T): T | null {
    let current = this.owner.parent;
    while (current) {
      if (current instanceof Class) return current;
      current = current.parent;
    }
    return null;
  }

  public findParentByClass(className: string): BaseComponent | null {
    let current = this.owner.parent;
    while (current) {
      if (current.element?.classList.contains(className)) return current;
      current = current.parent;
    }
    return null;
  }

  public findParentById(id: string): BaseComponent | null {
    let current = this.owner.parent;
    while (current) {
      if (current.id === id) return current;
      current = current.parent;
    }
    return null;
  }

  // ===== Child Search =====

  public findChild<T extends BaseComponent>(Class: new (...arguments_: unknown[]) => T): T | null {
    return this.owner.children.reduce<T | null>((acc, child) => {
      if (acc) return acc;
      if (child instanceof Class) return child;
      return child.hierarchy.findChild(Class);
    }, null);
  }

  public findChildByClass(className: string): BaseComponent | null {
    return this.owner.children.reduce<BaseComponent | null>((acc, child) => {
      if (acc) return acc;
      if (child.element?.classList.contains(className)) return child;
      return child.hierarchy.findChildByClass(className);
    }, null);
  }

  public findChildById(id: string): BaseComponent | null {
    return this.owner.children.reduce<BaseComponent | null>((acc, child) => {
      if (acc) return acc;
      if (child.id === id) return child;
      return child.hierarchy.findChildById(id);
    }, null);
  }
}
