import type {
  BaseComponentProps,
  ListenersMap,
  AttributesMap,
} from './BaseComponent.types';

import DomFacade from './managers/DomFacade';

export default class BaseComponent {
  private dom: DomFacade;

  #parent: BaseComponent | null = null;

  constructor({
    tag = 'div',
    namespace,
    children,
    classes,
    listeners,
    attributes,
    content,
    id,
    title,
  }: BaseComponentProps = {}) {
    this.dom = new DomFacade(this, tag, namespace);

    if (classes) this.setClasses(classes);
    if (children) this.setChildren(children);
    if (listeners) this.setListeners(listeners);
    if (attributes) this.setAttributes(attributes);
    if (content !== undefined) this.setContent(content);
    if (id !== undefined) this.setId(id);
    if (title !== undefined) this.setTitle(title);
  }

  get element(): HTMLElement | SVGElement | null {
    return this.dom.element;
  }

  get parent(): BaseComponent | null {
    return this.#parent;
  }

  get children(): BaseComponent[] {
    return this.dom.children.list;
  }

  get root(): BaseComponent {
    return this.#parent ? this.#parent.root : this;
  }

  get content(): string {
    return this.element?.textContent ?? '';
  }

  get id(): string {
    return this.element?.id ?? '';
  }

  public setParent(parent: BaseComponent | null) {
    this.#parent = parent;
    return this;
  }

  public setClasses(classes: string[] | string) {
    this.dom.classes.add(classes);
    return this;
  }

  public removeClasses(classes: string[] | string) {
    this.dom.classes.remove(classes);
    return this;
  }

  public replaceClasses(
    oldClasses: string[] | string,
    newClasses: string[] | string,
  ) {
    this.dom.classes.replace(oldClasses, newClasses);
    return this;
  }

  public toggleClasses(classes: string[] | string, force?: boolean) {
    this.dom.classes.toggle(classes, force);
    return this;
  }

  public hasClasses(classes: string[] | string) {
    return this.dom.classes.has(classes);
  }

  public setAttributes(attributes: AttributesMap) {
    this.dom.attributes.set(attributes);
    return this;
  }

  public removeAttributes(...keys: string[]) {
    this.dom.attributes.remove(...keys);
    return this;
  }

  public toggleAttributes(keyOrKeys: string | string[], force?: boolean) {
    this.dom.attributes.toggle(keyOrKeys, force);
    return this;
  }

  public hasAttribute(key: string) {
    return this.dom.attributes.has(key);
  }

  public setChildren(children: BaseComponent | BaseComponent[]) {
    this.dom.children.set(children);
    return this;
  }

  public appendChildren(children: BaseComponent | BaseComponent[]) {
    this.dom.children.append(children);
    return this;
  }

  public detachChildren(children?: BaseComponent | BaseComponent[]) {
    this.dom.children.detach(children);
    return this;
  }

  public destroyChildren(children?: BaseComponent | BaseComponent[]) {
    this.dom.children.destroy(children);
    return this;
  }

  public detach(): this {
    this.dom.children.detach();
    this.dom.element?.remove();
    this.#parent = null;

    return this;
  }

  public destroy(): this {
    this.dom.events.destroy();
    this.dom.children.destroy();
    this.dom.element?.remove();
    this.#parent = null;

    return this;
  }

  public setListeners(listeners: ListenersMap) {
    this.dom.events.add(listeners);
    return this;
  }

  public removeListeners() {
    this.dom.events.removeAll();
    return this;
  }

  public addSubscription(unsubscribe: () => void) {
    this.dom.events.addSubscription(unsubscribe);
    return this;
  }

  public setContent(content: string | number | Node) {
    this.dom.content.set(content);
    return this;
  }

  public clearContent() {
    this.dom.content.clear();
    return this;
  }

  public setId(id: string) {
    if (this.dom.element) this.dom.element.id = id;
    return this;
  }

  public setTitle(title: string) {
    if (this.dom.element && this.dom.element instanceof HTMLElement) {
      this.dom.element.title = title;
    }
    return this;
  }

  public setStyle(styles: Partial<CSSStyleDeclaration>) {
    this.dom.styles.set(styles);
    return this;
  }

  public removeStyle(...keys: string[]) {
    this.dom.styles.remove(...keys);
    return this;
  }

  public show(animated = true, duration = 500) {
    this.dom.visibility.show(animated, duration);
    return this;
  }

  public hide(animated = true, duration = 500) {
    this.dom.visibility.hide(animated, duration);
    return this;
  }

  public findParent<T extends BaseComponent, A extends unknown[] = []>(
    Class: new (...arguments_: A) => T,
  ): T | null {
    let current = this.parent;
    while (current) {
      if (current instanceof Class) return current as T;
      current = current.parent;
    }
    return null;
  }

  public findChild<T extends BaseComponent, A extends unknown[] = []>(
    Class: new (...arguments_: A) => T,
  ): T | null {
    return this.dom.children.list.reduce<T | null>((acc, child) => {
      if (acc) return acc;
      if (child instanceof Class) return child as T;
      return child.findChild(Class);
    }, null);
  }
}
