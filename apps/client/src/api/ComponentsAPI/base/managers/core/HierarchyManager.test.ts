import { describe, it, expect } from 'vitest';
import BaseComponent from '../../BaseComponent';
import HierarchyManager from './HierarchyManager';

class TestComponent extends BaseComponent {
  constructor() {
    super({ tag: 'div' });
  }
}

describe('HierarchyManager', () => {
  it('finds parent by constructor', () => {
    const parent = new TestComponent();
    const child = new TestComponent();

    parent.setChildren([child]);

    const manager = new HierarchyManager(child);

    const result = manager.findParent(TestComponent);

    expect(result).toBe(parent);
  });

  it('finds parent by class name', () => {
    const parent = new BaseComponent({ tag: 'div', classes: ['parent-class'] });
    const child = new BaseComponent({ tag: 'span' });

    parent.setChildren([child]);

    const manager = new HierarchyManager(child);

    expect(manager.findParentByClass('parent-class')).toBe(parent);
  });

  it('finds parent by id', () => {
    const parent = new BaseComponent({ tag: 'div', id: 'parent-id' });
    const child = new BaseComponent({ tag: 'span' });

    parent.setChildren([child]);

    const manager = new HierarchyManager(child);

    expect(manager.findParentById('parent-id')).toBe(parent);
  });

  it('finds child by constructor', () => {
    const parent = new TestComponent();
    const child = new TestComponent();

    parent.setChildren([child]);

    const manager = new HierarchyManager(parent);

    expect(manager.findChild(TestComponent)).toBe(child);
  });

  it('finds child by class', () => {
    const parent = new BaseComponent({ tag: 'div' });
    const child = new BaseComponent({ tag: 'span', classes: ['child-class'] });

    parent.setChildren([child]);

    const manager = new HierarchyManager(parent);

    expect(manager.findChildByClass('child-class')).toBe(child);
  });

  it('finds child by id', () => {
    const parent = new BaseComponent({ tag: 'div' });
    const child = new BaseComponent({ tag: 'span', id: 'child-id' });

    parent.setChildren([child]);

    const manager = new HierarchyManager(parent);

    expect(manager.findChildById('child-id')).toBe(child);
  });
});
