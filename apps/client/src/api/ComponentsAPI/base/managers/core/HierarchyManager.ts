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
    for (const child of this.owner.children) {
      if (child instanceof Class) return child;
      const nested = child.findChild(Class);
      if (nested) return nested;
    }

    return null;
  }

  public findChildByClass(className: string): BaseComponent | null {
    for (const child of this.owner.children) {
      if (child.element?.classList.contains(className)) return child;
      const nested = child.findChildByClass(className);
      if (nested) return nested;
    }

    return null;
  }

  public findChildById(id: string): BaseComponent | null {
    for (const child of this.owner.children) {
      if (child.id === id) return child;
      const nested = child.findChildById(id);
      if (nested) return nested;
    }

    return null;
  }
}
