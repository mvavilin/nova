export enum Role {
  SPYMASTER = 'spymaster',
  OPERATIVE = 'operative',
}

export enum Team {
  RED = 'red',
  BLUE = 'blue',
}

export const redTeam = {
  title: 'Красная команда',
  team: Team.RED,
  players: [
    {
      id: '1',
      username: 'Алексей',
      avatarUrl: 'https://example.com/avatars/alex.png',
      role: Role.SPYMASTER,
      team: Team.RED,
    },
    {
      id: '2',
      username: 'Мария',
      avatarUrl: 'https://example.com/avatars/maria.png',
      role: Role.OPERATIVE,
      team: Team.RED,
    },
    {
      id: '3',
      username: 'Игорь',
      avatarUrl: 'https://example.com/avatars/igor.png',
      role: Role.OPERATIVE,
      team: Team.RED,
    },
  ],
};

export const blueTeam = {
  title: 'Синяя команда',
  team: Team.BLUE,
  players: [
    {
      id: '4',
      username: 'Екатерина',
      avatarUrl: 'https://example.com/avatars/katya.png',
      role: Role.SPYMASTER,
      team: Team.BLUE,
    },
    {
      id: '5',
      username: 'Дмитрий',
      avatarUrl: 'https://example.com/avatars/dmitry.png',
      role: Role.OPERATIVE,
      team: Team.BLUE,
    },
    {
      id: '6',
      username: 'Ольга',
      avatarUrl: 'https://example.com/avatars/olga.png',
      role: Role.OPERATIVE,
      team: Team.BLUE,
    },
  ],
};
