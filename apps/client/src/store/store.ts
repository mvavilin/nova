import StateAPI from '../api/StateAPI';
import { initialState } from '@/store/initialstate';

import testSenderMiddleware from './middlewares/test.sender.middleware';
import testFetcherMiddleware from './middlewares/test.fetcher.middleware';
import formFetcherMiddleware from './middlewares/form.fetcher.middleware';

import testReducer from './reducers/test.reducer';
import welcomeReducer from './reducers/welcome.reducer';
import baseFormReducer from './reducers/baseForm.reducer';

import loggerAfterware from '@store/afterwares/logger.afterware';
// import storageAfterware from './afterwares/storage.afterware';
import welcomePageAfterware from '@store/afterwares/welcome.afterware';
import formAfterware from './afterwares/form.afterware';

import type { State } from '@/store/types/state.types';
import type { AppActions } from './types/action.types';

const store = new StateAPI<State, AppActions>(initialState);

store.addReducer(testReducer, welcomeReducer, baseFormReducer);

store.addMiddleware(testSenderMiddleware(), testFetcherMiddleware(), formFetcherMiddleware());
store.addAfterware(
  loggerAfterware(),
  // storageAfterware('store'),
  welcomePageAfterware(),
  formAfterware()
);

export default store;
