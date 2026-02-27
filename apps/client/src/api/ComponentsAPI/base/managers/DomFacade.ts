import type BaseComponent from '../BaseComponent';
import type { DOMElement, Namespace } from '../BaseComponent.types';

import {
  ElementManager,
  HierarchyManager,
  ChildrenManager,
  ClassManager,
  StyleManager,
  VisibilityManager,
  ContentManager,
  AttributeManager,
  EventManager,
} from '.';

export default class DomFacade {
  private readonly core: {
    element: ElementManager;
    hierarchy: HierarchyManager;
    children: ChildrenManager;
  };

  private readonly appearance: {
    classes: ClassManager;
    styles: StyleManager;
    visibility: VisibilityManager;
    content: ContentManager;
  };

  private readonly behavior: {
    attributes: AttributeManager;
    events: EventManager;
  };

  constructor(owner: BaseComponent, tag = 'div', namespace?: Namespace) {
    const elementManager = new ElementManager(tag, namespace);
    const element = elementManager.domElement;

    this.core = {
      element: elementManager,
      hierarchy: new HierarchyManager(owner),
      children: new ChildrenManager(owner, element),
    };

    this.appearance = {
      classes: new ClassManager(element),
      styles: new StyleManager(element),
      visibility: new VisibilityManager(element),
      content: new ContentManager(element),
    };

    this.behavior = {
      attributes: new AttributeManager(element),
      events: new EventManager(element),
    };
  }

  // ===== Core =====

  public get element(): DOMElement {
    return this.core.element.domElement;
  }

  public get hierarchy(): HierarchyManager {
    return this.core.hierarchy;
  }

  public get children(): ChildrenManager {
    return this.core.children;
  }

  // ===== Appearance =====

  public get classes(): ClassManager {
    return this.appearance.classes;
  }

  public get styles(): StyleManager {
    return this.appearance.styles;
  }

  public get visibility(): VisibilityManager {
    return this.appearance.visibility;
  }

  public get content(): ContentManager {
    return this.appearance.content;
  }

  // ===== Behavior =====

  public get attributes(): AttributeManager {
    return this.behavior.attributes;
  }

  public get events(): EventManager {
    return this.behavior.events;
  }
}
