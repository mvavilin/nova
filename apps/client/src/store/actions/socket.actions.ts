import type { RoomSettings } from '@repo/shared/src/types/room';

export enum SocketActionTypes {
  SOCKET_REQUEST_SESSION_TOKEN = 'SOCKET/REQUEST_SESSION_TOKEN',
  SOCKET_AUTH_FAILED = 'SOCKET/AUTH_FAILED',
  SOCKET_CREATE_ROOM = 'SOCKET/CREATE_ROOM',
  SOCKET_REQUEST_ROOM_LIST = 'SOCKET/REQUEST_ROOM_LIST',
  SOCKET_JOIN_ROOM = 'SOCKET/JOIN_ROOM',
  ROOM_ASK_ROOM_INFO = 'SOCKET/ROOM_ASK_ROOM_INFO',
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

export type SocketActions =
  | SocketRequestSessionToken
  | SocketAuthFailed
  | SocketCreateRoom
  | SocketRequestRoomList
  | SocketJoinRoom
  | SocketRoomAskRoomInfo;
