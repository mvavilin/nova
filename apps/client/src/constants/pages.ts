export const PAGES = {
  WELCOME: {
    id: 'welcome',
    label: 'Welcome',
    pattern: /^\/$/,
    url: () => '/',
  },
  LOGIN: {
    id: 'login',
    label: 'Login',
    pattern: /^\/login$/,
    url: () => '/login',
  },
  REGISTERATION: {
    id: 'registeration',
    label: 'Registeration',
    pattern: /^\/registeration$/,
    url: () => '/registeration',
  },
  LOBBY: {
    id: 'lobby',
    label: 'Lobby',
    pattern: /^\/lobby$/,
    url: () => '/lobby',
  },
  ROOM: {
    id: 'room',
    label: 'Room',
    pattern: /^\/room\/(?<code>[^/]+)$/,
    url: (code: string) => `/room/${code}`,
  },
  GAME: {
    id: 'game',
    label: 'Game',
    pattern: /^\/game\/(?<code>[^/]+)$/,
    url: (code: string) => `/game/${code}`,
  },
  SOLO_SETUP: {
    id: 'soloSetup',
    label: 'Solo Setup',
    pattern: /^\/solo$/,
    url: () => '/solo',
  },
  SOLO_GAME: {
    id: 'soloGame',
    label: 'Solo Game',
    pattern: /^\/solo\/play$/,
    url: () => '/solo/play',
  },
  RESULTS: {
    id: 'results',
    label: 'Results',
    pattern: /^\/results\/(?<gameId>[^/]+)$/,
    url: (gameId: string) => `/results/${gameId}`,
  },
  PROFILE: {
    id: 'profile',
    label: 'Profile',
    pattern: /^\/profile$/,
    url: () => '/profile',
  },
  NOT_FOUND: {
    id: 'notFound',
    label: '404 Not Found',
    pattern: /.*/,
    url: () => '/404',
  },
} as const;
