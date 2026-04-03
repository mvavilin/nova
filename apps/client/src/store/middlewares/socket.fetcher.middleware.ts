import type { Middleware } from '@StateAPI';
import type { AppActions } from '@AppActions';
import {
  ClientEventType,
  ServerEventType,
  SocketErrorCode,
  UserStatusType,
} from '@repo/shared/src/socketEvents';

import { socketClient } from '@SocketClientAPI';
import { SOCKET_ERROR_MESSAGES } from '@SocketClientAPI/socket.constants';
import { RoomPageActionTypes, SocketActionTypes } from '@actions';
import { URLS } from '@RouterAPI/router.constants';
import { router } from '@router';

import { TOKENS } from '@constants/tokens';
import {
  saveSessionStorageData,
  showErrorToast,
  removeSessionStorageData,
  getSessionStorageData,
} from '@utils';
import store from '@store';
import { Toast } from '@components';
import MessageType from '@constants/messageType';
import { SESSION_STORAGE_KEYS } from '@constants/sessionStorageKeys';
import { isObject } from '@utils/isObject';

export default function socketFetcher<State>(): Middleware<State, AppActions> {
  return function middleware(context) {
    if (context.action.type === SocketActionTypes.SOCKET_REQUEST_SESSION_TOKEN) {
      try {
        const authToken = context.action.payload.authToken;

        if (authToken === null) throw new Error('Authorization token not found');

        socketClient.onSessionToken(({ sessionToken }) => {
          saveSessionStorageData(TOKENS.SESSION, sessionToken);

          socketClient.off(ServerEventType.SESSION_TOKEN);
        });

        socketClient.onSessionConnect(({ userStatus }) => {
          if (userStatus === UserStatusType.IN_LOBBY) router.init(URLS.LOBBY());
          if (userStatus === UserStatusType.IN_ROOM)
            store.dispatch({ type: SocketActionTypes.ROOM_ASK_ROOM_INFO });
          if (userStatus === UserStatusType.IN_GAME)
            store.dispatch({ type: SocketActionTypes.ROOM_ASK_GAME_INFO });

          socketClient.off(ServerEventType.SESSION_TOKEN);
        });

        socketClient.onError(({ code }) => {
          if (code === SocketErrorCode.ALREADY_ONLINE) {
            showErrorToast(code, SOCKET_ERROR_MESSAGES.GENERAL_ERROR);

            removeSessionStorageData(TOKENS.AUTH);
            removeSessionStorageData(TOKENS.SESSION);
            removeSessionStorageData(SESSION_STORAGE_KEYS.STORE);

            socketClient.disconnect();
          }

          socketClient.off(ServerEventType.SESSION_TOKEN);
        });

        socketClient.connect(authToken);
      } catch (error) {
        router.navigate(URLS.LOGIN());
        showErrorToast(error, SOCKET_ERROR_MESSAGES.ON_SESSION_TOKEN);
      }
    }

    if (context.action.type === SocketActionTypes.SOCKET_CREATE_ROOM) {
      try {
        socketClient.onRoomState(({ roomInfo }) => {
          socketClient.off(ServerEventType.ROOM_STATE);

          socketClient.onError(({ code }) => {
            showErrorToast(code, SOCKET_ERROR_MESSAGES.ON_ERROR);

            socketClient.off(ServerEventType.ERROR);
          });

          context.next({
            type: RoomPageActionTypes.SET_ROOM_DATA,
            payload: { roomInfo },
          });

          router.navigate(URLS.ROOM(roomInfo.id));
        });

        const { name, maxPlayers } = context.action.payload;

        socketClient.emit(ClientEventType.ROOM_CREATE, { settings: { name, maxPlayers } });
      } catch (error) {
        showErrorToast(error, SOCKET_ERROR_MESSAGES.ON_ERROR);
      }
    }

    if (context.action.type === SocketActionTypes.SOCKET_REQUEST_ROOM_LIST) {
      try {
        socketClient.emit(ClientEventType.ROOM_ASK_LIST);
      } catch (error) {
        showErrorToast(error, SOCKET_ERROR_MESSAGES.ON_ERROR);
      }
    }

    // точка входа в комнату
    if (context.action.type === SocketActionTypes.SOCKET_JOIN_ROOM) {
      try {
        const { roomId } = context.action.payload;

        socketClient.onError(({ code }) => {
          if (code === SocketErrorCode.ROOM_NOT_FOUND)
            showErrorToast(code, SOCKET_ERROR_MESSAGES.ON_ERROR);

          socketClient.off(ServerEventType.ERROR);
        });

        socketClient.onRoomState(({ roomInfo }) => {
          socketClient.off(ServerEventType.ROOM_STATE);

          context.next({
            type: RoomPageActionTypes.SET_ROOM_DATA,
            payload: { roomInfo },
          });

          router.navigate(URLS.ROOM(roomId));
        });

        socketClient.onSessionPlayerConnected(({ player }) => {
          new Toast({
            type: MessageType.INFO,
            message: `Пользователь ${player.username} присоединился к комнате`,
          });
        });

        socketClient.onSessionPlayerDisconnected(({ player }) => {
          new Toast({
            type: MessageType.WARNING,
            message: `Пользователь ${player.username} покинул комнату`,
          });
        });

        socketClient.onSessionPlayerExit(({ player }) => {
          new Toast({
            type: MessageType.ERROR,
            message: `Пользователь ${player.username} вышел из системы`,
          });
        });

        socketClient.emit(ClientEventType.ROOM_JOIN, { roomId });
      } catch (error) {
        showErrorToast(error, SOCKET_ERROR_MESSAGES.ON_ERROR);
      }
    }

    // точка реконнекта пользователя, включающая запрос информации о комнате и навигацию в нее
    if (context.action.type === SocketActionTypes.ROOM_ASK_ROOM_INFO) {
      try {
        socketClient.onRoomState(({ roomInfo }) => {
          socketClient.off(ServerEventType.ROOM_STATE);

          context.next({
            type: RoomPageActionTypes.SET_ROOM_DATA,
            payload: { roomInfo },
          });

          router.navigate(URLS.ROOM(roomInfo.id));
        });

        socketClient.onSessionPlayerConnected(({ player }) => {
          new Toast({
            type: MessageType.INFO,
            message: `Пользователь ${player.username} переподключился к комнате`,
          });
        });

        socketClient.onSessionPlayerDisconnected(({ player }) => {
          new Toast({
            type: MessageType.WARNING,
            message: `Пользователь ${player.username} покинул комнату`,
          });
        });

        socketClient.onSessionPlayerExit(({ player }) => {
          new Toast({
            type: MessageType.ERROR,
            message: `Пользователь ${player.username} вышел из системы`,
          });
        });

        socketClient.emit(ClientEventType.ROOM_ASK_ROOM_INFO);
      } catch (error) {
        showErrorToast(error, SOCKET_ERROR_MESSAGES.ON_ERROR);
      }
    }

    // точка реконнекта пользователя, включающая запрос информации об игре и навигацию в нее
    if (context.action.type === SocketActionTypes.ROOM_ASK_GAME_INFO) {
      try {
        const gameInfo = getSessionStorageData(SESSION_STORAGE_KEYS.GAME_INFO);

        if (isObject(gameInfo) && 'id' in gameInfo && typeof gameInfo['id'] === 'string')
          router.init(URLS.GAME(gameInfo['id']));
      } catch (error) {
        showErrorToast(error, SOCKET_ERROR_MESSAGES.ON_ERROR);
      }
    }

    return context.next(context.action);
  };
}
