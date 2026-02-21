import BaseComponent from './BaseComponent/BaseComponent';
import type { ButtonComponentProps } from '../../types/components/ButtonComponent.types';

export class ButtonComponent extends BaseComponent {
  constructor({
    type = 'button',
    disabled,
    name,
    value,
    ...rest
  }: ButtonComponentProps = {}) {
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
      throw new Error('Element is not an button');
    }
    return this.element;
  }

  public setType(type: 'button' | 'submit' | 'reset') {
    this.button.type = type;
    return this;
  }

  public setDisabled(disabled: boolean) {
    this.button.disabled = disabled;
    return this;
  }

  public setName(name: string) {
    this.button.name = name;
    return this;
  }

  public setValue(value: string) {
    this.button.value = value;
    return this;
  }
}
