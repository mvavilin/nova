import { LogMessageType } from '@repo/shared/src/types/logMessage';

const isRedTeam = (team: LogMessageType): boolean => team === LogMessageType.RED;

export const LOG_MESSAGES = {
  START_GAME: () => 'Игра началась!',

  HINT: (team: LogMessageType) =>
    `Капитан ${isRedTeam(team) ? 'красной' : 'синей'} команды дает подсказку: `,

  VOTE_STARTED: () => 'Голосование выбора карточки запущено',

  VOTE_ENDED: () => 'Голосование выбора карточки завершено',

  OWN_CARD_CHOSEN: (team: LogMessageType) =>
    `Оперативники ${isRedTeam(team) ? 'красной' : 'синей'} команды выбрали свою карточку: `,

  OTHER_CARD_CHOSEN: (team: LogMessageType) =>
    `Оперативники ${isRedTeam(team) ? 'красной' : 'синей'} команды выбрали чужую карточку: `,

  CHECKING_ANSWER: (team: LogMessageType) =>
    `${isRedTeam(team) ? 'Красная' : 'Синяя'} команда проверяет ответ`,

  ANSWER_COUNTED: (team: LogMessageType) =>
    `${isRedTeam(team) ? 'Красная' : 'Синяя'} команда засчитывает ответ`,

  SCORE_POINT: () => 'Команда получает 1 балл',
} as const;
