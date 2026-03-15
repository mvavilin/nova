import { Socket, io } from 'socket.io-client';
import {
  type ServerToClientEvents,
  type ClientToServerEvents,
  ServerEventType,
  type ErrorCode,
} from '@repo/shared/src/socketEvents';
import { showErrorToast } from '@utils';
import { SOCKET_ERROR_MESSAGES } from '@api/SocketClientAPI/socket.constants';
import store from '@/store/store';
import { SocketActionTypes } from '@/store/actions/socket.actions';

export default abstract class BaseSocketClient {
  protected socket: Socket<ServerToClientEvents, ClientToServerEvents>;
  private errorHandler?: (payload: { code: ErrorCode }) => void;

  constructor(serverUrl: string) {
    this.socket = io(serverUrl, {
      autoConnect: false,
    });

    this.socket.on('connect_error', (error) => {
      showErrorToast(error, SOCKET_ERROR_MESSAGES.CONNECT_ERROR);
      store.dispatch({
        type: SocketActionTypes.SOCKET_AUTH_FAILED,
        payload: { error },
      });
    });

    this.socket.on(ServerEventType.ERROR, (payload: { code: ErrorCode }) => {
      if (this.errorHandler) {
        try {
          this.errorHandler(payload);
        } catch (error) {
          showErrorToast(error, SOCKET_ERROR_MESSAGES.ON_ERROR);
        }
      }
    });
  }

  public emit<T extends keyof ClientToServerEvents>(
    event: T,
    ...payload: Parameters<ClientToServerEvents[T]>
  ): void {
    this.socket.emit(event, ...payload);
  }

  // public on<EventType extends keyof ServerToClientEvents>(
  //   event: EventType,
  //   handler: (payload: ServerToClientEvents[EventType]) => void
  // ): void {
  //   this.socket.on(event, handler);
  // }

  public off<T extends keyof ServerToClientEvents>(event: T): void {
    this.socket.off(event);
  }

  public connect(authToken: string): void {
    this.socket.auth = { auth_token: authToken };
    this.socket.connect();
  }

  public disconnect(): void {
    if (this.socket.connected) {
      this.socket.disconnect();
    }
  }
}
