import BaseComponent from '../../base/BaseComponent';
import type { LabelComponentProperties } from './LabelComponent.types';

export default class LabelComponent extends BaseComponent {
  constructor({ htmlFor, ...rest }: LabelComponentProperties = {}) {
    super({ tag: 'label', ...rest });

    if (htmlFor !== undefined) {
      this.setFor(htmlFor);
    }
  }

  private get label(): HTMLLabelElement {
    if (this.element instanceof HTMLLabelElement) return this.element;
    throw new TypeError('Element is not a label');
  }

  public setFor(id: string): this {
    this.label.htmlFor = id;
    return this;
  }
}
