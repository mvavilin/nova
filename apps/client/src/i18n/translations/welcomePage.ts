import { Language } from '@/types';
import { TranslationKeys } from '../translationKeys';

const welcomePage = {
  [Language.EN]: {
    [TranslationKeys.LOGIN]: 'Log In',
    [TranslationKeys.LANGUAGE]: 'RU',
    [TranslationKeys.REGISTRATION]: 'Sign In',
  },
  [Language.RU]: {
    [TranslationKeys.LOGIN]: 'Войти',
    [TranslationKeys.LANGUAGE]: 'EN',
    [TranslationKeys.REGISTRATION]: 'Регистрация',
  },
};

export default welcomePage;
