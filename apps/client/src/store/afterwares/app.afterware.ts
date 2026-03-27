import type { Afterware } from '@StateAPI';
import { AppActionTypes } from '@actions';
import { socketClient } from '@SocketClientAPI';
import { removeLocalStorageData, removeSessionStorageData, showErrorToast } from '@utils';
import { SOCKET_ERROR_MESSAGES } from '@SocketClientAPI/socket.constants';
import TOKENS from '@constants/tokens';
import { router } from '@router';
import { URLS } from '@RouterAPI/router.constants';
import { LOCAL_STORAGE_KEYS } from '@constants/localStorageKeys';

export default function appAfterware<State>(): Afterware<State> {
  return async function afterware(context) {
    if (context.action.type === AppActionTypes.EXIT_APP) {
      try {
        removeSessionStorageData(TOKENS.AUTH);
        removeSessionStorageData(TOKENS.SESSION);
        removeLocalStorageData(LOCAL_STORAGE_KEYS.STORE);

        router.navigate(URLS.LOGIN());

        socketClient.disconnect();
      } catch (error) {
        showErrorToast(error, SOCKET_ERROR_MESSAGES.ON_ERROR);
      }
    }
  };
}
