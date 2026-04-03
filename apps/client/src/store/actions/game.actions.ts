import type { CardColor } from '@repo/shared/src/types/game';
import type { Player, Teams } from '@repo/shared/src/types/room';

export enum GameActionTypes {
  GAME_CLUE_GIVE = 'GAME/CLUE_GIVE',
  GAME_CARD_CHOOSE = 'GAME/CARD_CHOOSE',

  GAME_ASK_CLUE = 'GAME/ASK_CLUE',
  GAME_CLUE_TIMEOUT = 'GAME/CLUE_TIMEOUT',
  GAME_TURN_CHANGED = 'GAME/TURN_CHANGED',
  GAME_CLUE_GIVEN = 'GAME/CLUE_GIVEN',
  GAME_CARD_CHOSEN = 'GAME/CARD_CHOSEN',
  GAME_CARD_SHOWN = 'GAME/CARD_SHOWN',
}

type GameClueGive = {
  type: GameActionTypes.GAME_CLUE_GIVE;
  payload: { clue: string };
};

type GameCardChoose = {
  type: GameActionTypes.GAME_CARD_CHOOSE;
  payload: { cardId: string };
};

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

export type GameActions =
  | GameClueGive
  | GameCardChoose
  | GameAskClue
  | GameClueTimeout
  | GameTurnChanged
  | GameClueGiven
  | GameCardChosen
  | GameCardShown;
