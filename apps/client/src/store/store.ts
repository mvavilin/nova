import StateAPI from '../api/StateAPI';
import initialState from './initialState';
import localStorageAfterware from './afterwares/localStorage';
import regPageReducer from './reducers/regPage';

import welcomePageReducer from './reducers/welcomePage';
import loggerAfterware from '@/store/afterwares/storeLogger';

const store = new StateAPI(initialState);

store.addReducer(regPageReducer, welcomePageReducer);

store.addAfterware(loggerAfterware(), localStorageAfterware('store'));

export default store;
