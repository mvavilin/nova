import StateAPI from '../api/StateAPI';
import { initialState } from '@store/state';

import senderMiddleware from './middlewares/test.sender.middleware';
import fetcherMiddleware from './middlewares/test.fetcher.middleware';

import testReducer from './reducers/test.reducer';
import welcomeReducer from './reducers/welcome.reducer';

import loggerAfterware from '@/store/afterwares/logger.afterware';
import storageAfterware from './afterwares/storage.afterware';
import type { State } from '@store/types/state';
import type { Actions } from './types/action';

const store = new StateAPI<State, Actions>(initialState);

store.addReducer(testReducer, welcomeReducer);

store.addMiddleware(senderMiddleware(), fetcherMiddleware());
store.addAfterware(loggerAfterware(), storageAfterware('store'));

export default store;
