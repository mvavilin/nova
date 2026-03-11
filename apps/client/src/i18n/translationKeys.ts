export const TranslationKeys = {
  WELCOME_ABOUT: 'about',
  WELCOME_LOGIN: 'login',
  WELCOME_LANGUAGE: 'language',
  WELCOME_REGISTRATION: 'registration',
  WELCOME_DESCRIPTION: 'description',
} as const;

export type TranslationKey = (typeof TranslationKeys)[keyof typeof TranslationKeys];
