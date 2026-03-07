import StateAPI from '../api/StateAPI';
import { ClientUserState } from '@state';

import senderMiddleware from './middlewares/test.sender.middleware';
import fetcherMiddleware from './middlewares/test.fetcher.middleware';

import testReducer from './reducers/test.reducer';
import welcomeReducer from './reducers/welcome.reducer';
import registrationPageReducer from '@store/reducers/registration.reducer';

import loggerAfterware from '@store/afterwares/logger.afterware';
import storageAfterware from './afterwares/storage.afterware';
import goToLobbyAfterware from '@store/afterwares/registration.afterware';
import goToRegistrationAfterware from '@store/afterwares/welcome.afterware';

import type { ClientUser } from '@types';
import type { Actions } from './types/action.types';

export const clientUserStore = new StateAPI<ClientUser, Actions>(ClientUserState);

clientUserStore.addReducer(testReducer, welcomeReducer, registrationPageReducer);

clientUserStore.addMiddleware(senderMiddleware(), fetcherMiddleware());
clientUserStore.addAfterware(
  loggerAfterware(),
  storageAfterware('store'),
  goToRegistrationAfterware(),
  goToLobbyAfterware()
);
