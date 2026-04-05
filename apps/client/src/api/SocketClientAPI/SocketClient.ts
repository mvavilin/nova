import type { Player, RoomInfo, RoomPreview, Teams } from '@repo/shared/src/types/room';
import type { CardColor, GameStateForClient, Score } from '@repo/shared/src/types/game';
import type { GameInfo, GameEndInfo } from '@shared/types/game';
import type { ProfileInfo } from '@shared/types/profile';
import { ServerEventType, type ErrorCode, type UserStatus } from '@repo/shared/src/socketEvents';
import { ServerUrl } from '@repo/shared/src/api.constants';
import { BaseSocketClient } from '@SocketClientAPI';
import { SOCKET_ERROR_MESSAGES } from '@SocketClientAPI/socket.constants';
import { showErrorToast } from '@utils';
import type { CheckQuestion } from '@repo/shared/src/types/question';

class SocketClient extends BaseSocketClient {
  constructor(serverUrl: string) {
    super(serverUrl);
  }

  // Session events
  public onSessionToken(handler: (payload: { sessionToken: string }) => void): void {
    this.socket.on(ServerEventType.SESSION_TOKEN, handler);
  }

  public onSessionConnect(
    handler: (payload: { userStatus: UserStatus; userId: string; username: string }) => void
  ): void {
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

  public onSessionSendStatus(
    handler: (payload: { userStatus: UserStatus; userId: string; username: string }) => void
  ): void {
    this.socket.on(ServerEventType.SESSION_SEND_STATUS, handler);
  }

  // Room events
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
    this._socket.off(ServerEventType.ROOM_STATE, listener);
  }

  public onRoomList(handler: (payload: { roomPreviews: RoomPreview[] }) => void): void {
    this.socket.on(ServerEventType.ROOM_SEND_LIST, handler);
  }

  public onPlayerJoined(handler: (payload: { roomInfo: RoomInfo }) => void): void {
    this.socket.on(ServerEventType.ROOM_PLAYER_JOINED, handler);
  }

  public offPlayerJoined(listener: (payload: { roomInfo: RoomInfo }) => void): void {
    this._socket.off(ServerEventType.ROOM_PLAYER_JOINED, listener);
  }

  public onPlayerLeft(handler: (payload: { roomInfo: RoomInfo }) => void): void {
    this.socket.on(ServerEventType.ROOM_PLAYER_LEFT, handler);
  }

  public offPlayerLeft(listener: (payload: { roomInfo: RoomInfo }) => void): void {
    this._socket.off(ServerEventType.ROOM_PLAYER_LEFT, listener);
  }

  // Team events
  public onTeamChanged(handler: (payload: { roomInfo: RoomInfo }) => void): void {
    this.socket.on(ServerEventType.TEAM_CHANGED, handler);
  }

  public offTeamChanged(listener: (payload: { roomInfo: RoomInfo }) => void): void {
    this._socket.off(ServerEventType.TEAM_CHANGED, listener);
  }

  // Game events
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

  public onGameAskClue(handler: () => void): void {
    this.socket.on(ServerEventType.GAME_ASK_CLUE, handler);
  }

  public onGameClueTimeout(handler: () => void): void {
    this.socket.on(ServerEventType.GAME_CLUE_TIMEOUT, handler);
  }

  public onGameTurnChanged(handler: (payload: { team: Teams }) => void): void {
    this.socket.on(ServerEventType.GAME_TURN_CHANGED, handler);
  }

  public onGameClueGiven(handler: (payload: { clue: string }) => void): void {
    this.socket.on(ServerEventType.GAME_CLUE_GIVEN, handler);
  }

  public onGameCardChosen(handler: (payload: { cardId: string; players: Player[] }) => void): void {
    this.socket.on(ServerEventType.GAME_CARD_CHOSEN, handler);
  }

  public onGameCardShown(handler: (payload: { cardId: string; color: CardColor }) => void): void {
    this.socket.on(ServerEventType.GAME_CARD_SHOWN, handler);
  }

  public onGameAskAnswer(
    handler: (payload: {
      word: string;
      question: string;
      question_en: string;
      answer: boolean;
    }) => void
  ): void {
    this.socket.on(ServerEventType.GAME_ASK_ANSWER, handler);
  }

  public onGameAnswerTimeout(handler: () => void): void {
    this.socket.on(ServerEventType.GAME_ANSWER_TIMEOUT, handler);
  }

  public onGameAskCheck(
    handler: (payload: { answer: string; checkQuestion: CheckQuestion; check: boolean }) => void
  ): void {
    this.socket.on(ServerEventType.GAME_ASK_CHECK, handler);
  }

  public onGameCheckResults(handler: (payload: { correct: boolean }) => void): void {
    this.socket.on(ServerEventType.GAME_CHECK_RESULTS, handler);
  }

  public onGameCheckTimeout(handler: () => void): void {
    this.socket.on(ServerEventType.GAME_CHECK_TIMEOUT, handler);
  }

  public onGameSendScore(handler: (payload: { score: Score }) => void): void {
    this.socket.on(ServerEventType.GAME_SEND_SCORE, handler);
  }

  public onGameGameEnd(handler: (payload: { gameEndInfo: GameEndInfo }) => void): void {
    this.socket.on(ServerEventType.GAME_GAME_END, handler);
  }

  public onGameState(handler: (payload: { gameState: GameStateForClient }) => void): void {
    this.socket.on(ServerEventType.GAME_STATE, handler);
  }

  // Profile events
  public onProfileEntered(handler: (payload: { profileInfo: ProfileInfo }) => void): void {
    this.socket.on(ServerEventType.PROFILE_ENTERED, handler);
  }

  public onProfileLeft(handler: (payload: { roomPreviews: RoomPreview[] }) => void): void {
    this.socket.on(ServerEventType.PROFILE_LEFT, handler);
  }

  // Error events
  public onError(handler: (payload: { code: ErrorCode }) => void): void {
    try {
      this.socket.on(ServerEventType.ERROR, handler);
    } catch (error) {
      showErrorToast(error, SOCKET_ERROR_MESSAGES.ON_ERROR);
    }
  }

  public onConnectError(handler: (error: Error) => void): void {
    this.socket.on(ServerEventType.CONNECT_ERROR, handler);
  }

  public onConnect(handler: () => void): void {
    this.socket.on(ServerEventType.CONNECT, handler);
  }
}

const socketClient = new SocketClient(ServerUrl.DEPLOY_BASE);
export default socketClient;
