import type { Player, RoomInfo } from '@shared/types/room';

const choosingPlayers: Player[] = [
  {
    id: '555',
    username: 'Ameli',
    team: 'choosing',
    role: 'choosing',
  },
  {
    id: '666',
    username: 'Rino',
    team: 'choosing',
    role: 'choosing',
  },
  {
    id: '777',
    username: 'Sydni',
    team: 'choosing',
    role: 'choosing',
  },
  {
    id: '888',
    username: 'Alex',
    team: 'choosing',
    role: 'choosing',
  },
];

const red: Player[] = [
  {
    id: '111',
    username: 'Aliceeeee',
    team: 'red',
    role: 'spymaster',
  },
  {
    id: '222',
    username: 'Sam',
    team: 'red',
    role: 'agent',
  },
];

const blue: Player[] = [
  {
    id: '333',
    username: 'Nick',
    team: 'blue',
    role: 'agent',
  },
  {
    id: '444',
    username: 'Mila',
    team: 'blue',
    role: 'agent',
  },
];

export const mockCurrentRoom: RoomInfo = {
  id: '111',
  name: 'js-room-123',
  maxPlayers: 8,
  playerCount: 8,
  redPlayers: red,
  bluePlayers: blue,
  choosingPlayers: choosingPlayers,
};
