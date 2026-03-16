import { describe, it, expect } from 'vitest';
import ContentManager from './ContentManager';

describe('ContentManager set()', () => {
  it('sets string content', () => {
    const element = document.createElement('div');
    const manager = new ContentManager(element);

    manager.set('Hello');

    expect(element.textContent).toBe('Hello');
  });

  it('sets numeric content', () => {
    const element = document.createElement('div');
    const manager = new ContentManager(element);

    manager.set(123);

    expect(element.textContent).toBe('123');
  });

  it('clears previous content before setting', () => {
    const element = document.createElement('div');
    element.textContent = 'Old';
    const manager = new ContentManager(element);

    manager.set('New');

    expect(element.textContent).toBe('New');
  });

  it('returns this for chaining', () => {
    const element = document.createElement('div');
    const manager = new ContentManager(element);

    const result = manager.set('Hello');
    expect(result).toBe(manager);
  });
});

describe('ContentManager clear()', () => {
  it('removes all children', () => {
    const element = document.createElement('div');
    element.innerHTML = '<span>1</span><span>2</span>';
    const manager = new ContentManager(element);

    manager.clear();

    expect(element.children.length).toBe(0);
    expect(element.textContent).toBe('');
  });

  it('returns this for chaining', () => {
    const element = document.createElement('div');
    const manager = new ContentManager(element);

    const result = manager.clear();
    expect(result).toBe(manager);
  });
});

describe('ContentManager edge cases', () => {
  it('does nothing if element is null', () => {
    const manager = new ContentManager(null);

    expect(() => manager.set('Hello')).not.toThrow();
    expect(() => manager.clear()).not.toThrow();
  });
});
