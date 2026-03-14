import { BaseSocketClient } from '@/api/SocketClientAPI';
import type { ErrorCode } from '@repo/shared/src/socketEvents';
import type { Player, RoomInfo, RoomPreview } from '@repo/shared/src/types/room';
import { ServerUrl } from '@shared/api.constants';

class SocketClient extends BaseSocketClient {
  constructor(serverUrl: string) {
    super(serverUrl);
  }

  public onRoomCreated(handler: (payload: { roomPreview: RoomPreview }) => void): void {
    try {
      this.socket.on('room:created', handler);
    } catch (error) {
      console.error('Error in onRoomCreated:', error);
    }
  }

  public onRoomUpdated(handler: (payload: { roomPreview: RoomPreview }) => void): void {
    try {
      this.socket.on('room:update-review', handler);
    } catch (error) {
      console.error('Error in onRoomUpdated:', error);
    }
  }

  public onRoomState(handler: (payload: { roomInfo: RoomInfo }) => void): void {
    try {
      this.socket.on('room:state', handler);
    } catch (error) {
      console.error('Error in onRoomState:', error);
    }
  }

  public onPlayerJoined(handler: (payload: { player: Player }) => void): void {
    try {
      this.socket.on('room:player-joined', handler);
    } catch (error) {
      console.error('Error in onPlayerJoined:', error);
    }
  }

  public onPlayerLeft(handler: (payload: { player: Player }) => void): void {
    try {
      this.socket.on('room:player-left', handler);
    } catch (error) {
      console.error('Error in onPlayerLeft:', error);
    }
  }

  public onError(handler: (payload: { code: ErrorCode }) => void): void {
    try {
      this.socket.on('error', handler);
    } catch (error) {
      console.error('Error in onError:', error);
    }
  }

  public onRoomList(handler: (payload: { roomPreviews: RoomPreview[] }) => void): void {
    try {
      this.socket.on('room:send-list', handler);
    } catch (error) {
      console.error('Error in onRoomList:', error);
    }
  }

  public onSessionToken(handler: (payload: { sessionToken: string }) => void): void {
    try {
      this.socket.on('session:token', handler);
    } catch (error) {
      console.error('Error in onSessionToken:', error);
    }
  }
}

const socketClient = new SocketClient(ServerUrl.DEPLOY_BASE);

export default socketClient;
