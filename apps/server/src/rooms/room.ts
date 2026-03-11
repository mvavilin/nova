import type {
  Player,
  RoomInfo,
  RoomPreview,
  RoomSettings,
  RoomStatus,
} from '../../../../packages/shared/src/types/room.ts';
import { v4 as uuid } from 'uuid';

export class Room {
  private id: string;
  private name: string;
  private maxPlayers: number;
  private players: Player[] = [];
  private status: RoomStatus = 'waiting';

  constructor(settings: RoomSettings) {
    const { name, maxPlayers } = settings;

    this.id = uuid();
    this.name = name;
    this.maxPlayers = maxPlayers;
  }

  public getRoomPreview(): RoomPreview {
    const { id, name, maxPlayers, status } = this;
    return {
      id,
      name,
      maxPlayers,
      playerCount: this.players.length,
      status,
    };
  }

  public getId(): string {
    return this.id;
  }

  public getRoomInfo(): RoomInfo {
    const { id, name, maxPlayers } = this;
    return { id, name, maxPlayers, players: this.players };
  }

  public isFull(): boolean {
    return this.players.length >= this.maxPlayers;
  }

  public getPlayerIds(): string[] {
    return this.players.map((player) => player.userId);
  }

  public addPlayer(player: Player): void {
    this.players.push(player);
  }

  public getPlayer(userId: string): Player | undefined {
    return this.players.find((player) => player.userId === userId);
  }

  public removePlayer(userId: string): void {
    this.players = this.players.filter((player) => player.userId !== userId);
  }
}
