import type { RoomInfo, RoomSettings, Player } from '@repo/shared/src/types/room';

export enum SocketActionTypes {
  SOCKET_CONNECT = 'SOCKET/SOCKET_CONNECT',
  SOCKET_AUTH_FAILED = 'SOCKET/AUTH_FAILED',
  SOCKET_CREATE_ROOM = 'SOCKET/CREATE_ROOM',
  SOCKET_REQUEST_ROOM_LIST = 'SOCKET/REQUEST_ROOM_LIST',
  SOCKET_JOIN_ROOM = 'SOCKET/JOIN_ROOM',
  ROOM_ASK_ROOM_INFO = 'SOCKET/ROOM_ASK_ROOM_INFO',
  ROOM_STATE = 'SOCKET/ROOM_STATE',
  TEAM_CHANGE = 'SOCKET/TEAM_CHANGE',
  LEAVE_ROOM = 'SOCKET/LEAVE_ROOM',
  GAME_ADD_PLAYER = 'SOCKET/GAME_ADD_PLAYER',
  ROOM_ASK_GAME_INFO = 'SOCKET/ROOM_ASK_GAME_INFO',
}

type SocketConnect = {
  type: SocketActionTypes.SOCKET_CONNECT;
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

type SocketTeamChange = {
  type: SocketActionTypes.TEAM_CHANGE;
  payload: Player;
};

type SocketLeaveRoom = {
  type: SocketActionTypes.LEAVE_ROOM;
};

type SocketGameAddPlayer = {
  type: SocketActionTypes.GAME_ADD_PLAYER;
};

type SocketGameAskGameInfo = {
  type: SocketActionTypes.ROOM_ASK_GAME_INFO;
};

export type SocketActions =
  | SocketConnect
  | SocketAuthFailed
  | SocketCreateRoom
  | SocketRequestRoomList
  | SocketJoinRoom
  | SocketRoomState
  | SocketRoomAskRoomInfo
  | SocketTeamChange
  | SocketLeaveRoom
  | SocketGameAskGameInfo
  | SocketGameAddPlayer;
