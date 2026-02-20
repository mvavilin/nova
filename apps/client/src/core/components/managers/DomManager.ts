import type BaseComponent from '../BaseComponent';
import type { Namespace } from '../../../types/components/BaseComponent.types';

import ElementManager from './ElementManager';
import ClassManager from './ClassManager';
import StyleManager from './StyleManager';
import AttributeManager from './AttributeManager';
import EventManager from './EventManager';
import ChildrenManager from './ChildrenManager';
import VisibilityManager from './VisibilityManager';

export default class DomManager {
  private elementManager: ElementManager;
  private classManager: ClassManager;
  private styleManager: StyleManager;
  private attributeManager: AttributeManager;
  private eventManager: EventManager;
  private childrenManager: ChildrenManager;
  private visibilityManager: VisibilityManager;

  constructor(owner: BaseComponent, tag = 'div', namespace?: Namespace) {
    this.elementManager = new ElementManager(tag, namespace);
    const element = this.elementManager.domElement!;

    this.classManager = new ClassManager(element);
    this.styleManager = new StyleManager(element);
    this.attributeManager = new AttributeManager(element);
    this.eventManager = new EventManager(element);
    this.childrenManager = new ChildrenManager(owner, element);
    this.visibilityManager = new VisibilityManager(this.styleManager, this.attributeManager);
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
}
