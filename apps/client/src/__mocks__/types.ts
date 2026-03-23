import { CardColor, CardStatus, type Player } from '@__mocks__';

export type Card = {
  id: string;
  word: string;
  color: CardColor;
  status: CardStatus;
  position: number;
  selected: boolean;
};

export type GameResultData = {
  player: Player;
  questionCount: number;
  correctAnswersCount: number;
};
