import StateAPI from '../api/StateAPI';
import initialState from './initialState';
import localStorageMiddleware from './middlewares/localStorage';
import regPageReducer from './reducers/regPage';

import welcomePageReducer from './reducers/welcomePage';
import loggerMiddleware from '@/store/middlewares/storeLogger';

const store = new StateAPI(initialState);

store.addReducer(welcomePageReducer);
store.addReducer(regPageReducer);

store.addMiddleware(loggerMiddleware());
store.addMiddleware(localStorageMiddleware('store'));

export default store;
