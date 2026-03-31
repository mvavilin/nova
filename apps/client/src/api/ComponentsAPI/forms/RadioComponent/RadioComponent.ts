import InputComponent from '../InputComponent/InputComponent';
import type { RadioComponentProperties } from './RadioComponent.types';

export default class RadioComponent extends InputComponent {
  constructor({ checked, value, ...properties }: RadioComponentProperties = {}) {
    super({ type: 'radio', ...properties });

    if (checked !== undefined) this.setChecked(checked);
    if (value !== undefined) this.setValue(value);
  }

  public isChecked(): boolean {
    return this.input.checked;
  }

  public setChecked(state: boolean): this {
    this.input.checked = state;
    return this;
  }
}
