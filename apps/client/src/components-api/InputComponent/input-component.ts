import BaseComponent from '../BaseComponent/base-component';
import type { InputComponentProperties } from './input-component.types';

export default class InputComponent extends BaseComponent {
  constructor({ type = 'text', name, placeholder, value, ...rest }: InputComponentProperties = {}) {
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
      throw new TypeError('Element is not an input');
    }
    return this.element;
  }

  public get value(): string {
    return this.input.value;
  }

  public get length(): number {
    return this.value.length;
  }

  public setValue(value: string): this {
    this.input.value = value;
    return this;
  }

  public setName(name: string): this {
    this.input.name = name;
    return this;
  }

  public setType(type: HTMLInputElement['type']): this {
    this.input.type = type;
    return this;
  }

  public setPlaceholder(placeholder: string): this {
    this.input.placeholder = placeholder;
    return this;
  }

  public setDisabled(disabled: boolean): this {
    this.input.disabled = disabled;
    return this;
  }

  public setRequired(required: boolean): this {
    this.input.required = required;
    return this;
  }

  public isLengthBetween(min: number, max: number): boolean {
    return this.length >= min && this.length <= max;
  }

  public isValidByRegex(pattern: RegExp): boolean {
    return pattern.test(this.value);
  }

  public isValid(): boolean {
    return this.input.checkValidity();
  }

  public isEmpty(): boolean {
    return this.length === 0;
  }

  public clear(): this {
    this.input.value = '';
    return this;
  }
}
