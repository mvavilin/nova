import StateAPI from '../api/StateAPI';
import initialState from './initialState';

import welcomePageReducer from './reducers/welcomePage';
import loggerMiddleware from '@/store/middlewares/storeLogger';

const store = new StateAPI(initialState);
store.addReducer(welcomePageReducer);
store.addMiddleware(loggerMiddleware());

export default store;
