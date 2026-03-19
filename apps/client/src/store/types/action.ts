import type { WelcomePageActions } from '@actions/welcome.actions';

import type { TestPageActions, FormActions, SocketActions, LocalAppActions } from '@actions';

export type AppActions =
  | WelcomePageActions
  | TestPageActions
  | FormActions
  | SocketActions
  | LocalAppActions;
