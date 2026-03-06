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
import { PAGES } from '@constants';

export const ROUTES: Route[] = [
  { path: PAGES.WELCOME.pattern, page: WelcomePage, access: Access.PUBLIC },
  { path: PAGES.LOGIN.pattern, page: LoginPage, access: Access.UNAUTHORIZED },
  { path: PAGES.REGISTRATION.pattern, page: RegistrationPage, access: Access.UNAUTHORIZED },
  {
    path: PAGES.LOBBY.pattern,
    page: LobbyPage,
    access: Access.AUTHORIZED,
    allowedSubStatuses: [SubStatus.IN_LOBBY, SubStatus.IN_PROFILE],
  },
  {
    path: PAGES.ROOM.pattern,
    page: RoomPage,
    access: Access.AUTHORIZED,
    allowedSubStatuses: [SubStatus.IN_ROOM],
  },
  {
    path: PAGES.GAME.pattern,
    page: GamePage,
    access: Access.AUTHORIZED,
    allowedSubStatuses: [SubStatus.IN_GAME],
  },
  {
    path: PAGES.SOLO_SETUP.pattern,
    page: SoloSetupPage,
    access: Access.AUTHORIZED,
    allowedSubStatuses: [SubStatus.IN_SOLO_SETUP],
  },
  {
    path: PAGES.SOLO_GAME.pattern,
    page: SoloGamePage,
    access: Access.AUTHORIZED,
    allowedSubStatuses: [SubStatus.IN_SOLO_GAME],
  },
  {
    path: PAGES.RESULTS.pattern,
    page: ResultsPage,
    access: Access.AUTHORIZED,
    allowedSubStatuses: [SubStatus.IN_RESULTS],
  },
  {
    path: PAGES.PROFILE.pattern,
    page: ProfilePage,
    access: Access.AUTHORIZED,
    allowedSubStatuses: [SubStatus.IN_PROFILE, SubStatus.IN_LOBBY],
  },
];
