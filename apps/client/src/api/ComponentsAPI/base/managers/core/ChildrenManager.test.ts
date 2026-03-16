import { describe, it, expect } from 'vitest';
import BaseComponent from '../../BaseComponent';
import ChildrenManager from './ChildrenManager';

describe('ChildrenManager basic functionality', () => {
  it('appends children to element', () => {
    const parent = new BaseComponent({ tag: 'div' });
    const child1 = new BaseComponent({ tag: 'span' });
    const child2 = new BaseComponent({ tag: 'span' });

    const manager = new ChildrenManager(parent, parent.element);
    manager.append([child1, child2]);

    const children = manager.list;
    expect(children.length).toBe(2);
    expect(children[0]).toBe(child1);
    expect(children[1]).toBe(child2);

    const domChildren = parent.element?.children;
    expect(domChildren?.length).toBe(2);
    expect(domChildren?.[0]).toBe(child1.element);
  });

  it('sets children replaces existing ones', () => {
    const parent = new BaseComponent({ tag: 'div' });
    const oldChild = new BaseComponent({ tag: 'span' });
    const newChild = new BaseComponent({ tag: 'span' });

    const manager = new ChildrenManager(parent, parent.element);
    manager.append(oldChild);
    manager.set(newChild);

    const children = manager.list;
    expect(children.length).toBe(1);
    expect(children[0]).toBe(newChild);
    expect(parent.element?.children.length).toBe(1);
    expect(parent.element?.children[0]).toBe(newChild.element);
  });

  it('detaches children without destroying them', () => {
    const parent = new BaseComponent({ tag: 'div' });
    const child = new BaseComponent({ tag: 'span' });

    const manager = new ChildrenManager(parent, parent.element);
    manager.append(child);
    manager.detach(child);

    expect(manager.list.length).toBe(0);
    expect(child.element?.parentElement).toBeNull();
  });

  it('destroys children', () => {
    const parent = new BaseComponent({ tag: 'div' });
    const child = new BaseComponent({ tag: 'span' });

    const manager = new ChildrenManager(parent, parent.element);
    manager.append(child);
    manager.destroy(child);

    expect(manager.list.length).toBe(0);
    expect(child.element?.parentElement).toBeNull();
  });
});
