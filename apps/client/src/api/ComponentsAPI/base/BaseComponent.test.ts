import { describe, it, expect, vi } from 'vitest';
import BaseComponent from './BaseComponent';

describe('BaseComponent', () => {
  it('creates element with correct tag', () => {
    const component = new BaseComponent({ tag: 'section' });
    expect(component.element?.tagName).toBe('SECTION');
  });

  it('sets classes', () => {
    const component = new BaseComponent({ classes: 'test-class' });
    expect(component.element?.classList.contains('test-class')).toBe(true);
  });

  it('sets content', () => {
    const component = new BaseComponent({ content: 'Hello' });
    expect(component.element?.textContent).toBe('Hello');
  });

  it('sets attributes', () => {
    const component = new BaseComponent({
      attributes: { 'data-test': '123' },
    });

    expect(component.element?.dataset['test']).toBe('123');
  });

  it('handles children correctly', () => {
    const parent = new BaseComponent({ tag: 'div' });
    const child = new BaseComponent({ tag: 'span' });

    parent.setChildren(child);

    expect(parent.children.length).toBe(1);
    expect(child.parent).toBe(parent);
    expect(parent.element?.children[0]).toBe(child.element);
  });

  it('returns correct root', () => {
    const root = new BaseComponent({ tag: 'div' });
    const child = new BaseComponent({ tag: 'span' });

    root.setChildren(child);

    expect(child.root).toBe(root);
  });

  it('adds event listeners', () => {
    const component = new BaseComponent({ tag: 'button' });
    const handler = vi.fn();

    component.setListeners({ click: handler });
    component.element?.dispatchEvent(new Event('click'));

    expect(handler).toHaveBeenCalled();
  });

  it('destroys component', () => {
    const component = new BaseComponent({ tag: 'div' });

    component.destroy();

    expect(component.element?.isConnected).toBe(false);
    expect(component.parent).toBeNull();
  });
});
