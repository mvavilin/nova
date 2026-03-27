import type { Player, RoomInfo, RoomPreview } from '@repo/shared/src/types/room';
import type { GameInfo } from '@shared/types/game';
import { ServerEventType, type ErrorCode, type UserStatus } from '@repo/shared/src/socketEvents';
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
  public offRoomState(listener: (payload: { roomInfo: RoomInfo }) => void): void {
    this._socket.off(ServerEventType.ROOM_PLAYER_LEFT, listener);
  }

  public onPlayerJoined(handler: (payload: { roomInfo: RoomInfo }) => void): void {
    this.socket.on(ServerEventType.ROOM_PLAYER_JOINED, handler);
  }
  public offPlayerJoined(listener: (payload: { roomInfo: RoomInfo }) => void): void {
    this._socket.off(ServerEventType.ROOM_PLAYER_LEFT, listener);
  }

  public onPlayerLeft(handler: (payload: { roomInfo: RoomInfo }) => void): void {
    this.socket.on(ServerEventType.ROOM_PLAYER_LEFT, handler);
  }
  public offPlayerLeft(listener: (payload: { roomInfo: RoomInfo }) => void): void {
    this._socket.off(ServerEventType.ROOM_PLAYER_LEFT, listener);
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

  public onSessionConnect(handler: (payload: { userStatus: UserStatus }) => void): void {
    this.socket.on(ServerEventType.SESSION_CONNECT, handler);
  }

  public onSessionPlayerConnected(handler: (payload: { player: Player }) => void): void {
    this.socket.on(ServerEventType.SESSION_PLAYER_CONNECTED, handler);
  }

  public onSessionPlayerDisconnected(handler: (payload: { player: Player }) => void): void {
    this.socket.on(ServerEventType.SESSION_PLAYER_DISCONNECTED, handler);
  }

  public onSessionPlayerExit(handler: (payload: { player: Player }) => void): void {
    this.socket.on(ServerEventType.SESSION_PLAYER_EXIT, handler);
  }

  public onTeamChanged(handler: (payload: { roomInfo: RoomInfo }) => void): void {
    this.socket.on(ServerEventType.TEAM_CHANGED, handler);
  }
  public offTeamChanged(listener: (payload: { roomInfo: RoomInfo }) => void): void {
    this._socket.off(ServerEventType.TEAM_CHANGED, listener);
  }

  public onGameStartTimer(handler: () => void): void {
    this.socket.on(ServerEventType.GAME_START_TIMER, handler);
  }
  public offGameStartTimer(listener: () => void): void {
    this._socket.off(ServerEventType.GAME_START_TIMER, listener);
  }

  public onGameStart(handler: (payload: { gameInfo: GameInfo }) => void): void {
    this.socket.on(ServerEventType.GAME_START, handler);
  }
  public offGameStart(listener: (payload: { gameInfo: GameInfo }) => void): void {
    this._socket.off(ServerEventType.GAME_START, listener);
  }
}

const socketClient = new SocketClient(ServerUrl.DEPLOY_BASE);

export default socketClient;
