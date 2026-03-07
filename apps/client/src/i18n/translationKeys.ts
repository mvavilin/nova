export const TranslationKeys = {
  LOGIN: 'login',
  LANGUAGE: 'language',
  REGISTRATION: 'registration',
} as const;

export type TranslationKey = (typeof TranslationKeys)[keyof typeof TranslationKeys];
