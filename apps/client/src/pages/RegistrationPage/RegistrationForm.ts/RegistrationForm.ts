import BaseForm from '@/components/BaseForm/BaseForm';
import InputForm from '@/components/InputForm/InputForm';
import { formInputValues } from '@/components/InputForm/InputForm.constants';
import { ButtonComponent } from '@/api/ComponentsAPI';
import RegistrationHeading from '../RegistrationHeading/RegistartionHeading';
import { formHeadingText } from '../RegistrationHeading/RegistrationHeading.constants';

export default class RegistrationForm extends BaseForm {
  constructor() {
    const title = new RegistrationHeading();

    const nameInput = new InputForm({
      ...formInputValues.username,
      formId: 'registration',
      fieldName: 'username',
    });

    const emailInput = new InputForm({
      ...formInputValues.email,
      formId: 'registration',
      fieldName: 'email',
    });

    const passwordInput = new InputForm({
      ...formInputValues.password,
      formId: 'registration',
      fieldName: 'password',
    });

    const submitButton = new ButtonComponent({
      content: formHeadingText.ru.regButton,
      classes:
        'bg-transparent border border-solid border-black w-36 h-9 rounded-md font-medium hover:cursor-pointer hover:bg-yellow-400 hover:transition-colors hover:duration-300 disabled-state',
      type: 'submit',
      attributes: { disabled: true },
    });

    super({
      formId: 'registration',
      title: title,
      inputArray: [nameInput, emailInput, passwordInput],
      buttonSubmit: submitButton,
    });
  }
}
