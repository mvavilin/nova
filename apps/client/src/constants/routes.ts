import {
  WelcomePage,
  LoginPage,
  RegisterPage,
  LobbyPage,
  RoomPage,
  GamePage,
  SoloGamePage,
  ResultsPage,
  ProfilePage,
} from '@pages';
import { type Route, Access, AuthorizedSubStatus } from '@types';

const PATHS = {
  HOME: /^\/$/,
  LOGIN: /^\/login$/,
  REGISTER: /^\/register$/,
  LOBBY: /^\/lobby$/,
  ROOM: /^\/room\/(?<code>[^/]+)$/,
  GAME: /^\/game\/(?<code>[^/]+)$/,
  SOLO_PLAY: /^\/solo\/play$/,
  RESULTS: /^\/results\/(?<gameId>[^/]+)$/,
  PROFILE: /^\/profile$/,
} as const;

export const ROUTES: Route[] = [
  { path: PATHS.HOME, page: WelcomePage, access: Access.PUBLIC },
  { path: PATHS.LOGIN, page: LoginPage, access: Access.PUBLIC },
  { path: PATHS.REGISTER, page: RegisterPage, access: Access.PUBLIC },
  {
    path: PATHS.LOBBY,
    page: LobbyPage,
    access: Access.AUTHORIZED,
    allowedSubStatuses: [AuthorizedSubStatus.IN_LOBBY],
  },
  {
    path: PATHS.ROOM,
    page: RoomPage,
    access: Access.AUTHORIZED,
    allowedSubStatuses: [AuthorizedSubStatus.IN_ROOM],
  },
  {
    path: PATHS.GAME,
    page: GamePage,
    access: Access.AUTHORIZED,
    allowedSubStatuses: [AuthorizedSubStatus.IN_GAME],
  },
  {
    path: PATHS.SOLO_PLAY,
    page: SoloGamePage,
    access: Access.AUTHORIZED,
    allowedSubStatuses: [AuthorizedSubStatus.IN_SOLO_GAME],
  },
  {
    path: PATHS.RESULTS,
    page: ResultsPage,
    access: Access.AUTHORIZED,
    allowedSubStatuses: [AuthorizedSubStatus.IN_RESULTS],
  },
  {
    path: PATHS.PROFILE,
    page: ProfilePage,
    access: Access.AUTHORIZED,
    allowedSubStatuses: [AuthorizedSubStatus.IN_PROFILE],
  },
];
