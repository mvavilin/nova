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

    [TranslationKeys.LOG_HINT_RED]: 'Red team spymaster gives a hint',
    [TranslationKeys.LOG_HINT_BLUE]: 'Blue team spymaster gives a hint',
    [TranslationKeys.LOG_HINT_TIMEOUT]: 'Hint time expired!',
    [TranslationKeys.LOG_HINT_PHASE_STARTED]: 'Hint phase started',
    [TranslationKeys.LOG_HINT_PHASE_ENDED]: 'Hint phase ended',
    [TranslationKeys.LOG_HINT_REQUEST]: 'Enter a hint',
    [TranslationKeys.LOG_HINT_GIVEN]: 'Hint: ',

    [TranslationKeys.LOG_VOTE_STARTED]: 'Card selection voting started',
    [TranslationKeys.LOG_VOTE_ENDED]: 'Card selection voting ended',
    [TranslationKeys.LOG_VOTE_CHANGED]: 'Player select card',

    [TranslationKeys.LOG_OWN_CARD_CHOSEN_RED]: 'Red team agents chose their card: ',
    [TranslationKeys.LOG_OWN_CARD_CHOSEN_BLUE]: 'Blue team agents chose their card: ',
    [TranslationKeys.LOG_OTHER_CARD_CHOSEN_RED]: 'Red team agents chose an enemy card: ',
    [TranslationKeys.LOG_OTHER_CARD_CHOSEN_BLUE]: 'Blue team agents chose an enemy card: ',
    [TranslationKeys.LOG_OWN_CARD_CHOSEN_RED_NEITRAL]: 'Red team agents chose a neitral card: ',
    [TranslationKeys.LOG_OWN_CARD_CHOSEN_BLUE_NEITRAL]: 'Blue team agents chose a neitral card: ',

    [TranslationKeys.LOG_CARD_REVEALED_RED]: 'Red card revealed!',
    [TranslationKeys.LOG_CARD_REVEALED_BLUE]: 'Blue card revealed!',
    [TranslationKeys.LOG_CARD_REVEALED_NEUTRAL]:
      'Neutral card revealed! Turn passes to the other team',
    [TranslationKeys.LOG_CARD_REVEALED_BOMB]: 'BOMB! Game over!',

    [TranslationKeys.LOG_CHECKING_ANSWER_RED]: 'Red team is checking the answer',
    [TranslationKeys.LOG_CHECKING_ANSWER_BLUE]: 'Blue team is checking the answer',
    [TranslationKeys.LOG_ANSWER_COUNTED_RED]: 'Red team accepts the answer',
    [TranslationKeys.LOG_ANSWER_COUNTED_BLUE]: 'Blue team accepts the answer',
    [TranslationKeys.LOG_SCORE_POINT]: 'Team scores 1 point',

    [TranslationKeys.LOG_ANSWER_TIMEOUT]: 'Answer time expired! Turn passes to the other team',
    [TranslationKeys.LOG_CHECK_TIMEOUT]: 'Check time expired! Answer accepted',

    [TranslationKeys.LOG_TURN_CHANGED_RED]: 'Turn passes to the red team',
    [TranslationKeys.LOG_TURN_CHANGED_BLUE]: 'Turn passes to the blue team',

    [TranslationKeys.LOG_GAME_END_RED_WIN]: 'Red team wins!',
    [TranslationKeys.LOG_GAME_END_BLUE_WIN]: 'Blue team wins!',
  },
  [Language.RU]: {
    [TranslationKeys.GAME_TITLE]: 'Игра',
    [TranslationKeys.RED_TURN]: 'Ход красной команды',
    [TranslationKeys.BLUE_TURN]: 'Ход синей команды',
    [TranslationKeys.CHOOSING_TURN]: 'Выбор хода',
    [TranslationKeys.RED_TEAM]: 'Красная команда',
    [TranslationKeys.BLUE_TEAM]: 'Синяя команда',
    [TranslationKeys.CHAT_LOG_TITLE]: 'Лог чат',
    [TranslationKeys.CHAT_INPUT_PLACEHOLDER]: 'Введите подсказку',

    [TranslationKeys.LOG_START_GAME]: 'Игра началась!',

    [TranslationKeys.LOG_HINT_RED]: 'Капитан красной команды дает подсказку',
    [TranslationKeys.LOG_HINT_BLUE]: 'Капитан синей команды дает подсказку',
    [TranslationKeys.LOG_HINT_TIMEOUT]: 'Время подсказки истекло!',
    [TranslationKeys.LOG_HINT_PHASE_STARTED]: 'Старт фазы подсказки',
    [TranslationKeys.LOG_HINT_PHASE_ENDED]: 'Завершение фазы подсказки',
    [TranslationKeys.LOG_HINT_REQUEST]: 'Введите подсказку',
    [TranslationKeys.LOG_HINT_GIVEN]: 'Подсказка: ',

    [TranslationKeys.LOG_VOTE_STARTED]: 'Голосование выбора карточки запущено',
    [TranslationKeys.LOG_VOTE_ENDED]: 'Голосование выбора карточки завершено',
    [TranslationKeys.LOG_VOTE_CHANGED]: 'Игрок выбрал карточку',

    [TranslationKeys.LOG_OWN_CARD_CHOSEN_RED]:
      'Оперативники красной команды выбрали свою карточку: ',
    [TranslationKeys.LOG_OWN_CARD_CHOSEN_BLUE]:
      'Оперативники синей команды выбрали свою карточку: ',
    [TranslationKeys.LOG_OTHER_CARD_CHOSEN_RED]:
      'Оперативники красной команды выбрали чужую карточку: ',
    [TranslationKeys.LOG_OTHER_CARD_CHOSEN_BLUE]:
      'Оперативники синей команды выбрали чужую карточку: ',
    [TranslationKeys.LOG_OWN_CARD_CHOSEN_RED_NEITRAL]:
      'Оперативники красной команды выбрали нейтральную карточку: ',
    [TranslationKeys.LOG_OWN_CARD_CHOSEN_BLUE_NEITRAL]:
      'Оперативники синей команды выбрали нейтральную карточку: ',

    [TranslationKeys.LOG_CARD_REVEALED_RED]: 'Открыта красная карта!',
    [TranslationKeys.LOG_CARD_REVEALED_BLUE]: 'Открыта синяя карта!',
    [TranslationKeys.LOG_CARD_REVEALED_NEUTRAL]: 'Открыта нейтральная карта!',
    [TranslationKeys.LOG_CARD_REVEALED_BOMB]: 'БОМБА! Игра окончена!',

    [TranslationKeys.LOG_CHECKING_ANSWER_RED]: 'Красная команда проверяет ответ',
    [TranslationKeys.LOG_CHECKING_ANSWER_BLUE]: 'Синяя команда проверяет ответ',
    [TranslationKeys.LOG_ANSWER_COUNTED_RED]: 'Красная команда засчитывает ответ',
    [TranslationKeys.LOG_ANSWER_COUNTED_BLUE]: 'Синяя команда засчитывает ответ',
    [TranslationKeys.LOG_SCORE_POINT]: 'Команда получает 1 балл',

    [TranslationKeys.LOG_ANSWER_TIMEOUT]: 'Время ответа истекло! Ход переходит к другой команде',
    [TranslationKeys.LOG_CHECK_TIMEOUT]: 'Время проверки истекло! Ответ засчитан',

    [TranslationKeys.LOG_TURN_CHANGED_RED]: 'Ход переходит к красной команде',
    [TranslationKeys.LOG_TURN_CHANGED_BLUE]: 'Ход переходит к синей команде',

    [TranslationKeys.LOG_GAME_END_RED_WIN]: 'Победила красная команда!',
    [TranslationKeys.LOG_GAME_END_BLUE_WIN]: 'Победила синяя команда!',
  },
} as const;

export default gamePage;
