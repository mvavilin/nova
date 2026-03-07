import { BaseComponent } from '@ComponentsAPI';
import type { PageProperties } from './PageComponent.types';

export default class PageComponent extends BaseComponent {
  constructor({ ...rest }: PageProperties = {}) {
    super({
      classes: 'page',
      ...rest,
    });
  }
}
