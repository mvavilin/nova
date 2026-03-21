import 'index.css';
import App from '@components/App/App';
import Router from '@RouterAPI/router';
// import store from '@store';
// import { SocketActionTypes } from '@actions';
// import { getSessionStorageData } from '@utils';
// import TOKENS from '@constants/tokens';

const app = new App();
const router = new Router(app);

if (app.element) document.body.append(app.element);

router.init();
app.hide(false);

window.addEventListener('load', () => app.show(true, 500));

// const authToken = getSessionStorageData<string>(TOKENS.AUTH);
// if (authToken) {
//   store.dispatch({
//     type: SocketActionTypes.SOCKET_REQUEST_SESSION_TOKEN,
//     payload: { authToken },
//   });
// }

// import { KnowledgeCheckModal } from '@pages/GamePage/components';

// new KnowledgeCheckModal({
//   topic: `Promise`,
//   question: `Какие три состояния есть у объектов Promise? И в какой последовательности они обычно сменяют друг друга?`,
// }).show();

export { app, router };
