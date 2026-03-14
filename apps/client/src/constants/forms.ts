export const CREATE_ROOM_FORM_CONFIG = {
  PLAYERS: {
    NAME: 'playerCount',
    DEFAULT: '4',
    LABEL_TEXT: 'Выберите количество игроков',
    ITEMS: [
      { ID: 'players-4', VALUE: '4', LABEL: '4' },
      { ID: 'players-6', VALUE: '6', LABEL: '6' },
      { ID: 'players-8', VALUE: '8', LABEL: '8' },
    ],
  },
  ROOM: {
    LABEL_TEXT: 'Введите название комнаты',
    INPUT_ID: 'roomName',
    INPUT_NAME: 'roomName',
    PLACEHOLDER: 'Название комнаты',
  },
  BUTTON: {
    LABEL: 'Создать',
  },
  LOG: {
    PLAYERS: 'Количество игроков:',
    ROOM: 'Название комнаты:',
  },
} as const;
