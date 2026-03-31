import { Language } from '@/types';
import { TranslationKeys } from '../translationKeys';

const toast = {
  [Language.EN]: {
    [TranslationKeys.UNDO_LABEL]: 'Undo',
  },
  [Language.RU]: {
    [TranslationKeys.UNDO_LABEL]: 'Закрыть',
  },
};

export default toast;
