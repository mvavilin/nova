import BaseComponent from '../BaseComponent/base-component';
import type { FormComponentProperties } from './form-component.types';

export default class FormComponent extends BaseComponent {
  constructor({ method = 'get', action, ...rest }: FormComponentProperties = {}) {
    super({
      tag: 'form',
      ...rest,
    });

    if (method) this.setMethod(method);
    if (action) this.setAction(action);
  }

  private get form(): HTMLFormElement {
    if (!(this.element instanceof HTMLFormElement)) {
      throw new TypeError('Element is not a form');
    }
    return this.element;
  }

  public setAction(action: string): this {
    this.form.action = action;
    return this;
  }

  public setMethod(method: HTMLFormElement['method']): this {
    this.form.method = method;
    return this;
  }

  public submit(): void {
    this.form.submit();
  }

  public reset(): void {
    this.form.reset();
  }

  public getFormData(): FormData {
    return new FormData(this.form);
  }
}
