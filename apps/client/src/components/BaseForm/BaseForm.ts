import { ButtonComponent, FormComponent, HeadingComponent } from '@/api/ComponentsAPI';
import type { BaseFormProps, FormType } from './BaseForm.types';
import store from '@/store/store';
import type InputForm from '../InputForm/InputForm';
import { FormActionTypes } from '@/store/actions/form.actions';
import { Overlay } from '../ui';
import Loader from '../ui/Loader/Loader';
import { TranslationKeys } from '@/i18n/translationKeys';
import { t } from 'i18n';

const styles = {
  form: 'w-70 p-6 sm:w-80 sm:p-8 md:w-90 md:p-10 bg-white/45 rounded-xl my-auto flex flex-col justify-center items-center gap-2 m-0',
};

export default class BaseForm extends FormComponent {
  private formId: FormType;
  protected title: HeadingComponent;
  protected inputArray: InputForm[];
  protected buttonSubmit: ButtonComponent;
  protected isSubmiting = false;
  private unsubscribe: () => void;

  constructor(parameters: BaseFormProps) {
    super({
      method: 'post',
      classes: styles.form,
    });

    this.formId = parameters.formId;
    this.title = parameters.title;
    this.inputArray = parameters.inputArray;
    this.buttonSubmit = parameters.buttonSubmit;

    this.init();
    this.unsubscribe = store.subscribe(() => this.updateUI());
  }

  private init(): void {
    this.appendChildren([this.title, ...this.inputArray, this.buttonSubmit]);

    this.setListeners({
      submit: (event: Event) => {
        event.preventDefault();
        this.handleSubmit();
      },
    });

    this.updateUI();
  }

  private updateUI(): void {
    const state = store.getState()[this.formId];
    if (!state) return;

    const isValid = state.isFormValid;
    if (isValid) this.buttonSubmit.removeAttributes('disabled');
    else this.buttonSubmit.setAttributes({ disabled: 'disabled' });

    this.buttonSubmit.toggleClasses('disabled-state', !isValid);
  }

  public getFormInputValues(): Record<string, string> {
    const { fields } = store.getState()[this.formId];
    const data: Record<string, string> = {};

    for (const [key, field] of Object.entries(fields)) {
      if (field) {
        data[key] = field.value;
      }
    }
    return data;
  }

  private handleSubmit(): void {
    if (this.isSubmiting || !store.getState()[this.formId].isFormValid) return;

    this.isSubmiting = true;

    const loaderOverlay = new Overlay(new Loader(t(TranslationKeys.FORM_MESSAGE_TO_USER)));
    loaderOverlay.show();

    const data = this.getFormInputValues();

    store.dispatch({
      type: FormActionTypes.FETCH_DATA,
      payload: {
        formId: this.formId,
        formData: data,
        loader: loaderOverlay,
        onFinished: () => {
          this.isSubmiting = false;
        },
      },
    });
  }

  public override destroy(): this {
    this.unsubscribe();
    for (const input of this.inputArray) input.destroy();
    this.title.destroy();
    this.buttonSubmit.destroy();

    super.destroy();
    return this;
  }
}
