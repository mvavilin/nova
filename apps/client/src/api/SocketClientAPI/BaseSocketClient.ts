import { Socket, io } from 'socket.io-client';
import {
  type ServerToClientEvents,
  type ClientToServerEvents,
  ServerEventType,
} from '@repo/shared/src/socketEvents';
import store from '@store';
import { SocketActionTypes } from '@actions';

export default abstract class BaseSocketClient {
  protected _socket: Socket<ServerToClientEvents, ClientToServerEvents>;

  constructor(serverUrl: string) {
    this._socket = io(serverUrl, {
      autoConnect: false,
      forceNew: true,
      multiplex: false,
      reconnection: false,
    });

    this._socket.on(ServerEventType.CONNECT_ERROR, (error: unknown) => {
      store.dispatch({ type: SocketActionTypes.SOCKET_AUTH_FAILED, payload: { error } });
    });
  }

  public emit<T extends keyof ClientToServerEvents>(
    event: T,
    ...payload: Parameters<ClientToServerEvents[T]>
  ): void {
    this._socket.emit(event, ...payload);
  }

  // public on<EventType extends keyof ServerToClientEvents>(
  //   event: EventType,
  //   handler: (payload: ServerToClientEvents[EventType]) => void
  // ): void {
  //   this._socket.on(event, handler);
  // }

  public off<T extends keyof ServerToClientEvents>(event: T): void {
    this._socket.off(event);
  }

  public connect(authToken: string): void {
    this._socket.auth = { auth_token: authToken };
    this._socket.connect();
  }

  public disconnect(): void {
    if (this._socket.connected) {
      this._socket.disconnect();
    }
  }

  public get socket(): Socket<ServerToClientEvents, ClientToServerEvents> {
    return this._socket;
  }
}
