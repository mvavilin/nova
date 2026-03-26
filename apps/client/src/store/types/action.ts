import type { WelcomePageActions } from '@actions/welcome.actions';
import type { LobbyPageActions } from '../actions/lobby.actions';

import type { TestPageActions, FormActionsTypes, SocketActions, LocalAppActions } from '@actions';

export type AppActions =
  | WelcomePageActions
  | TestPageActions
  | FormActionsTypes
  | SocketActions
  | LocalAppActions
  | LobbyPageActions;
