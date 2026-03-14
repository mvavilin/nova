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
import formAfterware from './afterwares/form.afterware';

import type { State } from '@/store/types/state';
import type { AppActions } from './types/action';
import { localStorageProps } from '@/constants/localStorage.constants';
import { getLocalStorageData } from '@/utils/localStorage';

function loadState(): State {
  const saved = getLocalStorageData<Partial<State>>(localStorageProps.store);

  return {
    ...initialState,
    ...saved,
  };
}

const store = new StateAPI<State, AppActions>(loadState());

store.addReducer(testReducer, welcomeReducer, formReducer);
store.addMiddleware(testSenderMiddleware(), testFetcherMiddleware(), formFetcherMiddleware());
store.addAfterware(loggerAfterware(), welcomePageAfterware(), formAfterware());

export default store;
