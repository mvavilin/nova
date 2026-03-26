import { TranslationKeys } from '@i18n/translationKeys';
import { t } from '@i18n';

export const CREATE_ROOM_FORM_CONFIG = {
  PLAYERS: {
    NAME: 'playerCount',
    DEFAULT: '4',
    ITEMS: [
      { ID: 'players-4', VALUE: '4', LABEL: '4' },
      { ID: 'players-6', VALUE: '6', LABEL: '6' },
      { ID: 'players-8', VALUE: '8', LABEL: '8' },
    ],
  },
  ROOM: {
    INPUT_ID: 'roomName',
    INPUT_NAME: 'roomName',
  },
  LOG_CHAT: {
    INPUT_ID: 'tooltip',
    INPUT_NAME: 'tooltip',
    PLACEHOLDER: t(TranslationKeys.ROOM_NAME_FIELD_TITLE),
  },
} as const;
