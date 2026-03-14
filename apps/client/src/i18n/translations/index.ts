import { Language } from '@/types';
import type { TranslationKey } from '../translationKeys';
import formLanguage from './form';
import registrationPageLanguage from './registrationPage';
import welcomePage from './welcomePage';
import loginPageLanguage from './loginPage';

export const translations: Record<Language, Record<TranslationKey, string>> = {
  [Language.EN]: {
    ...welcomePage[Language.EN],
    ...formLanguage[Language.EN],
    ...registrationPageLanguage[Language.EN],
    ...loginPageLanguage[Language.EN],
  },
  [Language.RU]: {
    ...welcomePage[Language.RU],
    ...formLanguage[Language.RU],
    ...registrationPageLanguage[Language.RU],
    ...loginPageLanguage[Language.RU],
  },
};
