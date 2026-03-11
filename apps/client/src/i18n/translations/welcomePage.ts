import { Language } from '@types';
import { TranslationKeys } from '../translationKeys';

const welcomePage = {
  [Language.EN]: {
    [TranslationKeys.WELCOME_ABOUT]: 'About',
    [TranslationKeys.WELCOME_LOGIN]: 'Log In',
    [TranslationKeys.WELCOME_LANGUAGE]: 'Ru ',
    [TranslationKeys.WELCOME_REGISTRATION]: 'Sign In',
    [TranslationKeys.WELCOME_DESCRIPTION]:
      'Train. Answer. Win. A multiplayer game designed to help you prepare for technical interviews. Guess JS/TS concepts, prove your knowledge, and get stronger. No coder wins alone — team up with fellow code jedis or train with an AI captain.',
  },
  [Language.RU]: {
    [TranslationKeys.WELCOME_ABOUT]: 'Правила',
    [TranslationKeys.WELCOME_LOGIN]: 'Войти',
    [TranslationKeys.WELCOME_LANGUAGE]: 'En',
    [TranslationKeys.WELCOME_REGISTRATION]: 'Регистрация',
    [TranslationKeys.WELCOME_DESCRIPTION]:
      'Тренируйся. Отвечай. Побеждай. Мультилеерная игра для подготовки к техническим собеседованиям. Угадывай JS/TS концепты, подтверждай знания и становись сильнее. Один в поле не воин – объединяйся с джедаями кода или тренируйся с ИИ-капитаном.',
  },
};

export default welcomePage;
