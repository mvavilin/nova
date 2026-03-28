import { Language } from '@/types';
import { TranslationKeys } from '../translationKeys';

const appLanguage = {
  [Language.EN]: {
    [TranslationKeys.LANGUAGE_BUTTON]: 'RU',
  },
  [Language.RU]: {
    [TranslationKeys.LANGUAGE_BUTTON]: 'EN',
  },
};

export default appLanguage;
