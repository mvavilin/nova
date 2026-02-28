import { appReducer } from '../../../api/StateAPI/reducers/reducer';
import { StateAPI } from '../../../api/StateAPI';
import initialState from './initialState';

const appStore = new StateAPI(initialState);
appStore.addReducer(appReducer);

export default appStore;
