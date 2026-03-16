import type { FieldName, InputFieldProps } from './InputForm.types';
import { TranslationKeys } from '@/i18n/translationKeys';

export const formInputValues: Record<FieldName, InputFieldProps> = {
  username: {
    id: 'userName',
    type: 'text',
    name: 'nameInput',
    autocomplete: 'off',
    minLength: '2',
    maxLength: '16',
    pattern: /^[a-za-яё0-9-]+$/i,
    placeholderKey: TranslationKeys.FORM_PLACEHOLDER_NAME,
    labelTextKey: TranslationKeys.FORM_LABEL_NAME,
    errorKey: TranslationKeys.FORM_ERROR_MESSAGE_NAME,
  },
  email: {
    id: 'userEmail',
    type: 'email',
    name: 'emailInput',
    autocomplete: 'off',
    minLength: '6',
    maxLength: '30',
    pattern: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i,
    placeholderKey: TranslationKeys.FORM_PLACEHOLDER_EMAIL,
    labelTextKey: TranslationKeys.FORM_LABEL_EMAIL,
    errorKey: TranslationKeys.FORM_ERROR_MESSAGE_EMAIL,
  },

  password: {
    id: 'userPassword',
    type: 'password',
    name: 'passwordInput',
    autocomplete: 'off',
    minLength: '6',
    maxLength: '12',
    pattern: /^(?=.*[A-Z])(?=.*[!@#$%^&*])[A-Za-z0-9!@#$%^&*]+$/,
    placeholderKey: TranslationKeys.FORM_PLACEHOLDER_PASSWORD,
    labelTextKey: TranslationKeys.FORM_LABEL_PASSWORD,
    errorKey: TranslationKeys.FORM_ERROR_MESSAGE_PASSWORD,
  },
};
