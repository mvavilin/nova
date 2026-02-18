import BaseComponent from './baseComponent';
import type { InputComponentProps } from '../../types/components/input';

export class InputComponent extends BaseComponent {
  constructor({ type = 'text', name, placeholder, value, ...rest }: InputComponentProps) {
    super({
      tag: 'input',
      ...rest,
    });

    this.setType(type);

    if (name !== undefined) this.setName(name);
    if (placeholder !== undefined) this.setPlaceholder(placeholder);
    if (value !== undefined) this.setValue(value);
  }

  private get input(): HTMLInputElement {
    if (!(this.element instanceof HTMLInputElement)) {
      throw new Error('Element is not an input');
    }
    return this.element;
  }

  get value(): string {
    return this.input.value || '';
  }

  public setName(name: string) {
    this.input.name = name;
    return this;
  }

  public setType(type: string) {
    this.input.type = type;
    return this;
  }

  public setPlaceholder(placeholder: string) {
    this.input.placeholder = placeholder;
    return this;
  }

  public setValue(value: string) {
    this.input.value = value;
    return this;
  }

  public setDisabled(disabled: boolean) {
    this.input.disabled = disabled;
    return this;
  }

  public setRequired(required: boolean) {
    this.input.required = required;
    return this;
  }
}
