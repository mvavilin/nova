import { type RoomPreview } from '@types';

export const initialRooms: RoomPreview[] = [
  { id: '1', name: 'js-masters', playerCount: 3, maxPlayers: 4, status: 'waiting' },
  { id: '2', name: 'python-pro', playerCount: 2, maxPlayers: 4, status: 'waiting' },
  { id: '3', name: 'fronted-legends', playerCount: 4, maxPlayers: 4, status: 'playing' },
  { id: '4', name: 'backend-warriors', playerCount: 1, maxPlayers: 4, status: 'waiting' },
];
