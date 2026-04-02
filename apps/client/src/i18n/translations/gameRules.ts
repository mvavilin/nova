import { Language } from '@/types';
import { TranslationKeys } from '../translationKeys';

const gameRules = {
  [Language.EN]: {
    [TranslationKeys.GAME_RULES_TITLE]: 'Nova Codenames Game Rules',

    [TranslationKeys.GAME_RULES_PREPARATION_TITLE]: 'Preparation:',
    [TranslationKeys.GAME_RULES_PREPARATION_P1]:
      'The game is played by 4 players divided into two teams — red and blue.',
    [TranslationKeys.GAME_RULES_PREPARATION_P2]:
      'Each team has a Spymaster (gives clues) and a Field Agent (guesses words).',
    [TranslationKeys.GAME_RULES_PREPARATION_P3]:
      '25 cards (5×5) with JavaScript / TypeScript / Frontend concepts are placed on the board.',

    [TranslationKeys.GAME_RULES_CARD_TYPES_TITLE]: 'Card types:',
    [TranslationKeys.GAME_RULES_CARD_TYPES_RED]: '9 — red team agents',
    [TranslationKeys.GAME_RULES_CARD_TYPES_BLUE]: '9 — blue team agents',
    [TranslationKeys.GAME_RULES_CARD_TYPES_CIVIL]: '6 — civilians',
    [TranslationKeys.GAME_RULES_CARD_TYPES_KILLER]: '1 — assassin',
    [TranslationKeys.GAME_RULES_CARD_TYPES_DESC]:
      'The Spymaster sees the card colors while agents only see the words.',

    [TranslationKeys.GAME_RULES_TURN_TITLE]: 'Game turn:',
    [TranslationKeys.GAME_RULES_TURN_P1]:
      'Teams take turns. The Spymaster gives a clue consisting of one word and a number.',
    [TranslationKeys.GAME_RULES_TURN_P2]:
      'Example: Asynchrony, 3 — meaning there are 3 words related to asynchrony.',

    [TranslationKeys.GAME_RULES_AGENT_TITLE]: 'Agent actions:',
    [TranslationKeys.GAME_RULES_AGENT_P1]: 'The Field Agent selects a card based on the clue.',
    [TranslationKeys.GAME_RULES_AGENT_P2]:
      'If the card belongs to their team, a question about the word appears.',
    [TranslationKeys.GAME_RULES_AGENT_P3]:
      'If the answer is correct, the team gains 1 point and may continue guessing.',

    [TranslationKeys.GAME_RULES_CHECK_TITLE]: 'Answer validation:',
    [TranslationKeys.GAME_RULES_CHECK_P1]:
      'In player evaluation mode, players vote Right or Wrong after seeing the correct answer.',
    [TranslationKeys.GAME_RULES_CHECK_P2]: 'The point is awarded if the majority votes Right.',
    [TranslationKeys.GAME_RULES_CHECK_P3]:
      'In AI mode, the AI evaluates the meaning of the answer.',

    [TranslationKeys.GAME_RULES_MISTAKES_TITLE]: 'Mistakes:',
    [TranslationKeys.GAME_RULES_MISTAKES_P1]:
      'Choosing an opponent or civilian card ends the turn.',
    [TranslationKeys.GAME_RULES_MISTAKES_P2]:
      'Choosing the assassin card results in immediate defeat.',

    [TranslationKeys.GAME_RULES_VICTORY_TITLE]: 'Victory:',
    [TranslationKeys.GAME_RULES_VICTORY_P1]: 'A team wins when it reveals all of its cards.',
    [TranslationKeys.GAME_RULES_VICTORY_P2]:
      'If the assassin card is revealed, that team instantly loses.',
    [TranslationKeys.GAME_RULES_CLOSE_BTN]: 'got it',
  },

  [Language.RU]: {
    [TranslationKeys.GAME_RULES_TITLE]: 'Правила игры Nova Codenames',

    [TranslationKeys.GAME_RULES_PREPARATION_TITLE]: 'Подготовка:',
    [TranslationKeys.GAME_RULES_PREPARATION_P1]:
      'В игре участвуют 4 игрока, разделённые на две команды — красную и синюю.',
    [TranslationKeys.GAME_RULES_PREPARATION_P2]:
      'В каждой команде есть Spymaster (даёт подсказки) и Field Agent (угадывает слова).',
    [TranslationKeys.GAME_RULES_PREPARATION_P3]:
      'На поле размещаются 25 карточек (5×5) со словами — концепциями JavaScript / TypeScript / Frontend.',

    [TranslationKeys.GAME_RULES_CARD_TYPES_TITLE]: 'Типы карточек:',
    [TranslationKeys.GAME_RULES_CARD_TYPES_RED]: '9 — агенты красной команды',
    [TranslationKeys.GAME_RULES_CARD_TYPES_BLUE]: '9 — агенты синей команды',
    [TranslationKeys.GAME_RULES_CARD_TYPES_CIVIL]: '6 — мирные жители',
    [TranslationKeys.GAME_RULES_CARD_TYPES_KILLER]: '1 — убийца',
    [TranslationKeys.GAME_RULES_CARD_TYPES_DESC]:
      'Spymaster видит карту с цветами карточек, а агенты видят только слова.',

    [TranslationKeys.GAME_RULES_TURN_TITLE]: 'Ход игры:',
    [TranslationKeys.GAME_RULES_TURN_P1]:
      'Команды ходят по очереди. Spymaster даёт подсказку — одно слово и число.',
    [TranslationKeys.GAME_RULES_TURN_P2]:
      'Например: Asynchrony, 3 — это означает, что на поле есть 3 слова, связанные с асинхронностью.',

    [TranslationKeys.GAME_RULES_AGENT_TITLE]: 'Действия агента:',
    [TranslationKeys.GAME_RULES_AGENT_P1]: 'Полевой агент выбирает карточку согласно подсказке.',
    [TranslationKeys.GAME_RULES_AGENT_P2]:
      'Если карточка принадлежит его команде — открывается вопрос.',
    [TranslationKeys.GAME_RULES_AGENT_P3]:
      'Если ответ правильный — команда получает 1 очко и может продолжить.',

    [TranslationKeys.GAME_RULES_CHECK_TITLE]: 'Проверка ответа:',
    [TranslationKeys.GAME_RULES_CHECK_P1]: 'В режиме оценки игроками все голосуют Right или Wrong.',
    [TranslationKeys.GAME_RULES_CHECK_P2]: 'Очко засчитывается, если большинство выбрало Right.',
    [TranslationKeys.GAME_RULES_CHECK_P3]: 'В AI режиме ответ оценивает искусственный интеллект.',

    [TranslationKeys.GAME_RULES_MISTAKES_TITLE]: 'Ошибки:',
    [TranslationKeys.GAME_RULES_MISTAKES_P1]:
      'Выбор карточки другой команды или мирного жителя передаёт ход.',
    [TranslationKeys.GAME_RULES_MISTAKES_P2]: 'Выбор карточки убийцы — мгновенное поражение.',

    [TranslationKeys.GAME_RULES_VICTORY_TITLE]: 'Победа:',
    [TranslationKeys.GAME_RULES_VICTORY_P1]:
      'Команда побеждает, когда открывает все свои карточки.',
    [TranslationKeys.GAME_RULES_VICTORY_P2]:
      'Если открыта карточка убийцы — команда сразу проигрывает.',
    [TranslationKeys.GAME_RULES_CLOSE_BTN]: 'понятно',
  },
};

export default gameRules;
