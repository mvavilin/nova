import { describe, it, expect } from 'vitest';
import ListComponent from './ListComponent';

describe('ListComponent creation', () => {
  it('creates ul by default', () => {
    const list = new ListComponent();
    expect(list.element?.tagName).toBe('UL');
  });

  it('creates ol when type is provided', () => {
    const list = new ListComponent({ type: 'ol' });
    expect(list.element?.tagName).toBe('OL');
  });
});

describe('ListComponent items', () => {
  it('sets items on init', () => {
    const list = new ListComponent({ items: ['a', 'b'] });

    expect(list.children.length).toBe(2);
    expect(list.element?.children.length).toBe(2);
    expect(list.element?.children[0]?.textContent).toBe('a');
    expect(list.element?.children[1]?.textContent).toBe('b');
  });

  it('adds item', () => {
    const list = new ListComponent();

    list.addItem('item');

    expect(list.children.length).toBe(1);
    expect(list.element?.children[0]?.textContent).toBe('item');
  });

  it('sets items replacing previous ones', () => {
    const list = new ListComponent({ items: ['a'] });

    list.setItems(['x', 'y']);

    expect(list.children.length).toBe(2);
    expect(list.element?.children[0]?.textContent).toBe('x');
    expect(list.element?.children[1]?.textContent).toBe('y');
  });

  it('removes item by index', () => {
    const list = new ListComponent({ items: ['a', 'b'] });

    list.removeItem(0);

    expect(list.children.length).toBe(1);
    expect(list.element?.children[0]?.textContent).toBe('b');
  });

  it('clears all items', () => {
    const list = new ListComponent({ items: ['a', 'b'] });

    list.clearItems();

    expect(list.children.length).toBe(0);
    expect(list.element?.children.length).toBe(0);
  });
});
