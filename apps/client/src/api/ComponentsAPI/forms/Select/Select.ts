import BaseComponent from '../../base/BaseComponent';
import type { SelectComponentProperties } from './Select.types';

export default class SelectComponent extends BaseComponent {
  constructor({ value, options, multiple = false, ...rest }: SelectComponentProperties = {}) {
    super({ tag: 'select', ...rest });

    this.setMultiple(multiple);

    if (options) this.setOptions(options);
    if (value !== undefined) this.setValue(value);
  }

  private get select(): HTMLSelectElement {
    if (this.element instanceof HTMLSelectElement) return this.element;
    throw new TypeError('Element is not a select');
  }

  public setOptions(options: { value: string; label: string; selected?: boolean }[]): this {
    this.clearOptions();
    for (const opt of options) this.addOption(opt.value, opt.label, !!opt.selected);
    return this;
  }

  public addOption(value: string, label: string, selected = false): this {
    const option = document.createElement('option');
    option.value = value;
    option.textContent = label;
    option.selected = selected;
    this.select.append(option);
    return this;
  }

  public removeOption(value: string): this {
    const option = [...this.select.options].find((o) => o.value === value);
    if (option) option.remove();
    return this;
  }

  public clearOptions(): this {
    while (this.select.firstChild) {
      this.select.firstChild.remove();
    }
    return this;
  }

  public getValue(): string | string[] {
    if (this.select.multiple) {
      return [...this.select.selectedOptions].map((o) => o.value);
    }
    return this.select.value;
  }

  public setValue(value: string | string[]): this {
    if (this.select.multiple && Array.isArray(value)) {
      for (const o of this.select.options) {
        o.selected = value.includes(o.value);
      }
    } else if (!this.select.multiple && typeof value === 'string') {
      this.select.value = value;
    }
    return this;
  }

  public isMultiple(): boolean {
    return this.select.multiple;
  }

  public setMultiple(multiple: boolean): this {
    this.select.multiple = multiple;
    return this;
  }
}
