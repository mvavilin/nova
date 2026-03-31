import type { State } from '../types';
import type { AppActions } from '../types';
import { RoomPageActionTypes } from '../actions';

export default function roomReducer(state: State, action: AppActions): State {
  switch (action.type) {
    case RoomPageActionTypes.SET_ROOM_DATA: {
      return {
        ...state,
        currentRoom: action.payload.roomInfo,
      };
    }

    case RoomPageActionTypes.CLEAR_ROOM_DATA: {
      return {
        ...state,
        currentRoom: null,
      };
    }

    default: {
      return state;
    }
  }
}
