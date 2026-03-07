import StateAPI from '../api/StateAPI';
import { ClientUserState } from '@state';

import senderMiddleware from './middlewares/test.sender.middleware';
import fetcherMiddleware from './middlewares/test.fetcher.middleware';

import testReducer from './reducers/test.reducer';
import welcomeReducer from './reducers/welcome.reducer';
import baseFormReducer from './reducers/baseForm.reducer';

import loggerAfterware from '@/store/afterwares/logger.afterware';
import storageAfterware from './afterwares/storage.afterware';
import type { ClientUser } from '@types';
import type { Actions } from './types/action.types';

const clientUserStore = new StateAPI<ClientUser, Actions>(ClientUserState);

clientUserStore.addReducer(testReducer, welcomeReducer, baseFormReducer);

clientUserStore.addMiddleware(senderMiddleware(), fetcherMiddleware());
clientUserStore.addAfterware(loggerAfterware(), storageAfterware('store'));

export default clientUserStore;
