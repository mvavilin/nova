import { type User } from '@repo/shared/src/types/user';
import { type RoomPreview } from '@types';
import { Role, Team } from '@__mocks__/constants';

export {
  redTeam,
  blueTeam,
  cards,
  gameResults,
  CardColor,
  CardStatus,
  Role,
  Team,
} from '@__mocks__/constants';
export type { GameResultData, Card } from '@__mocks__/types';

export const initialRooms: RoomPreview[] = [
  { id: '1', name: 'js-masters', playerCount: 3, maxPlayers: 4, status: 'waiting' },
  { id: '2', name: 'python-pro', playerCount: 2, maxPlayers: 4, status: 'waiting' },
  { id: '3', name: 'fronted-legends', playerCount: 4, maxPlayers: 4, status: 'playing' },
  { id: '4', name: 'backend-warriors', playerCount: 1, maxPlayers: 4, status: 'waiting' },
];

export type Player = {
  avatarUrl: string;
  role: Role;
  team: Team;
} & Partial<User>;
