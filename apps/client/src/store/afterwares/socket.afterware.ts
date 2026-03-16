import type { Afterware } from '@StateAPI';
import { SOCKET_ERROR_MESSAGES } from '@SocketClientAPI/socket.constants';
import type { AppActions } from '@AppActions';
import { SocketActionTypes } from '@actions';
import { showErrorToast } from '@utils';

export default function socketAfterware<State>(): Afterware<State, AppActions> {
  return async function afterware(context) {
    if (context.action.type === SocketActionTypes.SOCKET_AUTH_FAILED) {
      showErrorToast(context.action.payload.error, SOCKET_ERROR_MESSAGES.CONNECT_ERROR);
    }
  };
}
