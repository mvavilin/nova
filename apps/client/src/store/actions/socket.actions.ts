import type { Player, RoomInfo, RoomSettings } from '@repo/shared/src/types/room';

export enum SocketActionTypes {
  SOCKET_REQUEST_SESSION_TOKEN = 'SOCKET/REQUEST_SESSION_TOKEN',
  SOCKET_AUTH_FAILED = 'SOCKET/AUTH_FAILED',
  SOCKET_CREATE_ROOM = 'SOCKET/CREATE_ROOM',
  SOCKET_REQUEST_ROOM_LIST = 'SOCKET/REQUEST_ROOM_LIST',
  SOCKET_JOIN_ROOM = 'SOCKET/JOIN_ROOM',
  ROOM_ASK_ROOM_INFO = 'SOCKET/ROOM_ASK_ROOM_INFO',
  ROOM_STATE = 'SOCKET/ROOM_STATE',
  SESSION_PLAYER_CONNECTED = 'SOCKET/SESSION_PLAYER_CONNECTED',
  SESSION_PLAYER_DISCONNECTED = 'SOCKET/SESSION_PLAYER_DISCONNECTED',
  SESSION_PLAYER_EXIT = 'SOCKET/SESSION_PLAYER_EXIT',
}

type SocketRequestSessionToken = {
  type: SocketActionTypes.SOCKET_REQUEST_SESSION_TOKEN;
  payload: { authToken: string | null };
};

type SocketAuthFailed = {
  type: SocketActionTypes.SOCKET_AUTH_FAILED;
  payload: { error: unknown };
};
type SocketCreateRoom = {
  type: SocketActionTypes.SOCKET_CREATE_ROOM;
  payload: RoomSettings;
};

type SocketRequestRoomList = {
  type: SocketActionTypes.SOCKET_REQUEST_ROOM_LIST;
};

type SocketJoinRoom = {
  type: SocketActionTypes.SOCKET_JOIN_ROOM;
  payload: { roomId: string };
};

type SocketRoomAskRoomInfo = {
  type: SocketActionTypes.ROOM_ASK_ROOM_INFO;
};

type SocketRoomState = {
  type: SocketActionTypes.ROOM_STATE;
  payload: { roomInfo: RoomInfo };
};

type SocketSessionPlayerConnected = {
  type: SocketActionTypes.SESSION_PLAYER_CONNECTED;
  payload: { player: Player };
};

type SocketSessionPlayerDisconnected = {
  type: SocketActionTypes.SESSION_PLAYER_DISCONNECTED;
  payload: { player: Player };
};

type SocketSessionPlayerExit = {
  type: SocketActionTypes.SESSION_PLAYER_EXIT;
  payload: { player: Player };
};

export type SocketActions =
  | SocketRequestSessionToken
  | SocketAuthFailed
  | SocketCreateRoom
  | SocketRequestRoomList
  | SocketJoinRoom
  | SocketRoomState
  | SocketSessionPlayerConnected
  | SocketSessionPlayerDisconnected
  | SocketRoomAskRoomInfo
  | SocketSessionPlayerExit;
