import BaseComponent from './BaseComponent';
import type { FormComponentProps } from '../../types/components/FormComponent.types';

export class FormComponent extends BaseComponent {
  constructor({ method = 'get', action, ...rest }: FormComponentProps = {}) {
    super({
      tag: 'form',
      ...rest,
    });

    if (method) this.setMethod(method);
    if (action) this.setAction(action);
  }

  private get form(): HTMLFormElement {
    if (!(this.element instanceof HTMLFormElement)) {
      throw new Error('Element is not a form');
    }
    return this.element;
  }

  public setAction(action: string) {
    this.form.action = action;
    return this;
  }

  public setMethod(method: 'get' | 'post') {
    this.form.method = method;
    return this;
  }

  public submit() {
    this.form.submit();
  }

  public reset() {
    this.form.reset();
  }

  public getFormData(): FormData {
    return new FormData(this.form);
  }
}
