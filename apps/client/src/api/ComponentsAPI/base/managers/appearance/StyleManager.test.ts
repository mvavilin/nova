import { describe, it, expect } from 'vitest';
import StyleManager from './StyleManager';

describe('StyleManager set()', () => {
  it('applies a single style property', () => {
    const element = document.createElement('div');
    const manager = new StyleManager(element);

    manager.set({ color: 'red' });

    expect(element.style.color).toBe('red');
  });

  it('applies multiple style properties', () => {
    const element = document.createElement('div');
    const manager = new StyleManager(element);

    manager.set({ color: 'blue', backgroundColor: 'yellow', margin: '10px' });

    expect(element.style.color).toBe('blue');
    expect(element.style.backgroundColor).toBe('yellow');
    expect(element.style.margin).toBe('10px');
  });

  it('returns this for chaining', () => {
    const element = document.createElement('div');
    const manager = new StyleManager(element);

    const result = manager.set({ color: 'green' });
    expect(result).toBe(manager);
  });
});

describe('StyleManager remove()', () => {
  it('removes specified styles', () => {
    const element = document.createElement('div');
    element.style.color = 'red';
    element.style.backgroundColor = 'blue';

    const manager = new StyleManager(element);
    manager.remove('color', 'backgroundColor');

    expect(element.style.color).toBe('');
    expect(element.style.backgroundColor).toBe('');
  });

  it('handles camelCase keys correctly', () => {
    const element = document.createElement('div');
    element.style.backgroundColor = 'blue';

    const manager = new StyleManager(element);
    manager.remove('backgroundColor');

    expect(element.style.backgroundColor).toBe('');
  });

  it('returns this for chaining', () => {
    const element = document.createElement('div');
    const manager = new StyleManager(element);

    const result = manager.remove('color');
    expect(result).toBe(manager);
  });
});

describe('StyleManager edge cases', () => {
  it('does nothing if element is null', () => {
    const manager = new StyleManager(null);

    expect(() => manager.set({ color: 'red' })).not.toThrow();
    expect(() => manager.remove('color')).not.toThrow();
  });
});
