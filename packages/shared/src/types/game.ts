import type { Player, Teams } from './room.ts';

export interface GameInfo {
  id: string;
  redTeam: Player[];
  blueTeam: Player[];
  currentTeam: Teams;
}
