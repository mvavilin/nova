import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import VisibilityManager from './VisibilityManager';

describe('VisibilityManager show()', () => {
  let element: HTMLElement;

  beforeEach(() => {
    element = document.createElement('div');
    element.setAttribute('hidden', 'true');
  });

  it('removes hidden attribute', () => {
    const manager = new VisibilityManager(element);

    manager.show(false);

    expect(element.hasAttribute('hidden')).toBe(false);
  });

  it('shows without animation', () => {
    const manager = new VisibilityManager(element);

    manager.show(false);

    expect(element.style.opacity).toBe('1');
    expect(element.style.transition).toBe('');
  });

  it('shows with animation', () => {
    vi.spyOn(globalThis, 'requestAnimationFrame').mockImplementation(
      (callback: FrameRequestCallback) => {
        callback(0);
        return 0;
      }
    );

    const manager = new VisibilityManager(element);

    manager.show(true, 300);

    expect(element.style.transition).toBe('opacity 300ms');
    expect(element.style.opacity).toBe('1');
  });
});

describe('VisibilityManager hide()', () => {
  let element: HTMLElement;

  beforeEach(() => {
    vi.useFakeTimers();
    element = document.createElement('div');
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('hides without animation', () => {
    const manager = new VisibilityManager(element);

    manager.hide(false);

    expect(element.getAttribute('hidden')).toBe('true');
    expect(element.style.opacity).toBe('0');
    expect(element.style.transition).toBe('');
  });

  it('hides with animation', () => {
    const manager = new VisibilityManager(element);

    manager.hide(true, 200);

    expect(element.style.transition).toBe('opacity 200ms');
    expect(element.style.opacity).toBe('0');

    vi.advanceTimersByTime(200);

    expect(element.getAttribute('hidden')).toBe('true');
  });
});

describe('VisibilityManager edge cases', () => {
  it('does nothing if element is null', () => {
    const manager = new VisibilityManager(null);

    expect(() => manager.show()).not.toThrow();
    expect(() => manager.hide()).not.toThrow();
  });
});
