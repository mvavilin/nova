import StateAPI from '../api/StateAPI';
import { initialState } from '@/store/initialState';

import testSenderMiddleware from './middlewares/test.sender.middleware';
import testFetcherMiddleware from './middlewares/test.fetcher.middleware';
import formFetcherMiddleware from './middlewares/form.fetcher.middleware';

import testReducer from './reducers/test.reducer';
import welcomeReducer from './reducers/welcome.reducer';
import formReducer from './reducers/form.reducer';

import loggerAfterware from '@store/afterwares/logger.afterware';
import welcomePageAfterware from '@store/afterwares/welcome.afterware';

import type { State } from '@/store/types/state';
import type { AppActions } from './types/action';
import { localStorageProps } from '@/constants/localStorage.constants';
import { getLocalStorageData } from '@/utils/localStorage';
import socketReducer from './reducers/socket.reducer';
import socketMiddleware from './middlewares/socket.fetcher.middleware';
import socketAfterware from './afterwares/socket.afterware';

function loadState(): State {
  const saved = getLocalStorageData<Partial<State>>(localStorageProps.store);

  return {
    ...initialState,
    ...saved,
  };
}

const store = new StateAPI<State, AppActions>(loadState());

store.addReducer(testReducer, welcomeReducer, formReducer, socketReducer);
store.addMiddleware(
  testSenderMiddleware(),
  testFetcherMiddleware(),
  formFetcherMiddleware(),
  socketMiddleware()
);
store.addAfterware(loggerAfterware(), welcomePageAfterware(), socketAfterware());

export default store;
