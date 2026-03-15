import type { Afterware } from '@StateAPI';
import type { AppActions } from '@AppActions';
import { SocketActionTypes } from '@actions';
import { showErrorToast } from '@utils';
import { router } from '@router';
import { URLS } from '@RouterAPI/router.constants';
import { SOCKET_ERROR_MESSAGES } from '@SocketClientAPI/socket.constants';

export default function socketAfterware<State>(): Afterware<State, AppActions> {
  return async function afterware(context) {
    if (context.action.type === SocketActionTypes.SOCKET_AUTH_FAILED) {
      router.navigate(URLS.LOGIN());
      showErrorToast(context.action.payload.error, SOCKET_ERROR_MESSAGES.CONNECT_ERROR);
    }
  };
}
