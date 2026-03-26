import type { RoomInfo } from '@shared/types/room';

export enum RoomPageActionTypes {
  SET_ROOM_DATA = 'ROOM/SET_ROOM_DATA',
  CLEAR_ROOM_DATA = 'ROOM/CLEAR_ROOM_DATA',
  // LEAVE_ROOM = 'ROOM/LEAVE_ROOM',
  // TEAM_CHANGE = 'ROOM/TEAM_CHANGE',
}

export type RoomSetData = {
  type: RoomPageActionTypes.SET_ROOM_DATA;
  payload: { roomInfo: RoomInfo };
};

export type RoomClearData = {
  type: RoomPageActionTypes.CLEAR_ROOM_DATA;
};

// export type RoomTeamChange = {
//   type: RoomPageActionTypes.TEAM_CHANGE;
//   payload: Player;
// };

// export type RoomGameStartTimer = {
//   type: RoomPageActionTypes.LEAVE_ROOM;
// };

// export type RoomLeaveRoom = {
//   type: RoomPageActionTypes.LEAVE_ROOM;
// };

export type RoomPageActions = RoomSetData | RoomClearData;
