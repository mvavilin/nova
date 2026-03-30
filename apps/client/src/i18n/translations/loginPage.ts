import { Language } from '@/types';
import { TranslationKeys } from '../translationKeys';

const loginPageLanguage = {
  [Language.EN]: {
    [TranslationKeys.LOGIN_TITLE]: 'Sign in',
    [TranslationKeys.LOGIN_SUBMIT_BTN]: 'Submit',
  },
  [Language.RU]: {
    [TranslationKeys.LOGIN_TITLE]: 'Войти',
    [TranslationKeys.LOGIN_SUBMIT_BTN]: 'Отправить',
  },
};

export default loginPageLanguage;
