import type { Middleware } from '@StateAPI';
import type { AppActions } from '@AppActions';
import { ClientEventType, ServerEventType } from '@repo/shared/src/socketEvents';
import { socketClient } from '@SocketClientAPI';
import { SOCKET_ERROR_MESSAGES } from '@SocketClientAPI/socket.constants';
import { RoomPageActionTypes } from '@actions';
import { showErrorToast } from '@utils';
import store from '../store';
import { URLS } from '@RouterAPI/router.constants';
import { router } from '@router';

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

  // socketClient.onRoomState(({ roomInfo }) => {
  //   store.dispatch({
  //     type: RoomPageActionTypes.SET_ROOM_DATA,
  //     payload: { roomInfo },
  //   });
  // });

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

        socketClient.off(ServerEventType.ROOM_PLAYER_JOINED);
        socketClient.off(ServerEventType.ROOM_PLAYER_LEFT);
        socketClient.off(ServerEventType.TEAM_CHANGED);

        context.next({
          type: RoomPageActionTypes.CLEAR_ROOM_DATA,
        });

        router.navigate(URLS.LOBBY());
        socketClient.emit(ClientEventType.ROOM_LEAVE);
      } catch (error) {
        showErrorToast(error, SOCKET_ERROR_MESSAGES.ON_ERROR);
      }
    }

    return context.next(context.action);
  };
}
