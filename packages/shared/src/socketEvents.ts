import type { Player, RoomInfo, RoomPreview, RoomSettings } from './types/room.ts';

export enum ServerEventType {
  SESSION_TOKEN = 'session:token',
  ROOM_SEND_LIST = 'room:send-list',
  ROOM_CREATED = 'room:created',
  ROOM_STATE = 'room:state',
  ROOM_UPDATE_PREVIEW = 'room:update-review',
  ROOM_PLAYER_JOINED = 'room:player-joined',
  ROOM_PLAYER_LEFT = 'room:player-left',
  ERROR = 'error',
}

export type UserStatus = 'IN_LOBBY' | 'IN_ROOM' | 'IN_GAME';

type ClientEvent =
  | { type: 'room:create'; payload: { settings: RoomSettings } }
  | { type: 'room:ask-list' }
  | { type: 'room:search'; payload: { name: string | undefined } }
  | { type: 'room:join'; payload: { roomId: string } }
  | { type: 'room:leave' }
  | { type: 'room:ask-room-info' };

type ServerEvent =
  | { type: 'session:token'; payload: { sessionToken: string } }
  | { type: 'session:connect' }
  | { type: 'session:reconnect'; payload: { userStatus: UserStatus } }
  | { type: 'session:player-reconnect'; payload: { player: Player } }
  | { type: 'session:status'; payload: { userStatus: UserStatus } }
  | { type: 'room:send-list'; payload: { roomPreviews: RoomPreview[] } }
  | { type: 'room:created'; payload: { roomPreview: RoomPreview } }
  | { type: 'room:state'; payload: { roomInfo: RoomInfo } }
  | { type: 'room:update-review'; payload: { roomPreview: RoomPreview } }
  | { type: 'room:player-joined'; payload: { player: Player } }
  | { type: 'room:player-left'; payload: { player: Player } }
  | { type: 'error'; payload: { code: ErrorCode } };

export type ErrorCode =
  | 'ROOM_NOT_FOUND'
  | 'ROOM_FULL'
  | 'INVALID_ACTION'
  | 'AUTH_REQUIRED'
  | 'ALREADY_ONLINE';

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
