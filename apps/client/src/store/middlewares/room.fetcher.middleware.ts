import type { Middleware } from '@StateAPI';
import type { AppActions } from '@AppActions';
import { ClientEventType, ServerEventType } from '@repo/shared/src/socketEvents';
import { socketClient } from '@SocketClientAPI';
import { SOCKET_ERROR_MESSAGES } from '@SocketClientAPI/socket.constants';
import { RoomPageActionTypes } from '@actions';
import { showErrorToast } from '@utils';
import store from '../store';

export default function socketFetcher<State>(): Middleware<State, AppActions> {
  socketClient.onPlayerJoined(({ roomInfo }) => {
    store.dispatch({
      type: RoomPageActionTypes.SET_ROOM_DATA,
      payload: { roomInfo },
    });
  });

  socketClient.onPlayerLeft(({ roomInfo }) => {
    store.dispatch({
      type: RoomPageActionTypes.SET_ROOM_DATA,
      payload: { roomInfo },
    });
  });

  socketClient.onTeamChanged(({ roomInfo }) => {
    store.dispatch({
      type: RoomPageActionTypes.SET_ROOM_DATA,
      payload: { roomInfo },
    });
  });

  return function middleware(context) {
    if (context.action.type === RoomPageActionTypes.TEAM_CHANGE) {
      try {
        const player = context.action.payload;

        socketClient.onError(({ code }) => {
          showErrorToast(code, SOCKET_ERROR_MESSAGES.ON_ERROR);

          socketClient.off(ServerEventType.ERROR);
        });

        socketClient.emit(ClientEventType.TEAM_CHANGE, { player });
      } catch (error) {
        showErrorToast(error, SOCKET_ERROR_MESSAGES.ON_ERROR);
      }
    }

    if (context.action.type === RoomPageActionTypes.LEAVE_ROOM) {
      try {
        socketClient.onError(({ code }) => {
          showErrorToast(code, SOCKET_ERROR_MESSAGES.ON_ERROR);

          socketClient.off(ServerEventType.ERROR);
        });

        socketClient.emit(ClientEventType.LEAVE_ROOM);
      } catch (error) {
        showErrorToast(error, SOCKET_ERROR_MESSAGES.ON_ERROR);
      }
    }

    return context.next(context.action);
  };
}
