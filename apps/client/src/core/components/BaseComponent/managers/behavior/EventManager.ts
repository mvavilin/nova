import type { DOMElement, ListenersMap } from '../../BaseComponent.types';

export default class EventManager {
  private element: DOMElement | null;
  private listeners: Array<{ event: string; handler: EventListener }> = [];
  private subscriptions: (() => void)[] = [];

  constructor(element: DOMElement | null) {
    this.element = element;
  }

  public add(listeners: ListenersMap): this {
    Object.entries(listeners).forEach(([event, handler]) => {
      this.element?.addEventListener(event, handler);
      if (!this.listeners.includes({ event, handler })) {
        this.listeners.push({ event, handler });
      }
    });

    return this;
  }

  public removeAll(): this {
    this.listeners.forEach(({ event, handler }) => {
      this.element?.removeEventListener(event, handler);
    });
    this.listeners = [];

    return this;
  }

  public addSubscription(unsubscribe: () => void): this {
    this.subscriptions.push(unsubscribe);
    return this;
  }

  public clearSubscriptions(): this {
    this.subscriptions.forEach((unsubscribe) => unsubscribe());
    this.subscriptions = [];
    return this;
  }

  public destroy(): void {
    this.removeAll();
    this.clearSubscriptions();
  }
}
