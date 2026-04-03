import { Language } from '@types';
import { TranslationKeys } from '@i18n/translationKeys';

const lobbyPage = {
  [Language.EN]: {
    [TranslationKeys.LOBBY_TITLE]: 'Lobby',

    [TranslationKeys.JOIN_ROOM_SECTION_TITLE]: 'Join room',
    [TranslationKeys.CREATE_ROOM_SECTION_TITLE]: 'Create room',
    [TranslationKeys.PUBLIC_ROOMS_SECTION_TITLE]: 'Public rooms',

    [TranslationKeys.PLAYER_COUNT_FIELD_TITLE]: 'Select number of players',

    [TranslationKeys.ROOM_NAME_FIELD_TITLE]: 'Room name',
    [TranslationKeys.ROOM_NAME_FIELD_PLACEHOLDER]: 'Enter room name',
    [TranslationKeys.ROOM_NAME_FIELD_CREATE_BUTTON_LABEL]: 'Create',

    [TranslationKeys.JOIN_ROOM_FIELD_TITLE]: 'Join room by ID',
    [TranslationKeys.JOIN_ROOM_FIELD_PLACEHOLDER]: 'Enter room ID',
    [TranslationKeys.JOIN_ROOM_FIELD_JOIN_BUTTON_LABEL]: 'Join',

    [TranslationKeys.SEARCH_ROOM_FIELD_TITLE]: 'Search room',
    [TranslationKeys.SEARCH_ROOM_FIELD_PLACEHOLDER]: 'Enter room name',
    [TranslationKeys.SEARCH_ROOM_FIELD_FIND_BUTTON_LABEL]: 'Find',

    [TranslationKeys.ROOMS_TABLE_HEADER_TITLES_ROOM]: 'Room',
    [TranslationKeys.ROOMS_TABLE_HEADER_TITLES_PLAYERS]: 'Players',
    [TranslationKeys.ROOMS_TABLE_HEADER_TITLES_STATUS]: 'Status',

    [TranslationKeys.ROOM_ROW_STATUS_WAITING]: 'Waiting',
    [TranslationKeys.ROOM_ROW_STATUS_PLAYING]: 'Playing',
    [TranslationKeys.ROOM_ROW_STATUS_FINISHING]: 'Finishing',

    [TranslationKeys.ROOM_ROW_JOIN_BUTTON]: 'Join',

    [TranslationKeys.FORM_EMPTY_FIELD_WARNING]: 'The field cannot be empty',
  },
  [Language.RU]: {
    [TranslationKeys.LOBBY_TITLE]: 'Лобби',

    [TranslationKeys.JOIN_ROOM_SECTION_TITLE]: 'Присоединиться к комнате',
    [TranslationKeys.CREATE_ROOM_SECTION_TITLE]: 'Создать комнату',
    [TranslationKeys.PUBLIC_ROOMS_SECTION_TITLE]: 'Публичные комнаты',

    [TranslationKeys.PLAYER_COUNT_FIELD_TITLE]: 'Выберите количество игроков',

    [TranslationKeys.ROOM_NAME_FIELD_TITLE]: 'Название комнаты',
    [TranslationKeys.ROOM_NAME_FIELD_PLACEHOLDER]: 'Введите название комнаты',
    [TranslationKeys.ROOM_NAME_FIELD_CREATE_BUTTON_LABEL]: 'Создать',

    [TranslationKeys.JOIN_ROOM_FIELD_TITLE]: 'Присоединиться к комнате по ID',
    [TranslationKeys.JOIN_ROOM_FIELD_PLACEHOLDER]: 'Введите ID комнаты',
    [TranslationKeys.JOIN_ROOM_FIELD_JOIN_BUTTON_LABEL]: 'Вступить',

    [TranslationKeys.SEARCH_ROOM_FIELD_TITLE]: 'Поиск комнаты',
    [TranslationKeys.SEARCH_ROOM_FIELD_PLACEHOLDER]: 'Введите название комнаты',
    [TranslationKeys.SEARCH_ROOM_FIELD_FIND_BUTTON_LABEL]: 'Найти',

    [TranslationKeys.ROOMS_TABLE_HEADER_TITLES_ROOM]: 'Комната',
    [TranslationKeys.ROOMS_TABLE_HEADER_TITLES_PLAYERS]: 'Игроков',
    [TranslationKeys.ROOMS_TABLE_HEADER_TITLES_STATUS]: 'Статус',

    [TranslationKeys.ROOM_ROW_STATUS_WAITING]: 'Ожидание',
    [TranslationKeys.ROOM_ROW_STATUS_PLAYING]: 'Игра',
    [TranslationKeys.ROOM_ROW_STATUS_FINISHING]: 'Завершение',

    [TranslationKeys.ROOM_ROW_JOIN_BUTTON]: 'Вступить',

    [TranslationKeys.FORM_EMPTY_FIELD_WARNING]: 'Поле не может быть пустым',
  },
} as const;

export default lobbyPage;
