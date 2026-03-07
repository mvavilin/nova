import { ButtonComponent, FormComponent } from '@/api/ComponentsAPI';
import type { BaseFormProps, FormType } from './BaseFormTypes';
import clientUserStore from '@/store/clientUserStore';
import type InputForm from '../InputForm/InputForm';
import type RegistrationHeading from '@/pages/RegistrationPage/RegistrationHeading/RegistartionHeading';

export default class BaseForm extends FormComponent {
  private formId: FormType;
  private title: RegistrationHeading;
  private inputArray: InputForm[];
  private buttonSubmit: ButtonComponent;

  constructor(parameters: BaseFormProps) {
    super({
      method: 'post',
      classes:
        'fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-88 p-8 md:w-98 md:p-10 bg-primary/85 rounded-xl flex flex-col justify-center items-center gap-4 m-0',
    });

    this.formId = parameters.formId;
    this.title = parameters.title;
    this.inputArray = parameters.inputArray;
    this.buttonSubmit = parameters.buttonSubmit;

    this.init();
  }

  private init(): void {
    this.appendChildren([this.title, ...this.inputArray, this.buttonSubmit]);

    clientUserStore.subscribe(() => this.updateUI());

    this.setListeners({
      submit: (event: Event) => {
        event.preventDefault();
        console.log(555);
        this.handleSubmit();
      },
    });

    this.buttonSubmit.setListeners({
      submit: (event: Event) => {
        event.preventDefault();
        console.log(555);
        this.handleSubmit();
      },
    });
    this.updateUI();
  }

  private updateUI(): void {
    // 1. Достаем состояние конкретной формы по formId (registration | login | profile)
    const state = clientUserStore.getState()[this.formId];
    if (!state) return;
    // 2. Управляем кнопкой через флаг isFormValid
    const isValid = state.isFormValid;
    this.buttonSubmit.setAttributes({ disabled: isValid ? 'false' : 'true' });
    this.buttonSubmit.toggleClasses('disabled-state', !isValid);

    // 3. (Опционально) Если нужно синхронизировать инпуты "снаружи"
    for (const input of this.inputArray) {
      const fieldName = input.getFieldName();
      const fieldData = state.fields[fieldName];

      if (fieldData?.isChanged) {
        input.updateStatus(fieldData.isValid, fieldData.error);
      }
    }
  }

  public getFormInputValues(): Record<string, string> {
    const { fields } = clientUserStore.getState()[this.formId];
    const data: Record<string, string> = {};
    // Собираем только значения (values) из всех полей
    for (const [key, field] of Object.entries(fields)) {
      if (field) {
        data[key] = field.value;
      }
    }
    return data;
  }

  private handleSubmit(): void {
    if (!clientUserStore.getState()[this.formId].isFormValid) return;

    const data = this.getFormInputValues();
    console.log(`Submit ${this.formId}:`, data);
    // Здесь обычно диспатчится бизнес-экшен (например, SEND_DATA)
  }
}
