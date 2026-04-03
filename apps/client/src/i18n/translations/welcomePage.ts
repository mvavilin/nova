import { Language } from '@types';
import { TranslationKeys } from '../translationKeys';

const welcomePage = {
  [Language.EN]: {
    [TranslationKeys.WELCOME_RULES]: 'Game rules',
    [TranslationKeys.WELCOME_ABOUT]: 'About us',
    [TranslationKeys.WELCOME_LOGIN]: 'log in',
    [TranslationKeys.WELCOME_LOBBY]: 'to lobby',
    [TranslationKeys.WELCOME_HEADING]: 'nova codenames game',
    [TranslationKeys.WELCOME_REGISTRATION]: 'sign up',
    [TranslationKeys.WELCOME_DESCRIPTION]: `Train. Answer. Win.
    A multiplayer game designed to help you prepare for technical interviews. Guess JS/TS concepts, prove your knowledge, and get stronger. No coder wins alone – team up with fellow code jedis!`,
  },
  [Language.RU]: {
    [TranslationKeys.WELCOME_RULES]: 'Правила игры',
    [TranslationKeys.WELCOME_ABOUT]: 'О нас',
    [TranslationKeys.WELCOME_LOGIN]: 'войти',
    [TranslationKeys.WELCOME_LOBBY]: 'перейти в лобби',
    [TranslationKeys.WELCOME_HEADING]: 'nova codenames game',
    [TranslationKeys.WELCOME_REGISTRATION]: 'регистрация',
    [TranslationKeys.WELCOME_DESCRIPTION]: `Тренируйся. Отвечай. Побеждай.
      Мультиплеерная игра для подготовки к техническим собеседованиям. Угадывай JS/TS концепты, подтверждай знания и становись сильнее. Один в поле не воин – объединяйся с джедаями кода!`,
  },
};

export default welcomePage;
