import type {
  Card,
  CardColor,
  GameEndInfo,
  GameInfo,
  GameStateForClient,
  Score,
} from './types/game.ts';
import type { ProfileInfo } from './types/profile.ts';
import type { CheckQuestion } from './types/question.ts';
import type { Player, RoomInfo, RoomPreview, RoomSettings, Teams } from './types/room.ts';

export enum ClientEventType {
  // Session events
  SESSION_ASK_STATUS = 'session:ask-status',
  SESSION_LOGOUT = 'session:logout',

  // Room events
  ROOM_CREATE = 'room:create',
  ROOM_ASK_LIST = 'room:ask-list',
  ROOM_SEARCH = 'room:search',
  ROOM_JOIN = 'room:join',
  ROOM_LEAVE = 'room:leave',
  ROOM_ASK_ROOM_INFO = 'room:ask-room-info',

  SESSION_PLAYER_EXIT = 'session:player-exit',
  // Team events
  TEAM_CHANGE = 'team:change',

  // Game events
  GAME_ADD_PLAYER = 'game:add-player',
  GAME_CLUE_GIVE = 'game:clue-give',
  GAME_CARD_CHOOSE = 'game:card-choose',
  GAME_ANSWER_GIVE = 'game:answer-give',
  GAME_CHECK_GIVE = 'game:check-give',
  GAME_ASK_GAME_STATE = 'game:ask-game-state',

  // Profile events
  PROFILE_ENTER = 'profile:enter',
  PROFILE_LEAVE = 'profile:leave',
  PROFILE_ASK_INFO = 'profile:ask-info',
}

export enum ServerEventType {
  // Session events
  SESSION_TOKEN = 'session:token',
  SESSION_CONNECT = 'session:connect',
  SESSION_PLAYER_CONNECTED = 'session:player-connected',
  SESSION_PLAYER_DISCONNECTED = 'session:player-disconnected',
  SESSION_PLAYER_EXIT = 'session:player-exit',
  SESSION_SEND_STATUS = 'session:send-status',

  // Room events
  ROOM_SEND_LIST = 'room:send-list',
  ROOM_CREATED = 'room:created',
  ROOM_STATE = 'room:state',
  ROOM_UPDATE_PREVIEW = 'room:update-review',
  ROOM_PLAYER_JOINED = 'room:player-joined',
  ROOM_PLAYER_LEFT = 'room:player-left',

  // Team events
  TEAM_CHANGED = 'team:changed',

  // Game events
  GAME_START_TIMER = 'game:start-timer',
  GAME_START = 'game:start',
  GAME_ASK_CLUE = 'game:ask-clue',
  GAME_CLUE_TIMEOUT = 'game:clue-timeout',
  GAME_TURN_CHANGED = 'game:turn-changed',
  GAME_CLUE_GIVEN = 'game:clue-given',
  GAME_CARD_CHOSEN = 'game:card-chosen',
  GAME_CARD_SHOWN = 'game:card-shown',
  GAME_ASK_ANSWER = 'game:ask-answer',
  GAME_ANSWER_TIMEOUT = 'game:answer-timeout',
  GAME_ASK_CHECK = 'game:ask-check',
  GAME_CHECK_RESULTS = 'game:check-results',
  GAME_CHECK_TIMEOUT = 'game:check-timeout',
  GAME_SEND_SCORE = 'game:send-score',
  GAME_GAME_END = 'game:game-end',
  GAME_STATE = 'game:state',

  // Profile events
  PROFILE_ENTERED = 'profile:entered',
  PROFILE_LEFT = 'profile:left',

  // Connection errors
  ERROR = 'error',
  CONNECT_ERROR = 'connect_error',
  CONNECT = 'connect',
}

export enum SocketErrorCode {
  PLAYER_NOT_FOUND = 'PLAYER_NOT_FOUND',
  ROOM_NOT_FOUND = 'ROOM_NOT_FOUND',
  GAME_NOT_FOUND = 'GAME_NOT_FOUND',
  ROOM_FULL = 'ROOM_FULL',
  THERE_IS_ALREADY_SPYMASTER = 'THERE_IS_ALREADY_SPYMASTER',
  THERE_ARE_ALREADY_AGENTS = 'THERE_ARE_ALREADY_AGENTS',
  INVALID_ACTION = 'INVALID_ACTION',
  AUTH_REQUIRED = 'AUTH_REQUIRED',
  ALREADY_ONLINE = 'ALREADY_ONLINE',
  GAME_IS_NOT_FULL = 'GAME_IS_NOT_FULL',
  ACTION_IS_PROHIBITED = 'ACTION_IS_PROHIBITED',
}

export enum UserStatusType {
  IN_LOBBY = 'IN_LOBBY',
  IN_ROOM = 'IN_ROOM',
  IN_GAME = 'IN_GAME',
  IN_PROFILE = 'IN_PROFILE',
}

export type UserStatus = 'IN_LOBBY' | 'IN_ROOM' | 'IN_GAME' | 'IN_PROFILE';

export type GAME_PHASE = 'clue' | 'guess' | 'answer' | 'check' | 'finish';

export type CardTestResult =
  | {
      type: 'own';
      payload: {
        userId: string;
        question: string;
        question_en: string;
        card: Card;
        score: Score;
        playerIds: string[];
      };
    }
  | {
      type: 'alien';
      payload: {
        spymasterId: string;
        team: Teams;
        cardId: string;
        color: CardColor;
        recipients: string[];
      };
    }
  | {
      type: 'bomb';
      payload: {
        cardId: string;
        color: CardColor;
        gameEndInfo: GameEndInfo;
        winPlayerIds: string[];
      };
    }
  | { type: 'no-change'; payload: { spymasterId: string; team: Teams; playerIds: string[] } };

export type CheckResults =
  | {
      type: 'turn-end';
      payload: { correct: boolean; team: Teams };
    }
  | { type: 'game-end'; payload: { gameEndInfo: GameEndInfo; winPlayerIds: string[] } };

export const RECONNECT_MAX_TIME = 60_000;
export const SECOND_COUNT_BEFORE_START_GAME = 15;
export const SECOND_COUNT_FOR_ASK_CLUE = 30;
export const SECOND_COUNT_FOR_GUESS = 60;
export const SECOND_COUNT_FOR_ANSWER = 60;
export const SECOND_COUNT_FOR_CHECK = 60;
export const TIMER_INTERVAL = 1000;

export type ClientEvent =
  | { type: 'session:ask-status' }
  | { type: 'session:logout' }
  | { type: 'room:create'; payload: { settings: RoomSettings } }
  | { type: 'room:ask-list' }
  | { type: 'room:search'; payload: { name: string | undefined } }
  | { type: 'room:join'; payload: { roomId: string } }
  | { type: 'room:leave' }
  | { type: 'room:ask-room-info' }
  | { type: 'team:change'; payload: { player: Player } }
  | { type: 'game:add-player' }
  | { type: 'game:clue-give'; payload: { clue: string } }
  | { type: 'game:card-choose'; payload: { cardId: string } }
  | { type: 'game:answer-give'; payload: { answer: string } }
  | { type: 'game:check-give'; payload: { accept: boolean } }
  | { type: 'game:ask-game-state' }
  | { type: 'profile:enter' }
  | { type: 'profile:leave' }
  | { type: 'profile:ask-info' };

export type ServerEvent =
  | { type: 'session:token'; payload: { sessionToken: string } }
  | {
      type: 'session:connect';
      payload: { userStatus: UserStatus; userId: string; username: string };
    }
  | { type: 'session:player-connected'; payload: { player: Player } }
  | { type: 'session:player-disconnected'; payload: { player: Player } }
  | { type: 'session:player-exit'; payload: { player: Player } }
  | {
      type: 'session:send-status';
      payload: { userStatus: UserStatus; userId: string; username: string };
    }
  | { type: 'room:send-list'; payload: { roomPreviews: RoomPreview[] } }
  | { type: 'room:created'; payload: { roomPreview: RoomPreview } }
  | { type: 'room:state'; payload: { roomInfo: RoomInfo } }
  | { type: 'room:update-review'; payload: { roomPreview: RoomPreview } }
  | { type: 'room:player-joined'; payload: { roomInfo: RoomInfo } }
  | { type: 'room:player-left'; payload: { roomInfo: RoomInfo } }
  | { type: 'team:changed'; payload: { roomInfo: RoomInfo } }
  | { type: 'game:start-timer' }
  | { type: 'game:start'; payload: { gameInfo: GameInfo } }
  | { type: 'game:ask-clue' }
  | { type: 'game:clue-timeout' }
  | { type: 'game:turn-changed'; payload: { team: Teams } }
  | { type: 'game:clue-given'; payload: { clue: string } }
  | { type: 'game:card-chosen'; payload: { cardId: string; players: Player[] } }
  | { type: 'game:card-shown'; payload: { cardId: string; color: CardColor } }
  | {
      type: 'game:ask-answer';
      payload: { word: string; question: string; question_en: string; answer: boolean };
    }
  | { type: 'game:answer-timeout' }
  | {
      type: 'game:ask-check';
      payload: { answer: string; checkQuestion: CheckQuestion; check: boolean };
    }
  | { type: 'game:check-results'; payload: { correct: boolean } }
  | { type: 'game:check-timeout' }
  | { type: 'game:send-score'; payload: { score: Score } }
  | { type: 'game:game-end'; payload: { gameEndInfo: GameEndInfo } }
  | { type: 'game:state'; payload: { gameState: GameStateForClient } }
  | { type: 'profile:entered'; payload: { profileInfo: ProfileInfo } }
  | { type: 'profile:left'; payload: { roomPreviews: RoomPreview[] } }
  | { type: 'error'; payload: { code: ErrorCode } };

export type ErrorCode =
  | 'PLAYER_NOT_FOUND'
  | 'ROOM_NOT_FOUND'
  | 'GAME_NOT_FOUND'
  | 'ROOM_FULL'
  | 'THERE_IS_ALREADY_SPYMASTER'
  | 'THERE_ARE_ALREADY_AGENTS'
  | 'INVALID_ACTION'
  | 'AUTH_REQUIRED'
  | 'ALREADY_ONLINE'
  | 'GAME_IS_NOT_FULL'
  | 'ACTION_IS_PROHIBITED';

type EventName<T> = T extends { type: infer K } ? K : never;

type EventPayload<T> = T extends { payload: infer P }
  ? P extends undefined
    ? () => void
    : (data: P) => void
  : () => void;

type DiscriminatedUnionToSocketEvents<T extends { type: string }> = {
  [K in EventName<T>]: EventPayload<Extract<T, { type: K }>>;
};

export type ServerToClientEvents = DiscriminatedUnionToSocketEvents<ServerEvent>;

export type ClientToServerEvents = DiscriminatedUnionToSocketEvents<ClientEvent>;
