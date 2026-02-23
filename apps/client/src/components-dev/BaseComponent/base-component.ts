import type { BaseComponentProperties, ListenersMap, AttributesMap } from './base-component.types';
import DomFacade from './managers/dom-facade';

export default class BaseComponent {
  private _dom: DomFacade;
  private _parent: BaseComponent | null = null;

  constructor({
    tag,
    namespace,
    children,
    classes,
    listeners,
    attributes,
    content,
    id,
    title,
  }: BaseComponentProperties = {}) {
    this._dom = new DomFacade(this, tag, namespace);

    if (classes) this.setClasses(classes);
    if (children) this.setChildren(children);
    if (listeners) this.setListeners(listeners);
    if (attributes) this.setAttributes(attributes);
    if (content !== undefined) this.setContent(content);
    if (id !== undefined) this.setId(id);
    if (title !== undefined) this.setTitle(title);
  }

  // ===== Core Properties =====

  public get element(): HTMLElement | SVGElement | null {
    return this._dom.element;
  }

  public get parent(): BaseComponent | null {
    return this._parent;
  }

  public get children(): BaseComponent[] {
    return this._dom.children.list;
  }

  public get root(): BaseComponent {
    return this._parent ? this._parent.root : this;
  }

  public get id(): string | null {
    return this.element?.id ?? '';
  }

  public get content(): string | null {
    if (this._dom.children.list.length > 0) return null;
    return this.element?.textContent ?? '';
  }

  // ===== Parent / Hierarchy =====

  protected setParent(parent: BaseComponent | null): this {
    this._parent = parent;
    return this;
  }

  public findParent<T extends BaseComponent>(Class: new (...arguments_: unknown[]) => T): T | null {
    return this._dom.hierarchy.findParent(Class);
  }

  public findChild<T extends BaseComponent>(Class: new (...arguments_: unknown[]) => T): T | null {
    return this._dom.hierarchy.findChild(Class);
  }

  public findParentByClass(className: string): BaseComponent | null {
    return this._dom.hierarchy.findParentByClass(className);
  }

  public findParentById(id: string): BaseComponent | null {
    return this._dom.hierarchy.findParentById(id);
  }

  public findChildByClass(className: string): BaseComponent | null {
    return this._dom.hierarchy.findChildByClass(className);
  }

  public findChildById(id: string): BaseComponent | null {
    return this._dom.hierarchy.findChildById(id);
  }

  public detach(): this {
    this.parent?._dom.children.detach(this);
    return this;
  }

  public destroy(): this {
    this._dom.events.destroy();
    this._dom.children.destroy();
    this.element?.remove();
    this._parent = null;
    return this;
  }

  // ===== Class Management =====

  public setClasses(classes: string[] | string): this {
    this._dom.classes.add(classes);
    return this;
  }
  public removeClasses(classes: string[] | string): this {
    this._dom.classes.remove(classes);
    return this;
  }
  public replaceClasses(oldClasses: string[] | string, newClasses: string[] | string): this {
    this._dom.classes.replace(oldClasses, newClasses);
    return this;
  }
  public toggleClasses(classes: string[] | string, force?: boolean): this {
    this._dom.classes.toggle(classes, force);
    return this;
  }
  public hasClasses(classes: string[] | string): this {
    return this._dom.classes.has(classes);
  }

  // ===== Attribute Management =====

  public setAttributes(attributes: AttributesMap): this {
    this._dom.attributes.set(attributes);
    return this;
  }
  public removeAttributes(...keys: string[]): this {
    this._dom.attributes.remove(...keys);
    return this;
  }
  public toggleAttributes(keyOrKeys: string | string[], force?: boolean): this {
    this._dom.attributes.toggle(keyOrKeys, force);
    return this;
  }
  public hasAttribute(key: string): this {
    return this._dom.attributes.has(key);
  }

  // ===== Children Management =====

  public setChildren(children: BaseComponent | BaseComponent[]): this {
    this._dom.children.set(children);
    return this;
  }
  public appendChildren(children: BaseComponent | BaseComponent[]): this {
    this._dom.children.append(children);
    return this;
  }
  public detachChildren(children?: BaseComponent | BaseComponent[]): this {
    this._dom.children.detach(children);
    return this;
  }
  public destroyChildren(children?: BaseComponent | BaseComponent[]): this {
    this._dom.children.destroy(children);
    return this;
  }

  // ===== Event Management =====

  public setListeners(listeners: ListenersMap): this {
    this._dom.events.add(listeners);
    return this;
  }
  public removeListeners(): this {
    this._dom.events.removeAll();
    return this;
  }
  public addSubscriptions(unsubscribe: (() => void) | (() => void)[]): this {
    this._dom.events.addSubscriptions(unsubscribe);
    return this;
  }

  // ===== Content Management =====

  public setContent(content: string | number): this {
    this._dom.content.set(content);
    return this;
  }
  public clearContent(): this {
    this._dom.content.clear();
    return this;
  }

  // ===== ID / Title Management =====

  public setId(id: string): this {
    if (this.element) this.element.id = id;
    return this;
  }
  public setTitle(title: string): this {
    if (this.element instanceof HTMLElement) this.element.title = title;
    return this;
  }

  // ===== Style Management =====

  public setStyle(styles: Partial<CSSStyleDeclaration>): this {
    this._dom.styles.set(styles);
    return this;
  }
  public removeStyle(...keys: string[]): this {
    this._dom.styles.remove(...keys);
    return this;
  }

  // ===== Visibility =====

  public show(animated = true, duration = 300): this {
    this._dom.visibility.show(animated, duration);
    return this;
  }
  public hide(animated = true, duration = 300): this {
    this._dom.visibility.hide(animated, duration);
    return this;
  }
}
