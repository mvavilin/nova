import { Language } from '@/types';
import type { TranslationKey } from '../translationKeys';
import formLanguage from './form';
import registrationPageLanguage from './registrationPage';
import welcomePage from './welcomePage';
import loginPageLanguage from './loginPage';
import gameRules from './gameRules';
import appLanguage from './app';
import roomPageLanguage from './roomPage';

export const translations: Record<Language, Record<TranslationKey, string>> = {
  [Language.EN]: {
    ...appLanguage[Language.EN],
    ...welcomePage[Language.EN],
    ...formLanguage[Language.EN],
    ...registrationPageLanguage[Language.EN],
    ...loginPageLanguage[Language.EN],
    ...gameRules[Language.EN],
    ...roomPageLanguage[Language.EN],
  },
  [Language.RU]: {
    ...appLanguage[Language.RU],
    ...welcomePage[Language.RU],
    ...formLanguage[Language.RU],
    ...registrationPageLanguage[Language.RU],
    ...loginPageLanguage[Language.RU],
    ...gameRules[Language.RU],
    ...roomPageLanguage[Language.RU],
  },
};
