export const TranslationKeys = {
  WELCOME_ABOUT: 'welcome-about',
  WELCOME_LOGIN: 'welcome-login',
  WELCOME_LOBBY: 'welcome-lobby',
  WELCOME_HEADING: 'welcome-heading',
  WELCOME_LANGUAGE: 'welcome-language',
  WELCOME_REGISTRATION: 'welcome-registration',
  WELCOME_DESCRIPTION: 'welcome-description',
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
