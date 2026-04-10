import type { RoomInfo } from '@shared/types/room';

export enum RoomPageActionTypes {
  SET_ROOM_DATA = 'ROOM/SET_ROOM_DATA',
  CLEAR_ROOM_DATA = 'ROOM/CLEAR_ROOM_DATA',
}

export type RoomSetData = {
  type: RoomPageActionTypes.SET_ROOM_DATA;
  payload: { roomInfo: RoomInfo };
};

export type RoomClearData = {
  type: RoomPageActionTypes.CLEAR_ROOM_DATA;
};

export type RoomPageActions = RoomSetData | RoomClearData;
