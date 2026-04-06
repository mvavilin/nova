import type { Middleware } from '@StateAPI';
import type { AppActions } from '@AppActions';
import { ClientEventType, ServerEventType } from '@repo/shared/src/socketEvents';
import { socketClient } from '@SocketClientAPI';
import { SOCKET_ERROR_MESSAGES } from '@SocketClientAPI/socket.constants';
import { GameActionTypes, RoomPageActionTypes, SocketActionTypes } from '@actions';
import { showErrorToast } from '@utils';
import { URLS } from '@RouterAPI/router.constants';
import { router } from '@router';
import store from '@store';

export default function socketFetcher<State>(): Middleware<State, AppActions> {
  return function middleware(context) {
    if (context.action.type === SocketActionTypes.TEAM_CHANGE) {
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

    if (context.action.type === SocketActionTypes.LEAVE_ROOM) {
      try {
        socketClient.onError(({ code }) => {
          showErrorToast(code, SOCKET_ERROR_MESSAGES.ON_ERROR);
          socketClient.off(ServerEventType.ERROR);
        });

        context.next({
          type: RoomPageActionTypes.CLEAR_ROOM_DATA,
        });

        router.navigate(URLS.LOBBY());
        socketClient.emit(ClientEventType.ROOM_LEAVE);
      } catch (error) {
        showErrorToast(error, SOCKET_ERROR_MESSAGES.ON_ERROR);
      }
    }

    if (context.action.type === SocketActionTypes.GAME_ADD_PLAYER) {
      try {
        socketClient.onError(({ code }) => {
          showErrorToast(code, SOCKET_ERROR_MESSAGES.ON_ERROR);

          socketClient.off(ServerEventType.ERROR);
        });

        socketClient.onGameStart(() => {
          store.dispatch({ type: GameActionTypes.GAME_ASK_GAME_STATE });

          socketClient.off(ServerEventType.GAME_START);
        });

        context.next({ type: RoomPageActionTypes.CLEAR_ROOM_DATA });

        socketClient.emit(ClientEventType.GAME_ADD_PLAYER);
      } catch (error) {
        showErrorToast(error, SOCKET_ERROR_MESSAGES.ON_ERROR);
      }
    }

    return context.next(context.action);
  };
}
