import StateAPI from '@StateAPI';
import { initialState } from '@initialState';
import { localStorageProps } from '@constants/localStorage.constants';
import { getLocalStorageData } from '@utils';

import type { State } from '@State';
import type { AppActions } from '@AppActions';

import { testReducer, welcomeReducer, formReducer, socketReducer, appReducer } from '@reducers';
import {
  testSenderMiddleware,
  testFetcherMiddleware,
  formFetcherMiddleware,
  socketMiddleware,
} from '@middlewares';
import { loggerAfterware, welcomePageAfterware, socketAfterware, appAfterware } from '@afterwares';

function loadState(): State {
  const saved = getLocalStorageData<Partial<State>>(localStorageProps.store);
  return { ...initialState, ...saved };
}

const store = new StateAPI<State, AppActions>(loadState());

store.addReducer(testReducer, welcomeReducer, formReducer, socketReducer, appReducer);
store.addMiddleware(
  testSenderMiddleware(),
  testFetcherMiddleware(),
  formFetcherMiddleware(),
  socketMiddleware()
);
store.addAfterware(loggerAfterware(), welcomePageAfterware(), socketAfterware(), appAfterware());

export default store;
