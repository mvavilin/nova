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
import { GameActionTypes, AppActionTypes, RoomPageActionTypes, SocketActionTypes } from '@actions';
import { URLS } from '@RouterAPI/router.constants';
import { router } from '@router';
import { showErrorToast } from '@utils';
import store from '@store';
import { Toast } from '@components';
import MessageType from '@constants/messageType';
import { t } from 'i18n';
import { TranslationKeys } from '@/i18n/translationKeys';

export default function socketFetcher<State>(): Middleware<State, AppActions> {
  return function middleware(context) {
    if (context.action.type === SocketActionTypes.SOCKET_CONNECT) {
      try {
        const authToken = context.action.payload.authToken;

        if (authToken === null) throw new Error('Authorization token not found');

        socketClient.onSessionConnect(({ userStatus, userId, username }) => {
          context.next({
            type: AppActionTypes.UPDATE_STORE,
            payload: { userId, username },
          });

          if (userStatus === UserStatusType.IN_LOBBY) router.init(URLS.LOBBY());
          if (userStatus === UserStatusType.IN_ROOM)
            store.dispatch({ type: SocketActionTypes.ROOM_ASK_ROOM_INFO });
          if (userStatus === UserStatusType.IN_GAME)
            store.dispatch({ type: GameActionTypes.GAME_ASK_GAME_STATE });

          socketClient.off(ServerEventType.SESSION_CONNECT);
        });

        socketClient.onError(({ code }) => {
          if (code === SocketErrorCode.ALREADY_ONLINE) {
            showErrorToast(
              t(TranslationKeys.SOCKET_ERROR_ALREADY_ONLINE),
              t(TranslationKeys.SOCKET_ERROR)
            );
            context.next({
              type: AppActionTypes.RESET_DATA,
            });
          }

          socketClient.off(ServerEventType.ERROR);
        });

        socketClient.connect(authToken);
      } catch (error) {
        router.navigate(URLS.LOGIN());
        showErrorToast(error, SOCKET_ERROR_MESSAGES.CONNECT_ERROR);
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

    // Точка входа в комнату
    if (context.action.type === SocketActionTypes.SOCKET_JOIN_ROOM) {
      try {
        const { roomId } = context.action.payload;

        socketClient.onError(({ code }) => {
          showErrorToast(code, SOCKET_ERROR_MESSAGES.ON_ERROR);
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

    // Точка реконнекта пользователя, включающая запрос информации о комнате и навигацию в нее
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

    return context.next(context.action);
  };
}
