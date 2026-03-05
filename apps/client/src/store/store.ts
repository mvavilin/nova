import StateAPI from '../api/StateAPI';
import initialState from './initialState';

import senderMiddleware from './middlewares/test.sender.middleware';
import fetcherMiddleware from './middlewares/test.fetcher.middleware';

import testReducer from './reducers/test.reducer';
import welcomeReducer from './reducers/welcome.reducer';

import loggerAfterware from '@/store/afterwares/logger.afterware';
import storageAfterware from './afterwares/storage.afterware';
import type { State } from './types/state.types';
import type { Actions } from './types/action.types';

const store = new StateAPI<State, Actions>(initialState);

store.addReducer(testReducer, welcomeReducer);

store.addMiddleware(senderMiddleware(), fetcherMiddleware());
store.addAfterware(loggerAfterware(), storageAfterware('store'));

export default store;
