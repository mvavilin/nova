import BaseComponent from '../../base/BaseComponent';
import type { TextareaComponentProperties } from './TextareaComponent.types';

export default class TextareaComponent extends BaseComponent {
  constructor({
    value,
    placeholder,
    autocomplete,
    rows,
    cols,
    ...rest
  }: TextareaComponentProperties = {}) {
    super({
      tag: 'textarea',
      ...rest,
    });

    if (value !== undefined) this.setValue(value);
    if (placeholder !== undefined) this.setPlaceholder(placeholder);
    if (rows !== undefined) this.setRows(rows);
    if (cols !== undefined) this.setCols(cols);
    if (autocomplete !== undefined) this.setAutocomplete(autocomplete);
  }

  private get textarea(): HTMLTextAreaElement {
    if (this.element instanceof HTMLTextAreaElement) {
      return this.element;
    }
    throw new TypeError('Element is not a textarea');
  }

  public getValue(): string {
    return this.textarea.value;
  }

  public setValue(value: string): this {
    this.textarea.value = value;
    return this;
  }

  public setPlaceholder(placeholder: string): this {
    this.textarea.placeholder = placeholder;
    return this;
  }

  public setRows(rows: number): this {
    this.textarea.rows = rows;
    return this;
  }

  public setCols(cols: number): this {
    this.textarea.cols = cols;
    return this;
  }

  public clear(): this {
    this.textarea.value = '';
    return this;
  }

  public setAutocomplete(autocomplete: 'on' | 'off'): this {
    this.textarea.autocomplete = autocomplete;
    return this;
  }
}
