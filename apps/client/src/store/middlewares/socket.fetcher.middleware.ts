import type { Middleware } from '@StateAPI';
import type { AppActions } from '@AppActions';

import { saveSessionStorageData, showErrorToast } from '@utils';
import TOKENS from '@constants/tokens';
import { router } from '@router';
import { URLS } from '@RouterAPI/router.constants';
import { SOCKET_ERROR_MESSAGES } from '@SocketClientAPI/socket.constants';
import { SocketActionTypes } from '@actions';

import { socketClient } from '@SocketClientAPI';

export default function socketFetcher<State>(): Middleware<State, AppActions> {
  return function middleware(context) {
    if (context.action.type === SocketActionTypes.SOCKET_REQUEST_SESSION_TOKEN) {
      try {
        const authToken = context.action.payload.authToken;

        if (authToken === null) throw new Error('Authorization token not found');

        socketClient.connect(authToken);

        socketClient.onSessionToken(({ sessionToken }) => {
          saveSessionStorageData(TOKENS.SESSION, sessionToken);
          router.navigate(URLS.LOBBY());
        });
      } catch (error) {
        router.navigate(URLS.LOGIN());
        showErrorToast(error, SOCKET_ERROR_MESSAGES.ON_SESSION_TOKEN);
      }
    }

    return context.next(context.action);
  };
}
