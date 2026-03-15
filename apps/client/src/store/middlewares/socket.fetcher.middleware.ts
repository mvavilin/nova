import type { Middleware } from '@api/StateAPI/types/types';
import type { AppActions } from '../types/action';
import { saveSessionStorageData, showErrorToast } from '@utils';
import { SOCKET_ERROR_MESSAGES } from '@api/SocketClientAPI/socket.constants';
import TOKENS from '@constants/tokens';
import { router } from '@app';
import { URLS } from '@api/RouterAPI/router.constants';
import { SocketActionTypes } from '../actions/socket.actions';
import { ServerUrl } from '@repo/shared/src/api.constants';
import { SocketClient } from '@/api/SocketClientAPI';

export default function socketFetcher<State>(): Middleware<State, AppActions> {
  return function middleware(context) {
    if (context.action.type === SocketActionTypes.SOCKET_REQUEST_SESSION_TOKEN) {
      try {
        const authToken = context.action.payload.authToken;

        if (authToken === null) throw new Error('Authorization token not found');

        const socketClient = new SocketClient(ServerUrl.DEPLOY_BASE);
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
