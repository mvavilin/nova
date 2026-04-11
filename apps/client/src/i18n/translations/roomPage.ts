import { Language } from '@/types';
import { TranslationKeys } from '../translationKeys';

const roomPageLanguage = {
  [Language.EN]: {
    [TranslationKeys.ROOM_TITLE]: 'Room',
    [TranslationKeys.ROOM_INFO_TITLE]: 'Room:',
    [TranslationKeys.ROOM_INFO_PLAYERS]: 'Players:',
    [TranslationKeys.ROOM_LEAVE_ROOM_BTN]: 'Leave room',
    [TranslationKeys.ROOM_RED_TITLE]: 'Red team',
    [TranslationKeys.ROOM_BLUE_TITLE]: 'Blue team',
    [TranslationKeys.ROOM_PLAYER]: 'Player',
    [TranslationKeys.ROOM_ROLE]: 'Role',
    [TranslationKeys.ROOM_SPYMASTER]: 'Spymaster',
    [TranslationKeys.ROOM_AGENT]: 'Agent',
    [TranslationKeys.ROOM_SPYMASTER_BTN]: 'Play as Spymaster',
    [TranslationKeys.ROOM_AGENT_BTN]: 'Play as Agent',
    [TranslationKeys.ROOM_LEAVE_TEAM_BTN]: 'Leave team',
    [TranslationKeys.ROOM_PLAYERS_CHOOSING]: 'Players choosing team',
    [TranslationKeys.ROOM_TIMER_MESSAGE]: 'The game starts in',
    [TranslationKeys.ROOM_COPY_MESSAGE]: 'ID copied!',
  },
  [Language.RU]: {
    [TranslationKeys.ROOM_TITLE]: 'Комната',
    [TranslationKeys.ROOM_INFO_TITLE]: 'Комната:',
    [TranslationKeys.ROOM_INFO_PLAYERS]: 'Игроки:',
    [TranslationKeys.ROOM_LEAVE_ROOM_BTN]: 'Покинуть комнату',
    [TranslationKeys.ROOM_RED_TITLE]: 'Команда красных',
    [TranslationKeys.ROOM_BLUE_TITLE]: 'Команда синих',
    [TranslationKeys.ROOM_PLAYER]: 'Игрок',
    [TranslationKeys.ROOM_ROLE]: 'Роль',
    [TranslationKeys.ROOM_SPYMASTER]: 'Капитан',
    [TranslationKeys.ROOM_AGENT]: 'Агент',
    [TranslationKeys.ROOM_SPYMASTER_BTN]: 'Играть за Капитана',
    [TranslationKeys.ROOM_AGENT_BTN]: 'Играть за Агента',
    [TranslationKeys.ROOM_LEAVE_TEAM_BTN]: 'Покинуть команду',
    [TranslationKeys.ROOM_PLAYERS_CHOOSING]: 'Игроки выбирающие команду',
    [TranslationKeys.ROOM_TIMER_MESSAGE]: 'Игра начнется через',
    [TranslationKeys.ROOM_COPY_MESSAGE]: 'ID скопирован!',
  },
};

export default roomPageLanguage;
