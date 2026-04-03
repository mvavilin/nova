import StateAPI from '@StateAPI';
import { initialState } from '@initialState';
import { localStorageProps } from '@constants/localStorage.constants';
import { getSessionStorageData } from '@utils';

import type { State } from '@State';
import type { AppActions } from '@AppActions';

import {
  testReducer,
  welcomeReducer,
  formReducer,
  socketReducer,
  appReducer,
  roomReducer,
  gameReducer,
} from '@reducers';
import {
  testSenderMiddleware,
  testFetcherMiddleware,
  formFetcherMiddleware,
  socketMiddleware,
  roomMiddleware,
  gameMiddleware,
} from '@middlewares';
import { loggerAfterware, welcomePageAfterware, socketAfterware, appAfterware } from '@afterwares';
import lobbyPageAfterware from './afterwares/lobby.afterware';
// chore: remove in production
// import { initialState } from '@__mocks__/store/initialState';

function loadState(): State {
  const saved = getSessionStorageData<Partial<State>>(localStorageProps.store);
  return { ...initialState, ...saved };
}

const store = new StateAPI<State, AppActions>(loadState());

store.addReducer(
  testReducer,
  welcomeReducer,
  formReducer,
  socketReducer,
  appReducer,
  roomReducer,
  gameReducer
);
store.addMiddleware(
  testSenderMiddleware(),
  testFetcherMiddleware(),
  formFetcherMiddleware(),
  socketMiddleware(),
  roomMiddleware(),
  gameMiddleware()
);
store.addAfterware(
  loggerAfterware(),
  welcomePageAfterware(),
  socketAfterware(),
  appAfterware(),
  lobbyPageAfterware()
);

export default store;
