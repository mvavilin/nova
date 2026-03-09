import { Language } from '@types';
import { TranslationKeys } from '../translationKeys';

const welcomePage = {
  [Language.EN]: {
    [TranslationKeys.ABOUT]: 'About',
    [TranslationKeys.LOGIN]: 'Log In',
    [TranslationKeys.LANGUAGE]: 'Ru',
    [TranslationKeys.REGISTRATION]: 'Sign In',
  },
  [Language.RU]: {
    [TranslationKeys.ABOUT]: 'Об игре',
    [TranslationKeys.LOGIN]: 'Войти',
    [TranslationKeys.LANGUAGE]: 'En',
    [TranslationKeys.REGISTRATION]: 'Регистрация',
  },
};

export default welcomePage;
