import { Language } from '@types';
import { TranslationKeys } from '@i18n/translationKeys';

const gameResultsModal = {
  [Language.EN]: {
    [TranslationKeys.GAME_RESULTS_TITLE]: 'Game finished!',
    [TranslationKeys.WINNING_TEAM_PREFIX]: 'Team ',
    [TranslationKeys.WINNING_TEAM_SUFFIX]: ' won!',

    [TranslationKeys.TEAM_RED]: 'red',
    [TranslationKeys.TEAM_BLUE]: 'blue',

    [TranslationKeys.GAME_STATS_TITLE]: 'Game statistics ',

    [TranslationKeys.SCORE_LABEL]: 'Score',
    [TranslationKeys.TIME_LABEL]: 'Time',

    [TranslationKeys.PLAYER_COLUMN]: 'Player',
    [TranslationKeys.ROLE_COLUMN]: 'Role',
    [TranslationKeys.QUESTIONS_COLUMN]: 'Questions',
    [TranslationKeys.CORRECT_ANSWERS_COLUMN]: 'Correct answers',

    [TranslationKeys.RED_TEAM_TITLE]: 'Red team',
    [TranslationKeys.BLUE_TEAM_TITLE]: 'Blue team',

    [TranslationKeys.LOBBY_BUTTON]: 'To lobby',
    [TranslationKeys.ROOM_BUTTON]: 'To room',
  },

  [Language.RU]: {
    [TranslationKeys.GAME_RESULTS_TITLE]: 'Игра завершена!',
    [TranslationKeys.WINNING_TEAM_PREFIX]: 'Команда ',
    [TranslationKeys.WINNING_TEAM_SUFFIX]: ' выиграла!',

    [TranslationKeys.TEAM_RED]: 'красных',
    [TranslationKeys.TEAM_BLUE]: 'синих',

    [TranslationKeys.GAME_STATS_TITLE]: 'Статистика игры ',

    [TranslationKeys.SCORE_LABEL]: 'Набрано очков',
    [TranslationKeys.TIME_LABEL]: 'Время',

    [TranslationKeys.PLAYER_COLUMN]: 'Игрок',
    [TranslationKeys.ROLE_COLUMN]: 'Роль',
    [TranslationKeys.QUESTIONS_COLUMN]: 'Вопросов',
    [TranslationKeys.CORRECT_ANSWERS_COLUMN]: 'Зачтено ответов',

    [TranslationKeys.RED_TEAM_TITLE]: 'Команда красных',
    [TranslationKeys.BLUE_TEAM_TITLE]: 'Команда синих',

    [TranslationKeys.LOBBY_BUTTON]: 'В лобби',
    [TranslationKeys.ROOM_BUTTON]: 'В комнату',
  },
};

export default gameResultsModal;
