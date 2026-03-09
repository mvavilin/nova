export const TranslationKeys = {
  ABOUT: 'about',
  LOGIN: 'login',
  LANGUAGE: 'language',
  REGISTRATION: 'registration',
} as const;

export type TranslationKey = (typeof TranslationKeys)[keyof typeof TranslationKeys];
