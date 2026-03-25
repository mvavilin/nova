import type { ErrorCode, UserStatus } from '../../../../packages/shared/src/socketEvents.ts';
import type { GameInfo } from '../../../../packages/shared/src/types/game.ts';
import type {
  Player,
  RoomInfo,
  RoomPreview,
  RoomSettings,
} from '../../../../packages/shared/src/types/room.ts';
import { Game } from './game.ts';
import { Room } from './room.ts';

export class RoomManager {
  private lobby: Player[] = [];
  private rooms: Room[] = [];
  private games: Game[] = [];

  public addPlayerToLobby(newPlayer: Player): Player {
    const player = this.lobby.find((item) => item.id === newPlayer.id);
    if (!player) {
      this.lobby.push(newPlayer);
      return newPlayer;
    }

    return player;
  }

  public removePlayerFromLobby(userId: string): void {
    this.lobby = this.lobby.filter((player) => player.id !== userId);
  }

  private getLobbyIds(): string[] {
    return this.lobby.map((player) => player.id);
  }

  private getPlayer(userId: string): Player | undefined {
    return this.lobby.find((player) => player.id === userId);
  }

  public createRoom(settings: RoomSettings): {
    payload: RoomPreview;
    recipients: string[];
  } {
    const room = new Room(settings);
    this.rooms.push(room);

    const roomPreview = room.getRoomPreview();
    const recipients = this.lobby.map((player) => player.id);
    return { payload: roomPreview, recipients };
  }

  public getRoomPreviews(name?: string): RoomPreview[] {
    let roomPreviews = this.rooms.map((room) => room.getRoomPreview());
    if (name) {
      const regExp = new RegExp(name, 'i');
      roomPreviews = roomPreviews.filter((preview) => regExp.test(preview.name));
    }
    return roomPreviews;
  }

  private getRoomById(roomId: string): Room | undefined {
    return this.rooms.find((room) => room.getId() === roomId);
  }

  private getRoomByUserId(userId: string): Room | undefined {
    return this.rooms.find((room) => room.getPlayerIds().includes(userId));
  }

  private getGameByUserId(userId: string): Game | undefined {
    return this.games.find((game) => game.getPlayerIds().includes(userId));
  }

  public joinToRoom(
    userId: string,
    roomId: string
  ):
    | {
        roomInfo: RoomInfo;
        roomPreview: RoomPreview;
        lobbyRecipients: string[];
        roomRecipients: string[];
      }
    | { error: ErrorCode } {
    const room = this.rooms.find((room) => room.getId() === roomId);
    if (!room) return { error: 'ROOM_NOT_FOUND' };

    if (room.isFull()) return { error: 'ROOM_FULL' };

    const newPlayer = this.lobby.find((player) => player.id === userId);
    if (newPlayer) {
      const roomRecipients = room.getPlayerIds();
      room.addPlayer(newPlayer);
      this.removePlayerFromLobby(userId);
      const lobbyRecipients = this.getLobbyIds();

      return {
        roomInfo: room.getRoomInfo(),
        roomPreview: room.getRoomPreview(),
        lobbyRecipients,
        roomRecipients,
      };
    }

    return { error: 'INVALID_ACTION' };
  }

  public leaveRoom(userId: string):
    | {
        roomPreviews: RoomPreview[];
        roomPreview: RoomPreview;
        roomInfo: RoomInfo;
        lobbyRecipients: string[];
        roomRecipients: string[];
      }
    | { error: ErrorCode } {
    const room = this.getRoomByUserId(userId);

    if (room) {
      const player = room.getPlayer(userId);
      if (player) {
        this.addPlayerToLobby(player);
        room.removePlayer(userId);
        const roomRecipients = room.getPlayerIds();
        const lobbyRecipients = this.getLobbyIds();

        return {
          roomPreviews: this.getRoomPreviews(),
          roomPreview: room.getRoomPreview(),
          roomInfo: room.getRoomInfo(),
          lobbyRecipients,
          roomRecipients,
        };
      }
    }

    return { error: 'ROOM_NOT_FOUND' };
  }

  public leaveGame(userId: string):
    | {
        roomInfo: RoomInfo;
        player: Player;
        roomRecipients: string[];
        gameRecipients: string[];
      }
    | { error: ErrorCode } {
    const game = this.getGameByUserId(userId);

    if (game) {
      const player = game.getPlayer(userId);
      const room = this.getRoomById(game.getRoomId());
      if (player && room) {
        room.addPlayer(player);
        game.removePlayer(userId);
        const gameRecipients = game.getPlayerIds();
        const roomRecipients = room.getPlayerIds();

        return {
          roomInfo: room.getRoomInfo(),
          player,
          roomRecipients,
          gameRecipients,
        };
      }
    }

    return { error: 'GAME_NOT_FOUND' };
  }

  public getStatus(
    userId: string,
    username: string
  ): {
    userStatus: UserStatus;
    player: Player;
    recipients: string[];
  } {
    for (const game of this.games) {
      if (game.getPlayerIds().includes(userId)) {
        const player = game.getPlayer(userId);
        const recipients = game.getPlayerIds().filter((item) => item !== userId);
        if (player) {
          return { userStatus: 'IN_GAME', player, recipients };
        }
      }
    }

    for (const room of this.rooms) {
      if (room.getPlayerIds().includes(userId)) {
        const player = room.getPlayer(userId);
        const recipients = room.getPlayerIds().filter((item) => item !== userId);
        if (player) {
          return { userStatus: 'IN_ROOM', player, recipients };
        }
      }
    }

    const player =
      this.getPlayer(userId) ||
      this.addPlayerToLobby({ id: userId, username, team: 'choosing', role: 'choosing' });
    return { userStatus: 'IN_LOBBY', player, recipients: [] };
  }

  public getRoomInfo(userId: string): RoomInfo | undefined {
    const room = this.rooms.find((room) => room.getPlayerIds().includes(userId));
    if (room) return room.getRoomInfo();
    return;
  }

  public chooseTeam(player: Player): { room: Room; recipients: string[] } | { error: ErrorCode } {
    const room = this.getRoomByUserId(player.id);

    if (room) {
      room.chooseTeam(player);
      const recipients = room.getPlayerIds();
      return { room, recipients };
    }

    return { error: 'ROOM_NOT_FOUND' };
  }

  private getGameByRoomId(roomId: string): Game | undefined {
    return this.games.find((game) => game.getRoomId() === roomId);
  }

  private createGame(roomId: string, maxPlayers: number): Game {
    const game = new Game(roomId, maxPlayers);
    this.games.push(game);
    return game;
  }

  public addPlayerToGame(
    userId: string
  ):
    | { gameInfo: GameInfo; cutGameInfo: GameInfo; spymasterIds: string[]; agentIds: string[] }
    | { error: ErrorCode } {
    const room = this.getRoomByUserId(userId);

    if (room) {
      const roomId = room.getId();
      const maxPlayers = room.getMaxPlayers();
      const game = this.getGameByRoomId(roomId) || this.createGame(roomId, maxPlayers);
      const player = room.getPlayer(userId);
      if (player) {
        game.addPlayer(player);
        room.removePlayer(player.id);
        if (game.isFull()) {
          const gameInfo = game.getGameInfo();
          const cutGameInfo = game.getGameInfo();
          const spymasterIds = game.getSpymasterIds();
          const agentIds = game.getAgentIds();
          return { gameInfo, cutGameInfo, spymasterIds, agentIds };
        } else {
          return { error: 'GAME_IS_NOT_FULL' };
        }
      }
    }

    return { error: 'ROOM_NOT_FOUND' };
  }
}
