import { WelcomePage, RegistrationPage, LobbyPage, RoomPage, GamePage } from '@pages';
import { Access, type Route } from '@api/RouterAPI/router.types';
import LoginPage from '@/pages/LoginPage/LoginPage';

export const URLS = {
  WELCOME: (): string => '/',
  LOGIN: (): string => '/login',
  REGISTRATION: (): string => '/registration',
  LOBBY: (): string => '/lobby',
  ROOM: (roomId: string): string => `/room/${roomId}`,
  GAME: (gameId: string): string => `/game/${gameId}`,
  SOLO_GAME: (): string => '/solo/play',
  RESULTS: (gameId: string): string => `/results/${gameId}`,
  PROFILE: (): string => '/profile',
} as const;

export const ROUTES: Route[] = [
  { path: /^\/$/, page: WelcomePage, access: Access.PUBLIC },
  { path: /^\/registration$/, page: RegistrationPage, access: Access.UNAUTHORIZED },
  { path: /^\/login$/, page: LoginPage, access: Access.UNAUTHORIZED },
  // { path: /^\/lobby$/, page: LobbyPage, access: Access.PUBLIC },
  { path: /^\/lobby$/, page: LobbyPage, access: Access.AUTHORIZED },
  { path: /^\/room\/(?<roomId>[^/]+)$/, page: RoomPage, access: Access.AUTHORIZED },
  { path: /^\/game\/(?<gameId>[^/]+)$/, page: GamePage, access: Access.AUTHORIZED },
];
