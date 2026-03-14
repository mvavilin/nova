import { Socket, io } from 'socket.io-client';
import type { ServerToClientEvents, ClientToServerEvents } from '@repo/shared/src/socketEvents';

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
      console.error(`Emit error for event "${event}":`, error);
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
      console.error(`Error unsubscribing from event "${event}":`, error);
    }
  }

  public connect(authToken: string, sessionToken: string = ''): void {
    try {
      this.socket.auth = { auth_token: authToken, session_token: sessionToken };
      this.socket.connect();
      console.log('Socket connecting with auth token...');
    } catch (error) {
      console.error('Socket connection error:', error);
    }
  }

  public disconnect(): void {
    try {
      if (this.socket.connected) this.socket.disconnect();
    } catch (error) {
      console.error('Socket disconnect error:', error);
    }
  }
}
