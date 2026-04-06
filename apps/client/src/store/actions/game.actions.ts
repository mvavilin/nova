import type {
  CardColor,
  Score,
  GameStateForClient,
  GameEndInfo,
  GameInfo,
} from '@repo/shared/src/types/game';
import type { Player, Teams } from '@repo/shared/src/types/room';
import type { CheckQuestion } from '@repo/shared/src/types/question';

export enum GameActionTypes {
  // Клиент → Сервер (запросы)
  GAME_CLUE_GIVE = 'GAME/CLUE_GIVE',
  GAME_CARD_CHOOSE = 'GAME/CARD_CHOOSE',
  GAME_ANSWER_GIVE = 'GAME/ANSWER_GIVE',
  GAME_CHECK_GIVE = 'GAME/CHECK_GIVE',
  GAME_ADD_PLAYER = 'GAME/ADD_PLAYER',
  GAME_ASK_GAME_STATE = 'GAME/ASK_GAME_STATE',

  // Сервер → Клиент (события)
  GAME_ASK_CLUE = 'GAME/ASK_CLUE',
  GAME_CLUE_TIMEOUT = 'GAME/CLUE_TIMEOUT',
  GAME_TURN_CHANGED = 'GAME/TURN_CHANGED',
  GAME_CLUE_GIVEN = 'GAME/CLUE_GIVEN',
  GAME_CARD_CHOSEN = 'GAME/CARD_CHOSEN',
  GAME_CARD_SHOWN = 'GAME/CARD_SHOWN',
  GAME_ASK_ANSWER = 'GAME/ASK_ANSWER',
  GAME_ANSWER_TIMEOUT = 'GAME/ANSWER_TIMEOUT',
  GAME_ASK_CHECK = 'GAME/ASK_CHECK',
  GAME_CHECK_RESULTS = 'GAME/CHECK_RESULTS',
  GAME_CHECK_TIMEOUT = 'GAME/CHECK_TIMEOUT',
  GAME_SEND_SCORE = 'GAME/SEND_SCORE',
  GAME_GAME_END = 'GAME/GAME_END',
  GAME_STATE = 'GAME/STATE',
  GAME_START_TIMER = 'GAME/START_TIMER',
  GAME_START = 'GAME/START',
}

// Клиент → Сервер
type GameClueGive = {
  type: GameActionTypes.GAME_CLUE_GIVE;
  payload: { clue: string };
};

type GameCardChoose = {
  type: GameActionTypes.GAME_CARD_CHOOSE;
  payload: { cardId: string };
};

type GameAnswerGive = {
  type: GameActionTypes.GAME_ANSWER_GIVE;
  payload: { answer: string };
};

type GameCheckGive = {
  type: GameActionTypes.GAME_CHECK_GIVE;
  payload: { accept: boolean };
};

type GameAddPlayer = {
  type: GameActionTypes.GAME_ADD_PLAYER;
};

type GameAskGameState = {
  type: GameActionTypes.GAME_ASK_GAME_STATE;
};

// Сервер → Клиент
type GameAskClue = {
  type: GameActionTypes.GAME_ASK_CLUE;
};

type GameClueTimeout = {
  type: GameActionTypes.GAME_CLUE_TIMEOUT;
};

type GameTurnChanged = {
  type: GameActionTypes.GAME_TURN_CHANGED;
  payload: { team: Teams };
};

type GameClueGiven = {
  type: GameActionTypes.GAME_CLUE_GIVEN;
  payload: { clue: string };
};

type GameCardChosen = {
  type: GameActionTypes.GAME_CARD_CHOSEN;
  payload: { cardId: string; players: Player[] };
};

type GameCardShown = {
  type: GameActionTypes.GAME_CARD_SHOWN;
  payload: { cardId: string; color: CardColor };
};

type GameAskAnswer = {
  type: GameActionTypes.GAME_ASK_ANSWER;
  payload: { word: string; question: string; question_en: string; answer: boolean };
};

type GameAnswerTimeout = {
  type: GameActionTypes.GAME_ANSWER_TIMEOUT;
};

type GameAskCheck = {
  type: GameActionTypes.GAME_ASK_CHECK;
  payload: { answer: string; checkQuestion: CheckQuestion; check: boolean };
};

type GameCheckResults = {
  type: GameActionTypes.GAME_CHECK_RESULTS;
  payload: { correct: boolean };
};

type GameCheckTimeout = {
  type: GameActionTypes.GAME_CHECK_TIMEOUT;
};

type GameSendScore = {
  type: GameActionTypes.GAME_SEND_SCORE;
  payload: { score: Score };
};

type GameGameEnd = {
  type: GameActionTypes.GAME_GAME_END;
  payload: { gameEndInfo: GameEndInfo };
};

type GameState = {
  type: GameActionTypes.GAME_STATE;
  payload: { gameState: GameStateForClient };
};

type GameStartTimer = {
  type: GameActionTypes.GAME_START_TIMER;
};

type GameStart = {
  type: GameActionTypes.GAME_START;
  payload: { gameInfo: GameInfo };
};

export type GameActions =
  | GameClueGive
  | GameCardChoose
  | GameAnswerGive
  | GameCheckGive
  | GameAddPlayer
  | GameAskGameState
  | GameAskClue
  | GameClueTimeout
  | GameTurnChanged
  | GameClueGiven
  | GameCardChosen
  | GameCardShown
  | GameAskAnswer
  | GameAnswerTimeout
  | GameAskCheck
  | GameCheckResults
  | GameCheckTimeout
  | GameSendScore
  | GameGameEnd
  | GameState
  | GameStartTimer
  | GameStart;
