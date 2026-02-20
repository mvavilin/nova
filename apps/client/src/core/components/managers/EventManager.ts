import type { DOMElement, ListenersMap } from '../../../types/components/BaseComponent.types';

export default class EventManager {
  private element: DOMElement | null;
  private listeners: Array<{ event: string; handler: EventListener }> = [];
  private subscriptions: (() => void)[] = [];

  constructor(element: DOMElement | null) {
    this.element = element;
  }

  add(listeners: ListenersMap): this {
    Object.entries(listeners).forEach(([event, handler]) => {
      this.element?.addEventListener(event, handler);
      this.listeners.push({ event, handler });
    });
    return this;
  }

  removeAll(): this {
    this.listeners.forEach(({ event, handler }) => {
      this.element?.removeEventListener(event, handler);
    });
    this.listeners = [];
    return this;
  }

  addSubscription(unsubscribe: () => void): this {
    this.subscriptions.push(unsubscribe);
    return this;
  }

  clearSubscriptions(): this {
    this.subscriptions.forEach((unsubscribe) => unsubscribe());
    this.subscriptions = [];
    return this;
  }

  destroy(): void {
    this.removeAll();
    this.clearSubscriptions();
  }
}
