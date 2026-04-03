import type { Afterware } from '@StateAPI';
import { AppActionTypes } from '@actions';
import { socketClient } from '@SocketClientAPI';
import { removeSessionStorageData, showErrorToast } from '@utils';
import { SOCKET_ERROR_MESSAGES } from '@SocketClientAPI/socket.constants';
import { TOKENS } from '@constants/tokens';
import { router } from '@router';
import { URLS } from '@RouterAPI/router.constants';
import { SESSION_STORAGE_KEYS } from '@/constants/sessionStorageKeys';
import { ClientEventType } from '@repo/shared/src/socketEvents';

export default function appAfterware<State>(): Afterware<State> {
  return async function afterware(context) {
    if (context.action.type === AppActionTypes.EXIT_APP) {
      try {
        removeSessionStorageData(TOKENS.AUTH);
        removeSessionStorageData(TOKENS.SESSION);
        removeSessionStorageData(SESSION_STORAGE_KEYS.STORE);

        socketClient.emit(ClientEventType.SESSION_LOGOUT);

        router.navigate(URLS.LOGIN());

        socketClient.disconnect();
      } catch (error) {
        showErrorToast(error, SOCKET_ERROR_MESSAGES.ON_ERROR);
      }
    }
  };
}
