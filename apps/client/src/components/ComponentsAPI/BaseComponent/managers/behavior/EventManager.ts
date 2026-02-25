import type { DOMElement, ListenersMap } from '../../BaseComponent.types';

export default class EventManager {
  private element: DOMElement | null;
  private listeners: Array<{ event: string; handler: EventListener }> = [];
  private subscriptions: (() => void)[] = [];

  constructor(element: DOMElement | null) {
    this.element = element;
  }

  public add(listeners: ListenersMap): this {
    for (const [event, handler] of Object.entries(listeners)) {
      this.element?.addEventListener(event, handler);
      const exists = this.listeners.some(
        (listener) => listener.event === event && listener.handler === handler
      );

      if (!exists) this.listeners.push({ event, handler });
    }

    return this;
  }

  public removeAll(): this {
    for (const { event, handler } of this.listeners) {
      this.element?.removeEventListener(event, handler);
    }
    this.listeners = [];

    return this;
  }

  public addSubscriptions(unsubscribe: (() => void) | (() => void)[]): this {
    const list = Array.isArray(unsubscribe) ? unsubscribe : [unsubscribe];
    this.subscriptions.push(...list);

    return this;
  }

  public clearSubscriptions(): this {
    for (const unsubscribe of this.subscriptions) {
      try {
        unsubscribe();
      } catch (error) {
        console.error('Subscription cleanup failed', error);
      }
    }

    this.subscriptions = [];

    return this;
  }

  public destroy(): void {
    this.removeAll();
    this.clearSubscriptions();
  }
}
