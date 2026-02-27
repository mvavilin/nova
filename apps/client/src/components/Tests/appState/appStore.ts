import { StateAPI } from '../../../api/StateAPI';
import initialState from './initialState';

const appStore = new StateAPI(initialState);

export default appStore;
