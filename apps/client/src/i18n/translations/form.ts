import { Language } from '@types';
import { TranslationKeys } from '../translationKeys';

const formLanguage = {
  [Language.EN]: {
    [TranslationKeys.FORM_LABEL_NAME]: 'Name',
    [TranslationKeys.FORM_LABEL_EMAIL]: 'Email',
    [TranslationKeys.FORM_LABEL_PASSWORD]: 'Password',
    [TranslationKeys.FORM_LABEL_CONFIRM_PASSWORD]: 'Repeat password',
    [TranslationKeys.FORM_PLACEHOLDER_NAME]: 'Enter your name...',
    [TranslationKeys.FORM_PLACEHOLDER_EMAIL]: 'Enter your email...',
    [TranslationKeys.FORM_PLACEHOLDER_PASSWORD]: 'Enter your password...',
    [TranslationKeys.FORM_PLACEHOLDER_CONFIRM_PASSWORD]: 'Repeat your password again...',
    [TranslationKeys.FORM_ERROR_MESSAGE_NAME]: `•\u00A0Minimum length is 2 characters, maximum length is 30 characters.`,
    [TranslationKeys.FORM_ERROR_MESSAGE_EMAIL]: `•\u00A0Please enter a valid email address (e.g., name@domain.io).`,
    [TranslationKeys.FORM_ERROR_MESSAGE_PASSWORD]: 'Error password',
    [TranslationKeys.FORM_ERROR_MESSAGE_PASSWORD_ONLY_ENGLISH]: `•\u00A0Only English letters are allowed.`,
    [TranslationKeys.FORM_ERROR_MESSAGE_PASSWORD_REQUIREMENTS]: `•\u00A0Password must contain one capital English letter and one special character.`,
    [TranslationKeys.FORM_ERROR_MESSAGE_PASSWORD_MIN_LENGTH]: `•\u00A0Minimum length is 6 characters.`,
    [TranslationKeys.FORM_ERROR_MESSAGE_CONFIRM_PASSWORD]: `•\u00A0Passwords don't match.`,
    [TranslationKeys.FORM_ERROR]: 'Error',
    [TranslationKeys.FORM_ERROR_400]: 'please fill in all fields in form.',
    [TranslationKeys.FORM_ERROR_403]: 'invalid email or password.',
    [TranslationKeys.FORM_ERROR_409]: 'a user with this email already exists.',
    [TranslationKeys.FORM_ERROR_500]: 'server error. Please try later.',
    [TranslationKeys.FORM_ERROR_UNKNOWN]: 'unknown error.',
    [TranslationKeys.FORM_ERROR_CONNECTION]: 'connection error. Please check your internet.',
    [TranslationKeys.FORM_MESSAGE_TO_USER]: 'Sending data to server...',
  },

  [Language.RU]: {
    [TranslationKeys.FORM_LABEL_NAME]: 'Имя',
    [TranslationKeys.FORM_LABEL_EMAIL]: 'Email',
    [TranslationKeys.FORM_LABEL_PASSWORD]: 'Пароль',
    [TranslationKeys.FORM_LABEL_CONFIRM_PASSWORD]: 'Повторите пароль',
    [TranslationKeys.FORM_PLACEHOLDER_NAME]: 'Введите имя...',
    [TranslationKeys.FORM_PLACEHOLDER_EMAIL]: 'Введите email...',
    [TranslationKeys.FORM_PLACEHOLDER_PASSWORD]: 'Введите пароль...',
    [TranslationKeys.FORM_PLACEHOLDER_CONFIRM_PASSWORD]: 'Повторите пароль еще раз...',
    [TranslationKeys.FORM_ERROR_MESSAGE_NAME]: `•\u00A0Минимальная длина 2 символа, максимальная длина 30 символов.`,
    [TranslationKeys.FORM_ERROR_MESSAGE_EMAIL]: `•\u00A0Пожалуйста введите валидный email (например, name@domain.io).`,
    [TranslationKeys.FORM_ERROR_MESSAGE_PASSWORD]: 'Ошибка пароля',
    [TranslationKeys.FORM_ERROR_MESSAGE_PASSWORD_ONLY_ENGLISH]: `•\u00A0Допускаются только английские буквы.`,
    [TranslationKeys.FORM_ERROR_MESSAGE_PASSWORD_REQUIREMENTS]: `•\u00A0Пароль должен содержать одну заглавную английскую букву и один спецсимвол.`,
    [TranslationKeys.FORM_ERROR_MESSAGE_PASSWORD_MIN_LENGTH]: `•\u00A0Минимальная длина 6 символов.`,
    [TranslationKeys.FORM_ERROR_MESSAGE_CONFIRM_PASSWORD]: `•\u00A0Пароли не совпадают.`,
    [TranslationKeys.FORM_ERROR]: 'Ошибка',
    [TranslationKeys.FORM_ERROR_400]: 'пожалуйста, заполните все поля формы.',
    [TranslationKeys.FORM_ERROR_403]: 'неправильный email или пароль.',
    [TranslationKeys.FORM_ERROR_409]: 'пользователь с таким email уже существует.',
    [TranslationKeys.FORM_ERROR_500]: 'ошибка сервера. Пожалуйста, попробуйте позже.',
    [TranslationKeys.FORM_ERROR_UNKNOWN]: 'неизвестная ошибка.',
    [TranslationKeys.FORM_ERROR_CONNECTION]:
      'ошибка подключения. Пожалуйста, проверьте состояние вашего Интернета.',
    [TranslationKeys.FORM_MESSAGE_TO_USER]: 'Отправка данных на сервер...',
  },
};

export default formLanguage;
