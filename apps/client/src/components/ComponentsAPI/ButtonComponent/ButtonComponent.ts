import BaseComponent from '../BaseComponent/BaseComponent';
import type { ButtonComponentProperties } from './ButtonComponent.types';

export default class ButtonComponent extends BaseComponent {
  constructor({ type = 'button', disabled, name, value, ...rest }: ButtonComponentProperties = {}) {
    super({
      tag: 'button',
      content: 'Button',
      ...rest,
    });

    this.setType(type);

    if (disabled !== undefined) this.setDisabled(disabled);
    if (name !== undefined) this.setName(name);
    if (value !== undefined) this.setValue(value);
  }

  private get button(): HTMLButtonElement {
    if (!(this.element instanceof HTMLButtonElement)) {
      throw new TypeError('Element is not an button');
    }
    return this.element;
  }

  public setType(type: HTMLButtonElement['type']): this {
    this.button.type = type;
    return this;
  }

  public setDisabled(disabled: boolean): this {
    this.button.disabled = disabled;
    return this;
  }

  public setName(name: string): this {
    this.button.name = name;
    return this;
  }

  public setValue(value: string): this {
    this.button.value = value;
    return this;
  }
}
