import type { FieldName, InputFieldProps } from './InputForm.type';

export const formInputText = {
  en: {
    labelName: 'Name',
    labelEmail: 'Email',
    labelPassword: 'Password',
    placeholderName: 'Enter your name...',
    placeholderEmail: 'Enter your email...',
    placeholderPassword: 'Enter your password...',
    errorMessageName: `•\u00A0Minimum length is 2, maximum length is 20. •\u00A0Only English and Russian letters, digits and hyphen are allowed.`,
    errorMessageEmail: `•\u00A0Minimum length is 6, maximum length is 30. •\u00A0Please enter a valid email address (e.g., name@domain.com).`,
    errorMessagePassword: `•\u00A0Minimum length is 6, maximum length is 12.
    •\u00A0Password must contain one capital English letter and one special character.`,
  },
  ru: {
    labelName: 'Имя',
    labelEmail: 'Email',
    labelPassword: 'Пароль',
    placeholderName: 'Введите имя...',
    placeholderEmail: 'Введите email...',
    placeholderPassword: 'Введите пароль...',
    errorMessageName: `•\u00A0Минимальная длина 2, максимальная длина 20. •\u00A0Допускаются только английские и русские буквы, цифры и дефис.`,
    errorMessageEmail: `•\u00A0Минимальная длина 6, максимальная длина 30. •\u00A0Пожалуйста введите валидный email (например, name@domain.com).`,
    errorMessagePassword: `•\u00A0Минимальная длина 6, максимальная длина 12.
    •\u00A0Пароль должен содержать одну заглавную английскую букву и один спецсимвол.`,
  },
};

export const formInputValues: Record<FieldName, InputFieldProps> = {
  username: {
    id: 'userName',
    type: 'text',
    name: 'nameInput',
    autocomplete: 'off',
    minLength: '2',
    maxLength: '16',
    pattern: /^[a-za-яёA-ZА-ЯЁ0-9-]+$/,
    placeholder: formInputText.ru.placeholderName,
    labelText: formInputText.ru.labelName,
    errorMessage: formInputText.ru.errorMessageName,
  },
  email: {
    id: 'userEmail',
    type: 'email',
    name: 'emailInput',
    autocomplete: 'off',
    minLength: '6',
    maxLength: '30',
    pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    placeholder: formInputText.ru.placeholderEmail,
    labelText: formInputText.ru.labelEmail,
    errorMessage: formInputText.ru.errorMessageEmail,
  },

  password: {
    id: 'userPassword',
    type: 'password',
    name: 'passwordInput',
    autocomplete: 'off',
    minLength: '6',
    maxLength: '12',
    pattern: /^(?=.*[A-Z])(?=.*[!@#$%^&*]).+$/,
    placeholder: formInputText.ru.placeholderPassword,
    labelText: formInputText.ru.labelPassword,
    errorMessage: formInputText.ru.errorMessagePassword,
  },
};
