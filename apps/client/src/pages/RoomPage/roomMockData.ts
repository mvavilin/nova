import type { Player, RoomInfo } from '@shared/types/room';

const choosingPlayers: Player[] = [
  {
    userId: '555',
    username: 'Ameli',
    team: 'choosing',
    role: 'choosing',
  },
  {
    userId: '666',
    username: 'Rino',
    team: 'choosing',
    role: 'choosing',
  },
  {
    userId: '777',
    username: 'Sydni',
    team: 'choosing',
    role: 'choosing',
  },
  {
    userId: '888',
    username: 'Alex',
    team: 'choosing',
    role: 'choosing',
  },
];

const red: Player[] = [
  {
    userId: '111',
    username: 'Aliceeeee',
    team: 'red',
    role: 'spymaster',
  },
  {
    userId: '222',
    username: 'Sam',
    team: 'red',
    role: 'agent',
  },
];

const blue: Player[] = [
  {
    userId: '333',
    username: 'Nick',
    team: 'blue',
    role: 'agent',
  },
  {
    userId: '444',
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
