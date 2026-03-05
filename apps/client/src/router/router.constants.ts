import {
  LoginPage,
  LobbyPage,
  RoomPage,
  GamePage,
  SoloSetupPage,
  SoloGamePage,
  ResultsPage,
  ProfilePage,
} from '@pages';
import { SubStatus } from '@types';
import { type Route } from '@router/router.types';
import { Access } from '@router/router.enums';
import RegistrationPage from '@pages/RegistrationPage/RegistrationPage';
import WelcomePage from '@pages/WelcomePage/WelcomePage';

export const PATHS = {
  HOME: {
    pattern: /^\/$/,
    url: () => '/',
  },
  LOGIN: {
    pattern: /^\/login$/,
    url: () => '/login',
  },
  REGISTER: {
    pattern: /^\/registeration$/,
    url: () => '/registeration',
  },
  LOBBY: {
    pattern: /^\/lobby$/,
    url: () => '/lobby',
  },
  ROOM: {
    pattern: /^\/room\/(?<code>[^/]+)$/,
    url: (code: string) => `/room/${code}`,
  },
  GAME: {
    pattern: /^\/game\/(?<code>[^/]+)$/,
    url: (code: string) => `/game/${code}`,
  },
  SOLO_SETUP: {
    pattern: /^\/solo$/,
    url: () => '/solo',
  },
  SOLO_PLAY: {
    pattern: /^\/solo\/play$/,
    url: () => '/solo/play',
  },
  RESULTS: {
    pattern: /^\/results\/(?<gameId>[^/]+)$/,
    url: (gameId: string) => `/results/${gameId}`,
  },
  PROFILE: {
    pattern: /^\/profile$/,
    url: () => '/profile',
  },
} as const;

export const ROUTES: Route[] = [
  { path: PATHS.HOME.pattern, page: WelcomePage, access: Access.PUBLIC },
  { path: PATHS.LOGIN.pattern, page: LoginPage, access: Access.UNAUTHORIZED },
  { path: PATHS.REGISTER.pattern, page: RegistrationPage, access: Access.UNAUTHORIZED },
  {
    path: PATHS.LOBBY.pattern,
    page: LobbyPage,
    access: Access.AUTHORIZED,
    allowedSubStatuses: [SubStatus.IN_LOBBY, SubStatus.IN_PROFILE],
  },
  {
    path: PATHS.ROOM.pattern,
    page: RoomPage,
    access: Access.AUTHORIZED,
    allowedSubStatuses: [SubStatus.IN_ROOM],
  },
  {
    path: PATHS.GAME.pattern,
    page: GamePage,
    access: Access.AUTHORIZED,
    allowedSubStatuses: [SubStatus.IN_GAME],
  },
  {
    path: PATHS.SOLO_SETUP.pattern,
    page: SoloSetupPage,
    access: Access.AUTHORIZED,
    allowedSubStatuses: [SubStatus.IN_SOLO_SETUP],
  },
  {
    path: PATHS.SOLO_PLAY.pattern,
    page: SoloGamePage,
    access: Access.AUTHORIZED,
    allowedSubStatuses: [SubStatus.IN_SOLO_GAME],
  },
  {
    path: PATHS.RESULTS.pattern,
    page: ResultsPage,
    access: Access.AUTHORIZED,
    allowedSubStatuses: [SubStatus.IN_RESULTS],
  },
  {
    path: PATHS.PROFILE.pattern,
    page: ProfilePage,
    access: Access.AUTHORIZED,
    allowedSubStatuses: [SubStatus.IN_PROFILE, SubStatus.IN_LOBBY],
  },
];
