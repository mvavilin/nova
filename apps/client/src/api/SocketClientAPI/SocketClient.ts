import type { Player, RoomInfo, RoomPreview } from '@repo/shared/src/types/room';
import { ServerUrl } from '@repo/shared/src/api.constants';
import { type ErrorCode, ServerEventType } from '@repo/shared/src/socketEvents';
import { showErrorToast } from '@utils';
import { BaseSocketClient } from '@api/SocketClientAPI';
import { SOCKET_ERROR_MESSAGES } from '@api/SocketClientAPI/socket.constants';

class SocketClient extends BaseSocketClient {
  constructor(serverUrl: string) {
    super(serverUrl);
  }

  public onRoomCreated(handler: (payload: { roomPreview: RoomPreview }) => void): void {
    try {
      this.socket.on(ServerEventType.ROOM_CREATED, handler);
    } catch (error) {
      showErrorToast(error, SOCKET_ERROR_MESSAGES.ON_ROOM_CREATED);
    }
  }

  public onRoomUpdated(handler: (payload: { roomPreview: RoomPreview }) => void): void {
    try {
      this.socket.on(ServerEventType.ROOM_UPDATE_PREVIEW, handler);
    } catch (error) {
      showErrorToast(error, SOCKET_ERROR_MESSAGES.ON_ROOM_UPDATED);
    }
  }

  public onRoomState(handler: (payload: { roomInfo: RoomInfo }) => void): void {
    try {
      this.socket.on(ServerEventType.ROOM_STATE, handler);
    } catch (error) {
      showErrorToast(error, SOCKET_ERROR_MESSAGES.ON_ROOM_STATE);
    }
  }

  public onPlayerJoined(handler: (payload: { player: Player }) => void): void {
    try {
      this.socket.on(ServerEventType.ROOM_PLAYER_JOINED, handler);
    } catch (error) {
      showErrorToast(error, SOCKET_ERROR_MESSAGES.ON_PLAYER_JOINED);
    }
  }

  public onPlayerLeft(handler: (payload: { player: Player }) => void): void {
    try {
      this.socket.on(ServerEventType.ROOM_PLAYER_LEFT, handler);
    } catch (error) {
      showErrorToast(error, SOCKET_ERROR_MESSAGES.ON_PLAYER_LEFT);
    }
  }

  public onError(handler: (payload: { code: ErrorCode }) => void): void {
    try {
      this.socket.on(ServerEventType.ERROR, handler);
    } catch (error) {
      showErrorToast(error, SOCKET_ERROR_MESSAGES.ON_ERROR);
    }
  }

  public onRoomList(handler: (payload: { roomPreviews: RoomPreview[] }) => void): void {
    try {
      this.socket.on(ServerEventType.ROOM_SEND_LIST, handler);
    } catch (error) {
      showErrorToast(error, SOCKET_ERROR_MESSAGES.ON_ROOM_LIST);
    }
  }

  public onSessionToken(handler: (payload: { sessionToken: string }) => void): void {
    try {
      this.socket.on(ServerEventType.SESSION_TOKEN, handler);
    } catch (error) {
      showErrorToast(error, SOCKET_ERROR_MESSAGES.ON_SESSION_TOKEN);
    }
  }
}

const socketClient = new SocketClient(ServerUrl.DEPLOY_BASE);

export default socketClient;
