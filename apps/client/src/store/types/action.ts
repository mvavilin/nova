import type { WelcomePageActions } from '@actions/welcome.actions';
import type { LobbyPageActions } from '../actions/lobby.actions';

import type {
  TestPageActions,
  FormActions,
  SocketActions,
  LocalAppActions,
  RoomPageActions,
  GameActions,
} from '@actions';

export type AppActions =
  | WelcomePageActions
  | TestPageActions
  | FormActions
  | SocketActions
  | LocalAppActions
  | RoomPageActions
  | LobbyPageActions
  | GameActions;
