import BaseForm from '@/components/BaseForm/BaseForm';
import InputForm from '@/components/InputForm/InputForm';
import { formInputValues } from '@/components/InputForm/InputForm.constants';
import RegistrationHeading from '../RegistrationHeading/RegistrationHeading';
import RegistrationSubmitButton from '../RegistrationSubmitButton/RegistrationSubmitButton';

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

    const submitButton = new RegistrationSubmitButton();

    super({
      formId: 'registration',
      title: title,
      inputArray: [nameInput, emailInput, passwordInput],
      buttonSubmit: submitButton,
    });
  }
}
