import { describe, it, expect } from 'vitest';
import AttributeManager from './AttributeManager';

describe('AttributeManager set()', () => {
  it('sets attributes correctly', () => {
    const element = document.createElement('div');
    const manager = new AttributeManager(element);

    manager.set({ id: 'my-div', title: 'Hello', hidden: true });

    expect(element.getAttribute('id')).toBe('my-div');
    expect(element.getAttribute('title')).toBe('Hello');
    expect(element.getAttribute('hidden')).toBe('true');
  });

  it('removes attributes if value is false, null or undefined', () => {
    const element = document.createElement('div');
    element.dataset['test'] = 'yes';
    element.setAttribute('disabled', 'true');

    const manager = new AttributeManager(element);
    manager.set({ 'data-test': false, disabled: null, title: undefined });

    expect(Object.hasOwn(element.dataset, 'test')).toBe(false);
    expect(element.hasAttribute('disabled')).toBe(false);
    expect(element.hasAttribute('title')).toBe(false);
  });

  it('returns this for chaining', () => {
    const element = document.createElement('div');
    const manager = new AttributeManager(element);

    const result = manager.set({ id: 'x' });
    expect(result).toBe(manager);
  });
});

describe('AttributeManager has()', () => {
  it('returns true if attribute exists, false if not', () => {
    const element = document.createElement('div');
    element.setAttribute('id', 'my-id');

    const manager = new AttributeManager(element);
    expect(manager.has('id')).toBe(true);
    expect(manager.has('title')).toBe(false);
  });

  it('returns undefined if element is null', () => {
    const manager = new AttributeManager(null);
    expect(manager.has('any')).toBeUndefined();
  });
});

describe('AttributeManager remove()', () => {
  it('removes specified attributes', () => {
    const element = document.createElement('div');
    element.setAttribute('id', 'id1');
    element.setAttribute('title', 'title1');

    const manager = new AttributeManager(element);
    manager.remove('id', 'title');

    expect(element.hasAttribute('id')).toBe(false);
    expect(element.hasAttribute('title')).toBe(false);
  });

  it('returns this for chaining', () => {
    const element = document.createElement('div');
    const manager = new AttributeManager(element);
    const result = manager.remove('any');
    expect(result).toBe(manager);
  });
});

describe('AttributeManager toggle()', () => {
  it('toggles single attribute without force', () => {
    const element = document.createElement('div');
    const manager = new AttributeManager(element);

    manager.toggle('data-test'); // sets
    expect(Object.hasOwn(element.dataset, 'test')).toBe(true);

    manager.toggle('data-test'); // removes
    expect(Object.hasOwn(element.dataset, 'test')).toBe(false);
  });

  it('toggles multiple attributes without force', () => {
    const element = document.createElement('div');
    const manager = new AttributeManager(element);

    manager.toggle(['a', 'b']); // sets
    expect(element.hasAttribute('a')).toBe(true);
    expect(element.hasAttribute('b')).toBe(true);

    manager.toggle(['a', 'b']); // removes
    expect(element.hasAttribute('a')).toBe(false);
    expect(element.hasAttribute('b')).toBe(false);
  });

  it('toggles attributes with force=true', () => {
    const element = document.createElement('div');
    const manager = new AttributeManager(element);

    manager.toggle('force-true', true);
    expect(element.hasAttribute('force-true')).toBe(true);

    manager.toggle('force-false', false);
    expect(element.hasAttribute('force-false')).toBe(false);
  });

  it('returns this for chaining', () => {
    const element = document.createElement('div');
    const manager = new AttributeManager(element);

    const result = manager.toggle('x');
    expect(result).toBe(manager);
  });
});

describe('AttributeManager edge cases', () => {
  it('does nothing if element is null', () => {
    const manager = new AttributeManager(null);

    expect(() => manager.set({ id: 'x' })).not.toThrow();
    expect(() => manager.remove('id')).not.toThrow();
    expect(() => manager.toggle('id')).not.toThrow();
  });
});
