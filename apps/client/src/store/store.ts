import StateAPI from '../api/StateAPI';
import initialState from './initialState';

import senderMiddleware from './middlewares/sender.middleware';
import fetcherMiddleware from './middlewares/fetcher.middleware';

import registrationReducer from './reducers/registration.reducer';
import welcomeReducer from './reducers/welcome.reducer';

import loggerAfterware from '@/store/afterwares/logger.afterware';
import storageAfterware from './afterwares/storage.afterware';
import type { State } from './types/state.types';
import type { Actions } from './types/action.types';

const store = new StateAPI<State, Actions>(initialState);

store.addReducer(registrationReducer, welcomeReducer);

store.addMiddleware(senderMiddleware(), fetcherMiddleware());
store.addAfterware(loggerAfterware(), storageAfterware('store'));

export default store;
