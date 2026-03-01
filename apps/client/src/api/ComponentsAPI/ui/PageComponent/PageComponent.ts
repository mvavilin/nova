import BaseComponent from '@ComponentsAPI/base/BaseComponent';
import type { PageProperties } from '@ComponentsAPI/ui/PageComponent/PageComponent.types';

export default abstract class Page extends BaseComponent {
  protected constructor({ pageId = '', classes = [], ...rest }: PageProperties = {}) {
    super({
      ...rest,
      id: pageId,
      classes: ['page', ...classes],
    });
  }
}
