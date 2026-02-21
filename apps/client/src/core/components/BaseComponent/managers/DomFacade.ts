import type BaseComponent from '../BaseComponent';
import type { Namespace } from '../BaseComponent.types';

import ElementManager from './core/ElementManager';
import ClassManager from './appearance/ClassManager';
import StyleManager from './appearance/StyleManager';
import AttributeManager from './behavior/AttributeManager';
import EventManager from './behavior/EventManager';
import ChildrenManager from './core/ChildrenManager';
import VisibilityManager from './appearance/VisibilityManager';
import ContentManager from './appearance/ContentManager';

export default class DomFacade {
  private elementManager: ElementManager;
  private classManager: ClassManager;
  private styleManager: StyleManager;
  private attributeManager: AttributeManager;
  private eventManager: EventManager;
  private childrenManager: ChildrenManager;
  private visibilityManager: VisibilityManager;
  private contentManager: ContentManager;

  constructor(owner: BaseComponent, tag = 'div', namespace?: Namespace) {
    this.elementManager = new ElementManager(tag, namespace);
    const element = this.elementManager.domElement;

    this.contentManager = new ContentManager(element);
    this.classManager = new ClassManager(element);
    this.styleManager = new StyleManager(element);
    this.attributeManager = new AttributeManager(element);
    this.eventManager = new EventManager(element);
    this.childrenManager = new ChildrenManager(owner, element);
    this.visibilityManager = new VisibilityManager(element);
  }

  get element() {
    return this.elementManager.domElement;
  }

  get classes() {
    return this.classManager;
  }

  get styles() {
    return this.styleManager;
  }

  get attributes() {
    return this.attributeManager;
  }

  get events() {
    return this.eventManager;
  }

  get children() {
    return this.childrenManager;
  }

  get visibility() {
    return this.visibilityManager;
  }

  get content() {
    return this.contentManager;
  }
}
