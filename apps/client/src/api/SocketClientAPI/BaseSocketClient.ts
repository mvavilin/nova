import { Socket, io } from 'socket.io-client';
import type { ServerToClientEvents, ClientToServerEvents } from '@repo/shared/src/socketEvents';
import { showErrorToast } from '@utils';
import { SOCKET_ERROR_MESSAGES } from '@api/SocketClientAPI/socket.constants';
import store from '@/store/store';
import { SocketActionTypes } from '@/store/actions/socket.actions';

export default abstract class BaseSocketClient {
  protected socket: Socket<ServerToClientEvents, ClientToServerEvents>;

  constructor(serverUrl: string) {
    this.socket = io(serverUrl);
  }

  public emit<T extends keyof ClientToServerEvents>(
    event: T,
    ...payload: Parameters<ClientToServerEvents[T]>
  ): void {
    try {
      this.socket.emit(event, ...payload);
    } catch (error) {
      showErrorToast(error, `${SOCKET_ERROR_MESSAGES.EMIT} "${String(event)}"`);
    }
  }

  // public on<EventType extends keyof ServerToClientEvents>(
  //   type: EventType,
  //   handler: (payload: ServerToClientEvents[EventType]) => void
  // ): void {
  //   try {
  //     this.socket.on(type, handler);
  //   } catch (error) {
  //     console.error(`Socket on error [${type}]:`, error);
  //   }
  // }

  public off<T extends keyof ServerToClientEvents>(event: T): void {
    try {
      this.socket.off(event);
    } catch (error) {
      showErrorToast(error, `${SOCKET_ERROR_MESSAGES.OFF} "${String(event)}"`);
    }
  }

  public connect(authToken: string): void {
    this.socket.auth = { auth_token: authToken };

    this.socket.on('connect_error', (error) => {
      store.dispatch({ type: SocketActionTypes.SOCKET_AUTH_FAILED, payload: { error } });
    });

    this.socket.connect();
  }

  public disconnect(): void {
    try {
      if (this.socket.connected) this.socket.disconnect();
    } catch (error) {
      showErrorToast(error, SOCKET_ERROR_MESSAGES.DISCONNECT);
    }
  }
}
