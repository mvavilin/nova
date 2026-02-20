import type {
  BaseComponentProps,
  ListenersMap,
  AttributesMap,
  Namespace,
} from '../../types/components/base';

export default class BaseComponent {
  #element: HTMLElement | SVGElement | null = null;

  #namespace: Namespace = 'html';

  #parent: BaseComponent | null = null;

  #children: BaseComponent[] = [];

  #listeners: Array<{ event: string; handler: EventListener }> = [];

  subscriptions: (() => void)[] = [];

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
    if (namespace) this.#namespace = namespace;
    if (tag) this.createElement(tag);
    if (children) this.setChildren(children);
    if (classes) this.setClasses(classes);
    if (listeners) this.setListeners(listeners);
    if (attributes) this.setAttributes(attributes);
    if (content !== undefined) this.setContent(content);
    if (id !== undefined) this.setId(id);
    if (title !== undefined) this.setTitle(title);
  }

  get element(): HTMLElement | SVGElement | null {
    return this.#element;
  }

  get parent(): BaseComponent | null {
    return this.#parent;
  }

  get children(): BaseComponent[] {
    return this.#children;
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

  private createElement(tag: string) {
    this.#element =
      this.#namespace === 'svg'
        ? document.createElementNS('http://www.w3.org/2000/svg', tag)
        : document.createElement(tag);

    return this;
  }

  private setParent(parent: BaseComponent | null) {
    this.#parent = parent;
    return this;
  }

  public setClasses(classes: string[] | string) {
    const array = Array.isArray(classes) ? classes : [classes];
    this.#element?.classList.add(...array);
    return this;
  }

  public removeClasses(classes: string[] | string) {
    const array = Array.isArray(classes) ? classes : [classes];
    this.#element?.classList.remove(...array);
    return this;
  }

  public replaceClasses(
    oldClasses: string[] | string,
    newClasses: string[] | string,
  ) {
    if (!this.#element) return this;

    const oldArray = Array.isArray(oldClasses) ? oldClasses : [oldClasses];
    const newArray = Array.isArray(newClasses) ? newClasses : [newClasses];
    this.#element.classList.remove(...oldArray);
    this.#element.classList.add(...newArray);
    return this;
  }

  public toggleClasses(classes: string[] | string, force?: boolean) {
    const array = Array.isArray(classes) ? classes : [classes];
    array.forEach((cls) => this.#element?.classList.toggle(cls, force));
    return this;
  }

  public hasClasses(classes: string[] | string) {
    if (!this.#element) return false;
    const array = Array.isArray(classes) ? classes : [classes];
    return array.every((cls) => this.#element!.classList.contains(cls));
  }

  public setAttributes(attributes: AttributesMap) {
    if (!attributes || !this.#element) return this;
    Object.entries(attributes).forEach(([key, value]) => {
      if (value === false || value === null || value === undefined) {
        this.#element?.removeAttribute(key);
      } else {
        this.#element?.setAttribute(key, String(value));
      }
    });

    return this;
  }

  public removeAttributes(...keys: string[]) {
    if (!this.#element) return this;

    keys.forEach((key) => this.#element?.removeAttribute(key));

    return this;
  }

  public toggleAttribute(key: string, force?: boolean) {
    if (!this.#element) return this;
    const has = this.#element.hasAttribute(key);

    if (force === undefined) {
      has
        ? this.#element.removeAttribute(key)
        : this.#element.setAttribute(key, '');
    } else if (force) {
      this.#element.setAttribute(key, '');
    } else {
      this.#element.removeAttribute(key);
    }

    return this;
  }

  private addChildrenInternal(
    children: BaseComponent | BaseComponent[],
    append = false,
  ) {
    if (!this.#element) return this;

    const childrenArray = Array.isArray(children) ? children : [children];
    const fragment = document.createDocumentFragment();

    childrenArray.forEach((child) => {
      if (child.parent) child.parent.destroyChildren(child);
      if (child.element) fragment.appendChild(child.element);
      this.#children.push(child);
      child.setParent(this);
    });

    if (append) {
      this.#element.appendChild(fragment);
    } else {
      this.destroyChildren();
      this.#element.appendChild(fragment);
    }

    return this;
  }

  public setChildren(children: BaseComponent | BaseComponent[]) {
    return this.addChildrenInternal(children, false);
  }

  public appendChildren(children: BaseComponent | BaseComponent[]) {
    return this.addChildrenInternal(children, true);
  }

  private removeChildrenInternal(
    children: BaseComponent | BaseComponent[],
    full = false,
  ) {
    const childrenArray = Array.isArray(children) ? children : [children];

    childrenArray.forEach((child) => {
      const index = this.#children.indexOf(child);
      if (index !== -1) this.#children.splice(index, 1);
      if (child.element) child.element.remove();
      child.setParent(null);
      if (full) child.remove();
    });

    return this;
  }

  public detachChildren(
    children: BaseComponent | BaseComponent[] = this.children,
  ) {
    return this.removeChildrenInternal(children, false);
  }

  public destroyChildren(
    children: BaseComponent | BaseComponent[] = this.children,
  ) {
    return this.removeChildrenInternal(children, true);
  }

  public remove() {
    this.removeListeners();

    this.subscriptions.forEach((unsubscribe) => unsubscribe());
    this.subscriptions = [];

    const children = [...this.#children];
    this.#children = [];
    children.forEach((child) => child.remove());

    this.#element?.remove();

    if (this.#parent) {
      const index = this.#parent.children.indexOf(this);
      if (index !== -1) {
        this.#parent.children.splice(index, 1);
      }
    }

    this.#parent = null;
    this.#element = null;
  }

  public setListeners(listeners: ListenersMap) {
    Object.entries(listeners).forEach(([event, handler]) => {
      this.#element?.addEventListener(event, handler);
      this.#listeners.push({ event, handler });
    });
    return this;
  }

  public removeListeners() {
    this.#listeners.forEach(({ event, handler }) =>
      this.#element?.removeEventListener(event, handler),
    );
    this.#listeners = [];
    return this;
  }

  public setContent(content: string | number | Node) {
    if (!this.#element) return this;

    this.destroyChildren();

    if (content instanceof Node) {
      this.#element.appendChild(content);
    } else {
      this.#element.textContent = String(content);
    }

    return this;
  }

  public clearContent() {
    if (!this.#element) return this;
    this.#element.textContent = '';
    return this;
  }

  public setId(id: string) {
    if (this.#element) this.#element.id = id;
    return this;
  }

  public setTitle(title: string) {
    if (this.#element && this.#element instanceof HTMLElement)
      this.#element.title = title;
    return this;
  }

  public setStyle(styles: Partial<CSSStyleDeclaration>) {
    if (!this.#element || !(this.#element instanceof HTMLElement)) return this;

    for (const key in styles) {
      const value = styles[key];
      if (value !== undefined && value !== null) {
        this.#element.style[key] = value;
      }
    }

    return this;
  }

  public removeStyle(...keys: string[]) {
    if (!this.#element || !(this.#element instanceof HTMLElement)) return this;

    keys.forEach((key) => {
      const kebabKey = key.replace(/[A-Z]/g, (m) => '-' + m.toLowerCase());
      if (this.#element) this.#element.style.removeProperty(kebabKey);
    });

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
    return this.#children.reduce<T | null>((acc, child) => {
      if (acc) return acc;
      if (child instanceof Class) return child as T;
      return child.findChild(Class);
    }, null);
  }

  public show(animated = true, duration = 300) {
    if (!this.#element) return this;

    if (animated) {
      this.setStyle({
        transition: `opacity ${duration}ms`,
        opacity: '0',
      });
      this.removeAttributes('hidden');

      requestAnimationFrame(() => {
        this.setStyle({ opacity: '1' });
      });
    } else {
      this.removeAttributes('hidden');
      this.setStyle({ opacity: '1', transition: '' });
    }
  }

  public hide(animated = true, duration = 300) {
    if (!this.#element) return this;

    if (animated) {
      this.setStyle({ transition: `opacity ${duration}ms`, opacity: '0' });

      setTimeout(() => {
        if (this.#element) this.#element.setAttribute('hidden', '');
      }, duration);
    } else {
      this.#element.setAttribute('hidden', '');
      this.setStyle({ opacity: '1', transition: '' });
    }
  }
}
