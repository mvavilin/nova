import { Language } from '@/types';
import { TranslationKeys } from '../translationKeys';

const socketErrors = {
  [Language.EN]: {
    [TranslationKeys.SOCKET_ERROR]: 'Error',
    [TranslationKeys.SOCKET_ERROR_ALREADY_ONLINE]: 'this user is already connected',
  },

  [Language.RU]: {
    [TranslationKeys.SOCKET_ERROR]: 'Ошибка',
    [TranslationKeys.SOCKET_ERROR_ALREADY_ONLINE]: 'данный пользователь уже подключен',
  },
};

export default socketErrors;
