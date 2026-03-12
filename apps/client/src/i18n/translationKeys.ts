export const TranslationKeys = {
  LOGIN: 'login',
  LANGUAGE: 'language',
  REGISTRATION: 'registration',
  FORM_LABEL_NAME: 'labelName',
  FORM_LABEL_EMAIL: 'labelEmail',
  FORM_LABEL_PASSWORD: 'labelPassword',
  FORM_PLACEHOLDER_NAME: 'placeholderName',
  FORM_PLACEHOLDER_EMAIL: 'placeholderEmail',
  FORM_PLACEHOLDER_PASSWORD: 'placeholderPassword',
  FORM_ERROR_MESSAGE_NAME: 'errorMessageName',
  FORM_ERROR_MESSAGE_EMAIL: 'errorMessageEmail',
  FORM_ERROR_MESSAGE_PASSWORD: 'errorMessagePassword',
  REGISTRATION_TITLE: 'registrationTitle',
  REGISTRATION_SUBMIT_BTN: 'registrationSubmitBtn',
  REGISTRATION_LANG_BTN: 'registrationLangBtn',
} as const;

export type TranslationKey = (typeof TranslationKeys)[keyof typeof TranslationKeys];
