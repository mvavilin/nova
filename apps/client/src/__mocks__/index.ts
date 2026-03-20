import { type User } from '@repo/shared/src/types/user';
import { type RoomPreview } from '@types';
import { Role, Team } from '@__mocks__/constants';

export { Role, Team } from '@__mocks__/constants';

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

export { redTeam, blueTeam } from '@__mocks__/constants';
