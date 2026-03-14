import { ButtonComponent, FormComponent } from '@/api/ComponentsAPI';
import type { BaseFormProps, FormType } from './BaseFormTypes';
import store from '@/store/store';
import type InputForm from '../InputForm/InputForm';
import type RegistrationHeading from '@/pages/RegistrationPage/RegistrationHeading/RegistrationHeading';
import { FormActions } from '@/store/actions/form.actions';
import { Overlay } from '../ui';
import Loader from '../ui/Loader/Loader';

export default class BaseForm extends FormComponent {
  private formId: FormType;
  protected title: RegistrationHeading;
  protected inputArray: InputForm[];
  protected buttonSubmit: ButtonComponent;
  protected isSubmiting = false;

  constructor(parameters: BaseFormProps) {
    super({
      method: 'post',
      classes:
        'w-91 p-8 bg-white/65 rounded-xl flex flex-col justify-center items-center gap-2 m-0',
    });

    this.formId = parameters.formId;
    this.title = parameters.title;
    this.inputArray = parameters.inputArray;
    this.buttonSubmit = parameters.buttonSubmit;

    this.init();
  }

  private init(): void {
    this.appendChildren([this.title, ...this.inputArray, this.buttonSubmit]);

    this.addSubscriptions([store.subscribe(() => this.updateUI())]);

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

    //Для изменения инпутов через состояние формы
    for (const input of this.inputArray) {
      const fieldName = input.getFieldName();
      const fieldData = state.fields[fieldName];

      if (fieldData?.isChanged) {
        input.updateStatus(fieldData.isValid);
      }
    }
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

    const loaderOverlay = new Overlay(new Loader());
    loaderOverlay.show();

    const data = this.getFormInputValues();

    store.dispatch({
      type: FormActions.FETCH_DATA,
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
}
