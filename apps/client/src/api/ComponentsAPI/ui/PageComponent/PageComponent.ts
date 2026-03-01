import BaseComponent from '@ComponentsAPI/base/BaseComponent';
import type { PageProperties } from '@ComponentsAPI/ui/PageComponent/PageComponent.types';

export default abstract class Page extends BaseComponent {
  protected constructor({ pageId = '', classes = [], ...rest }: PageProperties = {}) {
    super({
      id: pageId,
      classes: ['page', ...classes],
      ...rest,
    });
  }

  public build = (): HTMLElement | SVGElement | null => this.element;
}
