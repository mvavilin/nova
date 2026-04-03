import { Language } from '@types';
import { TranslationKeys } from '@i18n/translationKeys';

const gamePage = {
  [Language.EN]: {
    [TranslationKeys.GAME_TITLE]: 'Game',

    [TranslationKeys.RED_TURN]: 'Red team turn',
    [TranslationKeys.BLUE_TURN]: 'Blue team turn',
    [TranslationKeys.CHOOSING_TURN]: 'Choosing turn',

    [TranslationKeys.RED_TEAM]: 'Red Team',
    [TranslationKeys.BLUE_TEAM]: 'Blue Team',

    [TranslationKeys.CHAT_LOG_TITLE]: 'Chat Log',
    [TranslationKeys.CHAT_INPUT_PLACEHOLDER]: 'Enter a hint',

    [TranslationKeys.LOG_START_GAME]: 'Game started!',
    [TranslationKeys.LOG_HINT_RED]: 'Captain of the red team gives a hint.',
    [TranslationKeys.LOG_HINT_BLUE]: 'Captain of the blue team gives a hint.',
    [TranslationKeys.LOG_VOTE_STARTED]: 'Card selection voting started',
    [TranslationKeys.LOG_VOTE_ENDED]: 'Card selection voting ended',
    [TranslationKeys.LOG_OWN_CARD_CHOSEN_RED]: 'Red team operatives chose their own card: ',
    [TranslationKeys.LOG_OWN_CARD_CHOSEN_BLUE]: 'Blue team operatives chose their own card: ',
    [TranslationKeys.LOG_OTHER_CARD_CHOSEN_RED]: `Red team operatives chose another team's card: `,
    [TranslationKeys.LOG_OTHER_CARD_CHOSEN_BLUE]: `Blue team operatives chose another team's card: `,
    [TranslationKeys.LOG_CHECKING_ANSWER_RED]: 'Red team is checking the answer',
    [TranslationKeys.LOG_CHECKING_ANSWER_BLUE]: 'Blue team is checking the answer',
    [TranslationKeys.LOG_ANSWER_COUNTED_RED]: 'Red team counts the answer',
    [TranslationKeys.LOG_ANSWER_COUNTED_BLUE]: 'Blue team counts the answer',
    [TranslationKeys.LOG_SCORE_POINT]: 'Team gets 1 point',
    [TranslationKeys.LOG_HINT_PHASE_STARTED]: 'Hint phase started',
  },
  [Language.RU]: {
    [TranslationKeys.GAME_TITLE]: 'Игра',

    [TranslationKeys.RED_TURN]: 'Ход красной команды',
    [TranslationKeys.BLUE_TURN]: 'Ход синей команды',
    [TranslationKeys.CHOOSING_TURN]: 'Выбор хода',

    [TranslationKeys.RED_TEAM]: 'Красная команда',
    [TranslationKeys.BLUE_TEAM]: 'Синяя команда',

    [TranslationKeys.CHAT_LOG_TITLE]: 'Лог чата',
    [TranslationKeys.CHAT_INPUT_PLACEHOLDER]: 'Введите подсказку',

    [TranslationKeys.LOG_START_GAME]: 'Игра началась!',
    [TranslationKeys.LOG_HINT_RED]: 'Капитан красной команды дает подсказку.',
    [TranslationKeys.LOG_HINT_BLUE]: 'Капитан синей команды дает подсказку.',
    [TranslationKeys.LOG_VOTE_STARTED]: 'Голосование выбора карточки запущено',
    [TranslationKeys.LOG_VOTE_ENDED]: 'Голосование выбора карточки завершено',
    [TranslationKeys.LOG_OWN_CARD_CHOSEN_RED]:
      'Оперативники красной команды выбрали свою карточку: ',
    [TranslationKeys.LOG_OWN_CARD_CHOSEN_BLUE]:
      'Оперативники синей команды выбрали свою карточку: ',
    [TranslationKeys.LOG_OTHER_CARD_CHOSEN_RED]:
      'Оперативники красной команды выбрали чужую карточку: ',
    [TranslationKeys.LOG_OTHER_CARD_CHOSEN_BLUE]:
      'Оперативники синей команды выбрали чужую карточку: ',
    [TranslationKeys.LOG_CHECKING_ANSWER_RED]: 'Красная команда проверяет ответ',
    [TranslationKeys.LOG_CHECKING_ANSWER_BLUE]: 'Синяя команда проверяет ответ',
    [TranslationKeys.LOG_ANSWER_COUNTED_RED]: 'Красная команда засчитывает ответ',
    [TranslationKeys.LOG_ANSWER_COUNTED_BLUE]: 'Синяя команда засчитывает ответ',
    [TranslationKeys.LOG_SCORE_POINT]: 'Команда получает 1 балл',
    [TranslationKeys.LOG_HINT_PHASE_STARTED]: 'Старт фазы подсказки',
  },
} as const;

export default gamePage;
