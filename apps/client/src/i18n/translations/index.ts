import { Language } from '@/types';
import type { TranslationKey } from '../translationKeys';
import formLanguage from './form';
import registrationPageLanguage from './registrationPage';
import welcomePage from './welcomePage';
import loginPageLanguage from './loginPage';
import gameRules from './gameRules';
import appLanguage from './app';
import roomPageLanguage from './roomPage';
import aboutUs from './aboutUs';
import lobbyPage from '@i18n/translations/lobbyPage';
import gamePage from '@i18n/translations/gamePage';
import knowledgeCheckModal from '@i18n/translations/knowledgeCheckModal';
import toast from '@i18n/translations/toast';
import answerRatingModal from '@i18n/translations/answerRatingModal';
import gameResultsModal from '@i18n/translations/gameResultsModal';

export const translations: Record<Language, Record<TranslationKey, string>> = {
  [Language.EN]: {
    ...appLanguage[Language.EN],
    ...welcomePage[Language.EN],
    ...formLanguage[Language.EN],
    ...registrationPageLanguage[Language.EN],
    ...loginPageLanguage[Language.EN],
    ...gameRules[Language.EN],
    ...roomPageLanguage[Language.EN],
    ...aboutUs[Language.EN],
    ...lobbyPage[Language.EN],
    ...gamePage[Language.EN],
    ...knowledgeCheckModal[Language.EN],
    ...toast[Language.EN],
    ...answerRatingModal[Language.EN],
    ...gameResultsModal[Language.EN],
  },
  [Language.RU]: {
    ...appLanguage[Language.RU],
    ...welcomePage[Language.RU],
    ...formLanguage[Language.RU],
    ...registrationPageLanguage[Language.RU],
    ...loginPageLanguage[Language.RU],
    ...gameRules[Language.RU],
    ...roomPageLanguage[Language.RU],
    ...aboutUs[Language.RU],
    ...aboutUs[Language.EN],
    ...lobbyPage[Language.RU],
    ...gamePage[Language.RU],
    ...knowledgeCheckModal[Language.RU],
    ...toast[Language.RU],
    ...answerRatingModal[Language.RU],
    ...gameResultsModal[Language.RU],
  },
};
