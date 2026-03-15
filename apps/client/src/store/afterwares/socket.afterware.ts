import { URLS } from '@api/RouterAPI/router.constants';
import { router } from '@/main';
import type { Afterware } from '@api/StateAPI';
import { SocketActionTypes } from '../actions/socket.actions';
import { showErrorToast } from '@/utils';
import { SOCKET_ERROR_MESSAGES } from '@/api/SocketClientAPI/socket.constants';
import type { AppActions } from '../types/action';

export default function socketAfterware<State>(): Afterware<State, AppActions> {
  return async function afterware(context) {
    if (context.action.type === SocketActionTypes.SOCKET_AUTH_FAILED) {
      router.navigate(URLS.LOGIN());
      showErrorToast(context.action.payload.error, SOCKET_ERROR_MESSAGES.CONNECT);
    }
  };
}
