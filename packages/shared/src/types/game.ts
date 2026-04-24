import type { Player, Teams } from './room.ts';

export enum CardColorEnum {
  red = 'bg-red-400',
  blue = 'bg-blue-400',
  neutral = 'bg-orange-300',
  bomb = 'bg-slate-400',
  unknown = 'bg-green-600 hover:bg-green-700',
  selected = 'bg-green-400 hover:bg-green-500',
}

export type CardColor = 'red' | 'blue' | 'neutral' | 'bomb' | 'unknown';
export type CardStatus = 'hidden' | 'revealed';
export type GAME_PHASE = 'clue' | 'guess' | 'answer' | 'check' | 'finish';

export enum CardCounts {
  RED = 9,
  BLUE = 8,
  NEUTRAL = 7,
  BOMB = 1,
  ALL = RED + BLUE + NEUTRAL + BOMB,
}

export interface Card {
  id: string;
  word: string;
  color: CardColor;
  whoSees: Set<Teams>;
  isRevealed: boolean;
}

export interface GameInfo {
  id: string;
  redTeam: Player[];
  blueTeam: Player[];
  currentTeam: Teams;
  cards: Card[];
}

export interface PlayerScore {
  id: string;
  username: string;
  score: number;
  attempts: number;
}

export type Score = {
  red: number;
  blue: number;
};

export interface GameEndInfo {
  winningTeam: Teams;
  win: boolean;
  bombRevealed: boolean;
  score: Score;
  time: number;
  redPlayerScores: PlayerScore[];
  bluePlayerScores: PlayerScore[];
}

export interface ChosenCard {
  cardId: string;
  players: Player[];
}

export interface GuessPhaseInfo {
  chosenCards: ChosenCard[];
}

export interface AnswerPhaseInfo {
  word: string;
  question: string;
  question_en: string;
}

export interface CheckPhaseInfo {
  word: string;
  question: string;
  question_en: string;
  referenceAnswer: string;
  referenceAnswer_en: string;
}

export interface FinishPhaseInfo {
  gameEndInfo: GameEndInfo;
}

export interface GamePhaseInfo {
  guessPhaseInfo: GuessPhaseInfo | null;
  answerPhaseInfo: AnswerPhaseInfo | null;
  checkPhaseInfo: CheckPhaseInfo | null;
  finishPhaseInfo: FinishPhaseInfo | null;
}

export type GameStateForClient = {
  id: string;
  cards: Card[];
  currentTeam: Teams;
  isSpymaster: boolean;
  myTeam: Teams | null;
  redTeam: Player[];
  blueTeam: Player[];
  gamePhase: GAME_PHASE;
  gameTime: number;
  phaseTime: number;
  score: Score;
  gamePhaseInfo: GamePhaseInfo;
};
