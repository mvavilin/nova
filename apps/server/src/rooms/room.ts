import type {
  Player,
  RoomInfo,
  RoomPreview,
  RoomSettings,
  RoomStatus,
  Teams,
} from '../../../../packages/shared/src/types/room.ts';
import { v4 as uuid } from 'uuid';

export class Room {
  private id: string;
  private name: string;
  private maxPlayers: number;
  private redPlayers: Player[] = [];
  private bluePlayers: Player[] = [];
  private choosingPlayers: Player[] = [];
  private status: RoomStatus = 'waiting';

  constructor(settings: RoomSettings) {
    const { name, maxPlayers } = settings;

    this.id = uuid();
    this.name = name;
    this.maxPlayers = maxPlayers;
  }

  private getPlayerCount(): number {
    return this.redPlayers.length + this.bluePlayers.length + this.choosingPlayers.length;
  }

  public getRoomPreview(): RoomPreview {
    const { id, name, maxPlayers, status } = this;
    return {
      id,
      name,
      maxPlayers,
      playerCount: this.getPlayerCount(),
      status,
    };
  }

  public getId(): string {
    return this.id;
  }

  public getRoomInfo(): RoomInfo {
    const { id, name, maxPlayers, redPlayers, bluePlayers, choosingPlayers } = this;
    return {
      id,
      name,
      maxPlayers,
      redPlayers,
      bluePlayers,
      choosingPlayers,
      playerCount: this.getPlayerCount(),
    };
  }

  public isFull(): boolean {
    return this.getPlayerCount() >= this.maxPlayers;
  }

  public hasSpymaster(selectedTeam: Teams): boolean {
    const team = selectedTeam === 'red' ? this.redPlayers : this.bluePlayers;

    return team.some((player) => player.role === 'spymaster');
  }

  public hasAllAgents(selectedTeam: Teams): boolean {
    const team = selectedTeam === 'red' ? this.redPlayers : this.bluePlayers;

    const agentCount = team.filter((player) => player.role === 'agent').length;

    return agentCount >= this.maxPlayers / 2 - 1;
  }

  public getPlayerIds(): string[] {
    return this.getAllPlayers().map((player) => player.id);
  }

  public addPlayer(player: Player): void {
    switch (player.team) {
      case 'red': {
        this.redPlayers.push(player);
        break;
      }
      case 'blue': {
        this.bluePlayers.push(player);
        break;
      }
      default: {
        this.choosingPlayers.push(player);
      }
    }
  }

  public getPlayer(userId: string): Player | undefined {
    return this.getAllPlayers().find((player) => player.id === userId);
  }

  private getAllPlayers(): Player[] {
    return [...this.redPlayers, ...this.bluePlayers, ...this.choosingPlayers];
  }

  public removePlayer(userId: string): void {
    this.redPlayers = this.redPlayers.filter((player) => player.id !== userId);
    this.bluePlayers = this.bluePlayers.filter((player) => player.id !== userId);
    this.choosingPlayers = this.choosingPlayers.filter((player) => player.id !== userId);
  }

  public chooseTeam(player: Player): void {
    this.removePlayer(player.id);

    switch (player.team) {
      case 'red': {
        this.redPlayers.push(player);
        break;
      }
      case 'blue': {
        this.bluePlayers.push(player);
        break;
      }
      default: {
        this.choosingPlayers.push(player);
      }
    }
  }

  public isCompletedTeams(): boolean {
    return this.redPlayers.length + this.bluePlayers.length >= this.maxPlayers;
  }

  public getMaxPlayers(): number {
    return this.maxPlayers;
  }
}
