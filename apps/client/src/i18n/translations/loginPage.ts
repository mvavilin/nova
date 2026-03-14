import { Language } from '@/types';
import { TranslationKeys } from '../translationKeys';

const loginPageLanguage = {
  [Language.EN]: {
    [TranslationKeys.LOGIN_TITLE]: 'Sign in',
    [TranslationKeys.LOGIN_SUBMIT_BTN]: 'Submit',
    [TranslationKeys.LOGIN_LANG_BTN]: 'RU',
  },
  [Language.RU]: {
    [TranslationKeys.LOGIN_TITLE]: 'Войти',
    [TranslationKeys.LOGIN_SUBMIT_BTN]: 'Отправить',
    [TranslationKeys.LOGIN_LANG_BTN]: 'EN',
  },
};

export default loginPageLanguage;
