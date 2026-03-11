import type { ErrorCode } from '../../../../packages/shared/src/socketEvents.ts';
import type {
  Player,
  RoomPreview,
  RoomSettings,
} from '../../../../packages/shared/src/types/room.ts';
import { Room } from './room.ts';

export class RoomManager {
  private lobby: Player[] = [];
  private rooms: Room[] = [];

  public addPlayerToLobby(newPlayer: Player): void {
    const player = this.lobby.find((item) => item.userId === newPlayer.userId);
    if (!player) {
      this.lobby.push(newPlayer);
    }
  }

  public removePlayerFromLobby(userId: string): void {
    this.lobby = this.lobby.filter((player) => player.userId !== userId);
  }

  public createRoom(settings: RoomSettings): {
    payload: RoomPreview;
    recipients: string[];
  } {
    const room = new Room(settings);
    this.rooms.push(room);

    const roomPreview = room.getRoomPreview();
    const recipients = this.lobby.map((player) => player.userId);
    return { payload: roomPreview, recipients };
  }

  public getRoomPreviews(name?: string): { payload: RoomPreview[] } {
    let roomPreviews = this.rooms.map((room) => room.getRoomPreview());
    if (name) {
      const regExp = new RegExp(name, 'i');
      roomPreviews = roomPreviews.filter((preview) => regExp.test(preview.name));
    }
    return { payload: roomPreviews };
  }

  public joinToRoom(
    userId: string,
    roomId: string
  ):
    | { payload: Room; player: Player; lobbyRecipients: string[]; roomRecipients: string[] }
    | { error: ErrorCode } {
    const room = this.rooms.find((room) => room.getId() === roomId);
    if (!room) return { error: 'ROOM_NOT_FOUND' };

    if (room.isFull()) return { error: 'ROOM_FULL' };

    const newPlayer = this.lobby.find((player) => player.userId === userId);
    if (newPlayer) {
      const roomRecipients = room.getPlayerIds();
      room.addPlayer(newPlayer);
      this.removePlayerFromLobby(userId);
      const lobbyRecipients = this.lobby.map((player) => player.userId);

      return { payload: room, player: newPlayer, lobbyRecipients, roomRecipients };
    }

    return { error: 'INVALID_ACTION' };
  }

  public leaveRoom(userId: string):
    | {
        payload: RoomPreview;
        player: Player;
        lobbyRecipients: string[];
        roomRecipients: string[];
      }
    | { error: ErrorCode } {
    const room = this.rooms.find((room) => room.getPlayerIds().includes(userId));

    if (room) {
      const player = room.getPlayer(userId);
      if (player) {
        this.addPlayerToLobby(player);
        room.removePlayer(userId);
        const roomRecipients = room.getPlayerIds();
        const lobbyRecipients = this.lobby.map((player) => player.userId);

        return { payload: room.getRoomPreview(), player, lobbyRecipients, roomRecipients };
      }
    }

    return { error: 'ROOM_NOT_FOUND' };
  }
}
