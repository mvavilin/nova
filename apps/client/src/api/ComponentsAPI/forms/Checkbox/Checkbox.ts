import InputComponent from '../Input/Input';
import type { CheckboxComponentProperties } from './Checkbox.types';

export default class CheckboxComponent extends InputComponent {
  constructor({ checked, ...rest }: CheckboxComponentProperties = {}) {
    super({ type: 'checkbox', ...rest });

    if (checked !== undefined) this.setChecked(checked);
  }

  public isChecked(): boolean {
    return this.input.checked;
  }

  public setChecked(state: boolean): this {
    this.input.checked = state;
    return this;
  }

  public toggle(): this {
    this.input.checked = !this.input.checked;
    return this;
  }
}
