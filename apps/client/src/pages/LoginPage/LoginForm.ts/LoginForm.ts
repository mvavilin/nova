import BaseForm from '@/components/BaseForm/BaseForm';
import InputForm from '@/components/InputForm/InputForm';
import { formInputValues } from '@/components/InputForm/InputForm.constants';
import LoginHeading from '../LoginHeading/LoginHeading';
import LoginSubmitButton from '../LoginSubmitButton/LoginSubmitButton';

export default class LoginForm extends BaseForm {
  constructor() {
    const title = new LoginHeading();

    const emailInput = new InputForm({
      ...formInputValues.email,
      formId: 'login',
      fieldName: 'email',
    });

    const passwordInput = new InputForm({
      ...formInputValues.password,
      formId: 'login',
      fieldName: 'password',
    });

    const submitButton = new LoginSubmitButton();

    super({
      formId: 'login',
      title: title,
      inputArray: [emailInput, passwordInput],
      buttonSubmit: submitButton,
    });
  }
}
