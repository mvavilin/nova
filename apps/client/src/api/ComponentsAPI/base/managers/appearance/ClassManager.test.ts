import { describe, it, expect } from 'vitest';
import ClassManager from './ClassManager';

describe('ClassManager add()', () => {
  it('adds a single class', () => {
    const element = document.createElement('div');
    const manager = new ClassManager(element);

    manager.add('active');

    expect(element.classList.contains('active')).toBe(true);
  });

  it('adds multiple classes from string', () => {
    const element = document.createElement('div');
    const manager = new ClassManager(element);

    manager.add('a b c');

    expect(element.classList.contains('a')).toBe(true);
    expect(element.classList.contains('b')).toBe(true);
    expect(element.classList.contains('c')).toBe(true);
  });

  it('adds multiple classes from array', () => {
    const element = document.createElement('div');
    const manager = new ClassManager(element);

    manager.add(['one', 'two']);

    expect(element.classList.contains('one')).toBe(true);
    expect(element.classList.contains('two')).toBe(true);
  });
});

describe('ClassManager remove()', () => {
  it('removes classes', () => {
    const element = document.createElement('div');
    element.classList.add('a', 'b');

    const manager = new ClassManager(element);
    manager.remove('a');

    expect(element.classList.contains('a')).toBe(false);
    expect(element.classList.contains('b')).toBe(true);
  });
});

describe('ClassManager has()', () => {
  it('returns true if all classes exist', () => {
    const element = document.createElement('div');
    element.classList.add('a', 'b');

    const manager = new ClassManager(element);

    expect(manager.has(['a', 'b'])).toBe(true);
  });

  it('returns false if at least one class is missing', () => {
    const element = document.createElement('div');
    element.classList.add('a');

    const manager = new ClassManager(element);

    expect(manager.has(['a', 'b'])).toBe(false);
  });
});

describe('ClassManager toggle()', () => {
  it('toggles class normally', () => {
    const element = document.createElement('div');
    const manager = new ClassManager(element);

    manager.toggle('active');

    expect(element.classList.contains('active')).toBe(true);

    manager.toggle('active');

    expect(element.classList.contains('active')).toBe(false);
  });

  it('respects force parameter', () => {
    const element = document.createElement('div');
    const manager = new ClassManager(element);

    manager.toggle('active', true);

    expect(element.classList.contains('active')).toBe(true);

    manager.toggle('active', false);

    expect(element.classList.contains('active')).toBe(false);
  });
});

describe('ClassManager replace()', () => {
  it('replaces old classes with new ones', () => {
    const element = document.createElement('div');
    element.classList.add('old');

    const manager = new ClassManager(element);
    manager.replace('old', 'new');

    expect(element.classList.contains('old')).toBe(false);
    expect(element.classList.contains('new')).toBe(true);
  });

  it('replaces multiple classes', () => {
    const element = document.createElement('div');
    element.classList.add('a', 'b');

    const manager = new ClassManager(element);
    manager.replace(['a', 'b'], ['x', 'y']);

    expect(element.classList.contains('a')).toBe(false);
    expect(element.classList.contains('b')).toBe(false);
    expect(element.classList.contains('x')).toBe(true);
    expect(element.classList.contains('y')).toBe(true);
  });
});

describe('ClassManager edge cases', () => {
  it('does nothing if element is null', () => {
    const manager = new ClassManager(null);

    expect(manager.has('a')).toBe(false);

    expect(() => manager.add('a')).not.toThrow();
    expect(() => manager.remove('a')).not.toThrow();
    expect(() => manager.toggle('a')).not.toThrow();
    expect(() => manager.replace('a', 'b')).not.toThrow();
  });
});
