import { Language } from '@/types';
import { TranslationKeys } from '../translationKeys';

const registrationPageLanguage = {
  [Language.EN]: {
    [TranslationKeys.REGISTRATION_TITLE]: 'Sign up',
    [TranslationKeys.REGISTRATION_SUBMIT_BTN]: 'Submit',
    [TranslationKeys.REGISTRATION_LANG_BTN]: 'RU',
  },
  [Language.RU]: {
    [TranslationKeys.REGISTRATION_TITLE]: 'Регистрация',
    [TranslationKeys.REGISTRATION_SUBMIT_BTN]: 'Отправить',
    [TranslationKeys.REGISTRATION_LANG_BTN]: 'EN',
  },
};

export default registrationPageLanguage;
