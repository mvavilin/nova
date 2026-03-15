import type { State } from '../types/state';
import type { AppActions } from '../types/action';
import { SocketActionTypes } from '../actions/socket.actions';

export default function socketReducer(state: State, action: AppActions): State {
  switch (action.type) {
    case SocketActionTypes.SOCKET_REQUEST_SESSION_TOKEN: {
      return { ...state, authStatus: true };
    }

    case SocketActionTypes.SOCKET_AUTH_FAILED: {
      return { ...state, authStatus: false };
    }

    default: {
      return state;
    }
  }
}
