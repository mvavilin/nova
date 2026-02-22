import type {
  BaseComponentProps,
  ListenersMap,
  AttributesMap,
} from './BaseComponent.types';
import DomFacade from './managers/DomFacade';

export default class BaseComponent {
  private _dom: DomFacade;
  private _parent: BaseComponent | null = null;

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

  get element(): HTMLElement | SVGElement | null {
    return this._dom.element;
  }

  get parent(): BaseComponent | null {
    return this._parent;
  }

  get root(): BaseComponent {
    return this._parent ? this._parent.root : this;
  }

  get id(): string | null {
    return this.element?.id ?? '';
  }

  get content(): string | null {
    if (this.children.length > 0) return null;
    return this.element?.textContent ?? '';
  }

  // ===== Private Helpers =====

  private getManager<K extends keyof DomFacade>(key: K): DomFacade[K] {
    return this._dom[key];
  }

  // ===== Public Getters for Managers =====

  get hierarchy() {
    return this.getManager('hierarchy');
  }
  get children(): BaseComponent[] {
    return this.getManager('children').list;
  }
  get classes() {
    return this.getManager('classes');
  }
  get styles() {
    return this.getManager('styles');
  }
  get visibility() {
    return this.getManager('visibility');
  }
  get contentManager() {
    return this.getManager('content');
  }
  get attributes() {
    return this.getManager('attributes');
  }
  get events() {
    return this.getManager('events');
  }

  // ===== Parent / Hierarchy =====

  protected setParent(parent: BaseComponent | null) {
    this._parent = parent;
    return this;
  }

  public findParent<T extends BaseComponent>(
    Class: new (...arguments_: unknown[]) => T,
  ): T | null {
    return this.hierarchy.findParent(Class);
  }

  public findChild<T extends BaseComponent>(
    Class: new (...arguments_: unknown[]) => T,
  ): T | null {
    return this.hierarchy.findChild(Class);
  }

  public findParentByClass(className: string): BaseComponent | null {
    return this.hierarchy.findParentByClass(className);
  }

  public findParentById(id: string): BaseComponent | null {
    return this.hierarchy.findParentById(id);
  }

  public findChildByClass(className: string): BaseComponent | null {
    return this.hierarchy.findChildByClass(className);
  }

  public findChildById(id: string): BaseComponent | null {
    return this.hierarchy.findChildById(id);
  }

  public detach(): this {
    this.parent?._dom.children.detach(this);
    return this;
  }

  public destroy(): this {
    this.events.destroy();
    this.getManager('children').destroy();
    this.element?.remove();
    this._parent = null;
    return this;
  }

  // ===== Class Management =====

  public setClasses(classes: string[] | string) {
    this.classes.add(classes);
    return this;
  }
  public removeClasses(classes: string[] | string) {
    this.classes.remove(classes);
    return this;
  }
  public replaceClasses(
    oldClasses: string[] | string,
    newClasses: string[] | string,
  ) {
    this.classes.replace(oldClasses, newClasses);
    return this;
  }
  public toggleClasses(classes: string[] | string, force?: boolean) {
    this.classes.toggle(classes, force);
    return this;
  }
  public hasClasses(classes: string[] | string) {
    return this.classes.has(classes);
  }

  // ===== Attribute Management =====

  public setAttributes(attributes: AttributesMap) {
    this.attributes.set(attributes);
    return this;
  }
  public removeAttributes(...keys: string[]) {
    this.attributes.remove(...keys);
    return this;
  }
  public toggleAttributes(keyOrKeys: string | string[], force?: boolean) {
    this.attributes.toggle(keyOrKeys, force);
    return this;
  }
  public hasAttribute(key: string) {
    return this.attributes.has(key);
  }

  // ===== Children Management =====

  public setChildren(children: BaseComponent | BaseComponent[]) {
    this.getManager('children').set(children);
    return this;
  }
  public appendChildren(children: BaseComponent | BaseComponent[]) {
    this.getManager('children').append(children);
    return this;
  }
  public detachChildren(children?: BaseComponent | BaseComponent[]) {
    this.getManager('children').detach(children);
    return this;
  }
  public destroyChildren(children?: BaseComponent | BaseComponent[]) {
    this.getManager('children').destroy(children);
    return this;
  }

  // ===== Event Management =====

  public setListeners(listeners: ListenersMap) {
    this.events.add(listeners);
    return this;
  }
  public removeListeners() {
    this.events.removeAll();
    return this;
  }
  public addSubscription(unsubscribe: () => void) {
    this.events.addSubscription(unsubscribe);
    return this;
  }

  // ===== Content Management =====

  public setContent(content: string | number) {
    this.contentManager.set(content);
    return this;
  }
  public clearContent() {
    this.contentManager.clear();
    return this;
  }

  // ===== ID / Title Management =====

  public setId(id: string) {
    if (this.element) this.element.id = id;
    return this;
  }
  public setTitle(title: string) {
    if (this.element instanceof HTMLElement) this.element.title = title;
    return this;
  }

  // ===== Style Management =====

  public setStyle(styles: Partial<CSSStyleDeclaration>) {
    this.styles.set(styles);
    return this;
  }
  public removeStyle(...keys: string[]) {
    this.styles.remove(...keys);
    return this;
  }

  // ===== Visibility =====

  public show(animated = true, duration = 500) {
    this.visibility.show(animated, duration);
    return this;
  }
  public hide(animated = true, duration = 500) {
    this.visibility.hide(animated, duration);
    return this;
  }
}
