import type { Player, Teams } from './room.ts';

export interface GameInfo {
  redTeam: Player[];
  blueTeam: Player[];
  currentTeam: Teams;
}
