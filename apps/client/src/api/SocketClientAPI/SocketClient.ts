import type { Player, RoomInfo, RoomPreview } from '@repo/shared/src/types/room';
import { ServerEventType, type ErrorCode } from '@repo/shared/src/socketEvents';
import { ServerUrl } from '@repo/shared/src/api.constants';

import { BaseSocketClient } from '@SocketClientAPI';
import { SOCKET_ERROR_MESSAGES } from '@SocketClientAPI/socket.constants';
import { showErrorToast } from '@utils';

class SocketClient extends BaseSocketClient {
  constructor(serverUrl: string) {
    super(serverUrl);
  }

  public onRoomCreated(handler: (payload: { roomPreview: RoomPreview }) => void): void {
    this.socket.on(ServerEventType.ROOM_CREATED, handler);
  }

  public onRoomUpdated(handler: (payload: { roomPreview: RoomPreview }) => void): void {
    this.socket.on(ServerEventType.ROOM_UPDATE_PREVIEW, handler);
  }

  public onRoomState(handler: (payload: { roomInfo: RoomInfo }) => void): void {
    this.socket.on(ServerEventType.ROOM_STATE, handler);
  }

  public onPlayerJoined(handler: (payload: { player: Player }) => void): void {
    this.socket.on(ServerEventType.ROOM_PLAYER_JOINED, handler);
  }

  public onPlayerLeft(handler: (payload: { player: Player }) => void): void {
    this.socket.on(ServerEventType.ROOM_PLAYER_LEFT, handler);
  }

  public onRoomList(handler: (payload: { roomPreviews: RoomPreview[] }) => void): void {
    this.socket.on(ServerEventType.ROOM_SEND_LIST, handler);
  }

  public onSessionToken(handler: (payload: { sessionToken: string }) => void): void {
    this.socket.on(ServerEventType.SESSION_TOKEN, handler);
  }

  public onError(handler: (payload: { code: ErrorCode }) => void): void {
    try {
      this.socket.on(ServerEventType.ERROR, handler);
    } catch (error) {
      showErrorToast(error, SOCKET_ERROR_MESSAGES.ON_ERROR);
    }
  }
}

const socketClient = new SocketClient(ServerUrl.DEPLOY_BASE);

export default socketClient;
