import type {
  Player,
  RoomPreview,
  RoomSettings,
} from '../../../../packages/shared/src/types/room.ts';
import { Room } from './room.ts';

export class RoomManager {
  private lobby: Player[] = [];
  private rooms: Room[] = [];

  public addPlayerToLobby(userId: string, username: string): void {
    const player = this.lobby.find((item) => item.userId === userId);
    if (!player) {
      this.lobby.push({ userId, username });
    }
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

  public getRoomPreviews(): { payload: RoomPreview[] } {
    const roomPreviews = this.rooms.map((room) => room.getRoomPreview());
    return { payload: roomPreviews };
  }
}
