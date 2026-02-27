import InputComponent from '../InputComponent/InputComponent';
import type { BaseComponentProperties } from '../../base/BaseComponent.types';

export type RadioComponentProperties = {
  checked?: boolean;
  name?: string;
} & Omit<BaseComponentProperties, 'tag'>;

export default class RadioComponent extends InputComponent {
  constructor({ checked, ...rest }: RadioComponentProperties = {}) {
    super({ type: 'radio', ...rest });

    if (checked !== undefined) this.setChecked(checked);
  }

  public isChecked(): boolean {
    return this.input.checked;
  }

  public setChecked(state: boolean): this {
    this.input.checked = state;
    return this;
  }
}
