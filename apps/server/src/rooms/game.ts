import type { GameInfo } from '../../../../packages/shared/src/types/game.ts';
import type { Player } from '../../../../packages/shared/src/types/room.ts';

export class Game {
  private roomId: string;
  private redTeam: Player[] = [];
  private blueTeam: Player[] = [];
  private maxPlayers: number;

  constructor(roomId: string, maxPlayers: number) {
    this.roomId = roomId;
    this.maxPlayers = maxPlayers;
  }

  public addPlayer(player: Player): void {
    if (player.team === 'red') this.redTeam.push(player);
    if (player.team === 'blue') this.blueTeam.push(player);
  }

  public getRoomId(): string {
    return this.roomId;
  }

  public isFull(): boolean {
    return this.redTeam.length + this.blueTeam.length >= this.maxPlayers;
  }

  public getGameInfo(): GameInfo {
    return {
      redTeam: this.redTeam,
      blueTeam: this.blueTeam,
      currentTeam: 'red',
    };
  }

  public getSpymasterIds(): string[] {
    return this.getAllPlayers()
      .filter((player) => player.role === 'spymaster')
      .map((player) => player.id);
  }

  public getAgentIds(): string[] {
    return this.getAllPlayers()
      .filter((player) => player.role === 'agent')
      .map((player) => player.id);
  }

  private getAllPlayers(): Player[] {
    return [...this.redTeam, ...this.blueTeam];
  }

  public getPlayerIds(): string[] {
    return this.getAllPlayers().map((player) => player.id);
  }

  public getPlayer(userId: string): Player | undefined {
    return this.getAllPlayers().find((player) => player.id === userId);
  }

  public removePlayer(userId: string): void {
    this.redTeam = this.redTeam.filter((player) => player.id !== userId);
    this.blueTeam = this.blueTeam.filter((player) => player.id !== userId);
  }
}
