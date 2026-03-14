import { describe, it, expect, vi } from 'vitest';
import EventManager from './EventManager';

const badSub = (): void => {
  throw new Error('fail');
};

describe('EventManager add() and removeAll()', () => {
  it('adds event listeners correctly', () => {
    const element = document.createElement('div');
    const manager = new EventManager(element);

    const clickHandler = vi.fn();
    const mouseOverHandler = vi.fn();

    manager.add({ click: clickHandler, mouseover: mouseOverHandler });

    element.dispatchEvent(new Event('click'));
    element.dispatchEvent(new Event('mouseover'));

    expect(clickHandler).toHaveBeenCalledTimes(1);
    expect(mouseOverHandler).toHaveBeenCalledTimes(1);
  });

  it('removes all listeners', () => {
    const element = document.createElement('div');
    const manager = new EventManager(element);

    const handler = vi.fn();
    manager.add({ click: handler });

    manager.removeAll();

    element.dispatchEvent(new Event('click'));
    expect(handler).not.toHaveBeenCalled();
  });

  it('returns this for chaining', () => {
    const element = document.createElement('div');
    const manager = new EventManager(element);

    const result = manager.add({ click: () => {} });
    expect(result).toBe(manager);
  });
});

describe('EventManager subscriptions', () => {
  it('adds and clears subscriptions', () => {
    const manager = new EventManager(document.createElement('div'));
    const sub1 = vi.fn();
    const sub2 = vi.fn();

    manager.addSubscriptions([sub1, sub2]);
    manager.clearSubscriptions();

    expect(sub1).toHaveBeenCalledTimes(1);
    expect(sub2).toHaveBeenCalledTimes(1);
  });

  it('adds single subscription', () => {
    const manager = new EventManager(document.createElement('div'));
    const sub = vi.fn();

    manager.addSubscriptions(sub).clearSubscriptions();
    expect(sub).toHaveBeenCalledTimes(1);
  });

  it('does not throw if subscription fails', () => {
    const manager = new EventManager(document.createElement('div'));

    manager.addSubscriptions(badSub);
    expect(() => manager.clearSubscriptions()).not.toThrow();
  });

  it('returns this for chaining', () => {
    const manager = new EventManager(document.createElement('div'));
    const result = manager.addSubscriptions(() => {});
    expect(result).toBe(manager);
  });
});

describe('EventManager destroy()', () => {
  it('removes all listeners and clears subscriptions', () => {
    const element = document.createElement('div');
    const manager = new EventManager(element);

    const handler = vi.fn();
    const sub = vi.fn();

    manager.add({ click: handler }).addSubscriptions(sub);
    manager.destroy();

    element.dispatchEvent(new Event('click'));
    expect(handler).not.toHaveBeenCalled();
  });
});
