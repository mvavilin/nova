import { Language } from '@types';
import { TranslationKeys } from '../translationKeys';

const formLanguage = {
  [Language.EN]: {
    [TranslationKeys.FORM_LABEL_NAME]: 'Name',
    [TranslationKeys.FORM_LABEL_EMAIL]: 'Email',
    [TranslationKeys.FORM_LABEL_PASSWORD]: 'Password',
    [TranslationKeys.FORM_PLACEHOLDER_NAME]: 'Enter your name...',
    [TranslationKeys.FORM_PLACEHOLDER_EMAIL]: 'Enter your email...',
    [TranslationKeys.FORM_PLACEHOLDER_PASSWORD]: 'Enter your password...',
    [TranslationKeys.FORM_ERROR_MESSAGE_NAME]: `•\u00A0Minimum length is 2, maximum length is 20.\n •\u00A0Only English and Russian letters, digits and hyphen are allowed.`,
    [TranslationKeys.FORM_ERROR_MESSAGE_EMAIL]: `•\u00A0Minimum length is 6, maximum length is 30.\n •\u00A0Please enter a valid email address (e.g., name@domain.com).`,
    [TranslationKeys.FORM_ERROR_MESSAGE_PASSWORD]:
      '•\u00A0Minimum length is 6, maximum length is 12.\n •\u00A0Password must contain one capital English letter and one special character.\n •\u00A0Russian letters are not allowed.',
  },
  [Language.RU]: {
    [TranslationKeys.FORM_LABEL_NAME]: 'Имя',
    [TranslationKeys.FORM_LABEL_EMAIL]: 'Email',
    [TranslationKeys.FORM_LABEL_PASSWORD]: 'Пароль',
    [TranslationKeys.FORM_PLACEHOLDER_NAME]: 'Введите имя...',
    [TranslationKeys.FORM_PLACEHOLDER_EMAIL]: 'Введите email...',
    [TranslationKeys.FORM_PLACEHOLDER_PASSWORD]: 'Введите пароль...',
    [TranslationKeys.FORM_ERROR_MESSAGE_NAME]: `•\u00A0Минимальная длина 2, максимальная длина 20.\n •\u00A0Допускаются только английские и русские буквы, цифры и дефис.`,
    [TranslationKeys.FORM_ERROR_MESSAGE_EMAIL]: `•\u00A0Минимальная длина 6, максимальная длина 30.\n •\u00A0Пожалуйста введите валидный email (например, name@domain.com).`,
    [TranslationKeys.FORM_ERROR_MESSAGE_PASSWORD]: `•\u00A0Минимальная длина 6, максимальная длина 12.\n •\u00A0Пароль должен содержать одну заглавную английскую букву и один спецсимвол.\n •\u00A0Русские буквы не допускаются.`,
  },
};

export default formLanguage;
