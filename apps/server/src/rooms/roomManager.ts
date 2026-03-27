import type { ErrorCode, UserStatus } from '../../../../packages/shared/src/socketEvents.ts';
import type { ProfileInfo } from '../../../../packages/shared/src/types/profile.ts';
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
  private profiles: Player[] = [];

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

  public getLobbyIds(): string[] {
    return this.lobby.map((player) => player.id);
  }

  private getPlayerFromLobby(userId: string): Player | undefined {
    return this.lobby.find((player) => player.id === userId);
  }

  private getPlayerFromProfile(userId: string): Player | undefined {
    return this.profiles.find((player) => player.id === userId);
  }

  private removePlayerFromProfile(userId: string): void {
    this.profiles = this.profiles.filter((player) => player.id !== userId);
  }

  public getProfileIds(): string[] {
    return this.profiles.map((player) => player.id);
  }

  public createRoom(
    userId: string,
    settings: RoomSettings
  ):
    | {
        roomPreview: RoomPreview;
        roomInfo: RoomInfo;
        lobbyRecipients: string[];
      }
    | { error: ErrorCode } {
    const room = new Room(settings);
    this.rooms.push(room);

    const player = this.getPlayerFromLobby(userId);
    if (player) {
      room.addPlayer(player);
      this.removePlayerFromLobby(userId);

      const roomPreview = room.getRoomPreview();
      const roomInfo = room.getRoomInfo();
      const lobbyRecipients = this.lobby.map((player) => player.id);
      return { roomPreview, roomInfo, lobbyRecipients };
    }

    return { error: 'PLAYER_NOT_FOUND' };
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

  public getGameByUserId(userId: string): Game | undefined {
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
        player.team = 'choosing';
        player.role = 'choosing';
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

    const playerInProfile = this.getPlayerFromProfile(userId);
    if (playerInProfile) {
      return { userStatus: 'IN_PROFILE', player: playerInProfile, recipients: [] };
    }

    const playerInLobby =
      this.getPlayerFromLobby(userId) ||
      this.addPlayerToLobby({ id: userId, username, team: 'choosing', role: 'choosing' });
    return { userStatus: 'IN_LOBBY', player: playerInLobby, recipients: [] };
  }

  public getRoomInfo(userId: string): RoomInfo | undefined {
    const room = this.rooms.find((room) => room.getPlayerIds().includes(userId));
    if (room) return room.getRoomInfo();
    return;
  }

  public chooseTeam(player: Player): { room: Room; recipients: string[] } | { error: ErrorCode } {
    const room = this.getRoomByUserId(player.id);

    if (room) {
      if (player.role === 'spymaster' && room.hasSpymaster(player.team)) {
        return { error: 'THERE_IS_ALREADY_SPYMASTER' };
      }
      if (player.role === 'agent' && room.hasAllAgents(player.team)) {
        return { error: 'THERE_ARE_ALREADY_AGENTS' };
      }

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

  public addPlayerToGame(userId: string): { game: Game } | { error: ErrorCode } {
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
          game.initial();
          return { game };
        } else {
          return { error: 'GAME_IS_NOT_FULL' };
        }
      }
    }

    return { error: 'ROOM_NOT_FOUND' };
  }

  public addPlayerToProfile(userId: string): { profileInfo: ProfileInfo } | { error: ErrorCode } {
    const player = this.getPlayerFromLobby(userId);

    if (player) {
      this.removePlayerFromLobby(userId);
      this.profiles.push(player);
      return { profileInfo: { id: '' } };
    }

    return { error: 'PLAYER_NOT_FOUND' };
  }

  public leaveProfile(userId: string): { roomPreviews: RoomPreview[] } | { error: ErrorCode } {
    const player = this.getPlayerFromProfile(userId);

    if (player) {
      this.removePlayerFromProfile(userId);
      this.addPlayerToLobby(player);
      return { roomPreviews: this.getRoomPreviews() };
    }

    return { error: 'PLAYER_NOT_FOUND' };
  }

  public getProfileInfo(userId: string): { profileInfo: ProfileInfo } | { error: ErrorCode } {
    const player = this.getPlayerFromProfile(userId);

    if (player) {
      return { profileInfo: { id: '' } };
    }

    return { error: 'PLAYER_NOT_FOUND' };
  }
}
