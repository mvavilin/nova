import type { Middleware } from '@StateAPI';
import type { AppActions } from '@AppActions';
import { ClientEventType, ServerEventType, UserStatusType } from '@repo/shared/src/socketEvents';

import { socketClient } from '@SocketClientAPI';
import { SOCKET_ERROR_MESSAGES } from '@SocketClientAPI/socket.constants';
import { SocketActionTypes } from '@actions';
import { URLS } from '@RouterAPI/router.constants';
import { router } from '@router';

import TOKENS from '@constants/tokens';
import { saveSessionStorageData, showErrorToast } from '@utils';
import store from '@store';
import { Toast } from '@components';
import MessageType from '@constants/messageType';

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
          console.log(userStatus);

          if (userStatus === UserStatusType.IN_LOBBY) router.navigate(URLS.LOBBY());
          if (userStatus === UserStatusType.IN_ROOM)
            store.dispatch({
              type: SocketActionTypes.ROOM_ASK_ROOM_INFO,
            });

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
        socketClient.onRoomCreated(({ roomPreview }) => {
          router.navigate(URLS.ROOM(roomPreview.id));

          socketClient.off(ServerEventType.ROOM_CREATED);
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
          showErrorToast(code, SOCKET_ERROR_MESSAGES.ON_ERROR);

          socketClient.off(ServerEventType.ERROR);
        });

        socketClient.onRoomState(() => {
          router.navigate(URLS.ROOM(roomId));

          socketClient.off(ServerEventType.ROOM_STATE);
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
          router.navigate(URLS.ROOM(roomInfo.id));

          socketClient.off(ServerEventType.ROOM_STATE);
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
