import { type Card } from '@__mocks__';

export enum CardColor {
  RED = 'bg-red-400 hover:bg-red-500',
  BLUE = 'bg-blue-400 hover:bg-blue-500',
  NEUTRAL = 'bg-orange-300 hover:bg-orange-400',
  BOMB = 'bg-slate-400 hover:bg-slate-500',
  PEACEFUL = 'bg-green-400 hover:bg-green-500',
}

export enum CardStatus {
  HIDDEN = 'hidden',
  REVEALED = 'revealed',
}

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

export const cards: Card[] = [
  {
    id: 'card-0',
    word: 'closure',
    color: CardColor.RED,
    status: CardStatus.HIDDEN,
    position: 0,
    selected: false,
  },
  {
    id: 'card-1',
    word: 'prototype',
    color: CardColor.RED,
    status: CardStatus.HIDDEN,
    position: 1,
    selected: false,
  },
  {
    id: 'card-2',
    word: 'Promise',
    color: CardColor.BLUE,
    status: CardStatus.HIDDEN,
    position: 2,
    selected: false,
  },
  {
    id: 'card-3',
    word: 'async/await',
    color: CardColor.BLUE,
    status: CardStatus.HIDDEN,
    position: 3,
    selected: false,
  },
  {
    id: 'card-4',
    word: 'event loop',
    color: CardColor.RED,
    status: CardStatus.HIDDEN,
    position: 4,
    selected: false,
  },
  {
    id: 'card-5',
    word: 'scope',
    color: CardColor.PEACEFUL,
    status: CardStatus.HIDDEN,
    position: 5,
    selected: false,
  },
  {
    id: 'card-6',
    word: 'callback',
    color: CardColor.RED,
    status: CardStatus.HIDDEN,
    position: 6,
    selected: false,
  },
  {
    id: 'card-7',
    word: 'hoisting',
    color: CardColor.BOMB,
    status: CardStatus.HIDDEN,
    position: 7,
    selected: false,
  },
  {
    id: 'card-8',
    word: 'bind',
    color: CardColor.PEACEFUL,
    status: CardStatus.HIDDEN,
    position: 8,
    selected: false,
  },
  {
    id: 'card-9',
    word: 'module',
    color: CardColor.BLUE,
    status: CardStatus.HIDDEN,
    position: 9,
    selected: false,
  },
  {
    id: 'card-10',
    word: 'import',
    color: CardColor.PEACEFUL,
    status: CardStatus.HIDDEN,
    position: 10,
    selected: false,
  },
  {
    id: 'card-11',
    word: 'export',
    color: CardColor.PEACEFUL,
    status: CardStatus.HIDDEN,
    position: 11,
    selected: false,
  },
  {
    id: 'card-12',
    word: 'generator',
    color: CardColor.BLUE,
    status: CardStatus.HIDDEN,
    position: 12,
    selected: false,
  },
  {
    id: 'card-13',
    word: 'iterator',
    color: CardColor.RED,
    status: CardStatus.HIDDEN,
    position: 13,
    selected: false,
  },
  {
    id: 'card-14',
    word: 'class',
    color: CardColor.BLUE,
    status: CardStatus.HIDDEN,
    position: 14,
    selected: false,
  },
  {
    id: 'card-15',
    word: 'object',
    color: CardColor.PEACEFUL,
    status: CardStatus.HIDDEN,
    position: 15,
    selected: false,
  },
  {
    id: 'card-16',
    word: 'array',
    color: CardColor.BLUE,
    status: CardStatus.HIDDEN,
    position: 16,
    selected: false,
  },
  {
    id: 'card-17',
    word: 'map',
    color: CardColor.PEACEFUL,
    status: CardStatus.HIDDEN,
    position: 17,
    selected: false,
  },
  {
    id: 'card-18',
    word: 'set',
    color: CardColor.RED,
    status: CardStatus.HIDDEN,
    position: 18,
    selected: false,
  },
  {
    id: 'card-19',
    word: 'weakmap',
    color: CardColor.PEACEFUL,
    status: CardStatus.HIDDEN,
    position: 19,
    selected: false,
  },
  {
    id: 'card-20',
    word: 'promise.all',
    color: CardColor.RED,
    status: CardStatus.HIDDEN,
    position: 20,
    selected: false,
  },
  {
    id: 'card-21',
    word: 'fetch',
    color: CardColor.RED,
    status: CardStatus.HIDDEN,
    position: 21,
    selected: false,
  },
  {
    id: 'card-22',
    word: 'event emitter',
    color: CardColor.BLUE,
    status: CardStatus.HIDDEN,
    position: 22,
    selected: false,
  },
  {
    id: 'card-23',
    word: 'node',
    color: CardColor.RED,
    status: CardStatus.HIDDEN,
    position: 23,
    selected: false,
  },
  {
    id: 'card-24',
    word: 'webpack',
    color: CardColor.BLUE,
    status: CardStatus.HIDDEN,
    position: 24,
    selected: false,
  },
];

import type { GameResultsModalProperties } from '@pages/GamePage/components/modals/GameResultsModal/GameResultsModal';

export const gameResults: GameResultsModalProperties = {
  winningTeam: Team.RED,
  gameId: 'game_12345',
  score: '5:3',
  time: '12:34',

  redTeamPlayers: [
    {
      player: {
        avatarUrl: '/avatars/red1.png',
        role: Role.SPYMASTER,
        team: Team.RED,
        id: 'u1',
        username: 'Red Player 1',
      },
      questionCount: 10,
      correctAnswersCount: 7,
    },
    {
      player: {
        avatarUrl: '/avatars/red2.png',
        role: Role.OPERATIVE,
        team: Team.RED,
        id: 'u2',
        username: 'Red Player 2',
      },
      questionCount: 8,
      correctAnswersCount: 5,
    },
  ],

  blueTeamPlayers: [
    {
      player: {
        avatarUrl: '/avatars/blue1.png',
        role: Role.SPYMASTER,
        team: Team.BLUE,
        id: 'u3',
        username: 'Blue Player 1',
      },
      questionCount: 9,
      correctAnswersCount: 4,
    },
    {
      player: {
        avatarUrl: '/avatars/blue2.png',
        role: Role.OPERATIVE,
        team: Team.BLUE,
        id: 'u4',
        username: 'Blue Player 2',
      },
      questionCount: 7,
      correctAnswersCount: 3,
    },
  ],
};
