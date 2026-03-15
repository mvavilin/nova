import 'index.css';
import App from '@components/App/App';
import Router from '@api/RouterAPI/router';
import store from './store/store';
import { SocketActionTypes } from './store/actions/socket.actions';
import { getSessionStorageData } from './utils';
import TOKENS from './constants/tokens';

const app = new App();
if (app.element) document.body.append(app.element);

const router = new Router(app);
router.init();

app.hide(false);

window.addEventListener('load', () => app.show(true, 500));

const authToken = getSessionStorageData<string>(TOKENS.AUTH);

if (authToken) {
  store.dispatch({
    type: SocketActionTypes.SOCKET_REQUEST_SESSION_TOKEN,
    payload: { authToken: authToken },
  });
}

export { app, router };
