import 'index.css';
import App from '@components/App/App';
import Router from '@RouterAPI/router';
import store from '@store';
import { SocketActionTypes } from '@actions';
import { getSessionStorageData } from '@utils';
import TOKENS from '@constants/tokens';
import SoundManager from './sound/SoundManager';
import { soundPaths } from './sound/soundKeys';

const app = new App();
const router = new Router(app);

if (app.element) document.body.append(app.element);
app.hide(false);

const soundManager = new SoundManager();
soundManager.loadSounds(soundPaths);

globalThis.addEventListener('load', () => {
  app.show(true, 500);

  const authToken = getSessionStorageData<string>(TOKENS.AUTH);
  if (authToken) {
    store.dispatch({
      type: SocketActionTypes.SOCKET_REQUEST_SESSION_TOKEN,
      payload: { authToken },
    });
  } else router.init();

  // chore: remove in production

  // new KnowledgeCheckModal({
  //   topic: `Promise`,
  //   question: `Какие три состояния есть у объектов Promise? И в какой последовательности они обычно сменяют друг друга?`,
  // }).show();

  // new AnswerRatingModal({
  //   topic: `Promise`,
  //   question: `Какие три состояния есть у объектов Promise? И в какой последовательности они обычно сменяют друг друга?`,
  //   answer: `pending (ожидание) и fulfilled (выполнено успешно) или rejected (выполнено с ошибкой). Из pending промис может перейти либо в fulfilled, либо в rejected. Обратного пути нет.`,
  //   possibleAnswer: `Объект Promise в JavaScript может находиться в одном из трех состояний: pending (ожидание, начальное состояние), fulfilled (выполнено успешно) или rejected (выполнено с ошибкой), при этом переход всегда осуществляется из pending либо в fulfilled, либо в rejected, после чего состояние навсегда остается неизменным.`,
  // }).show();

  // new GameResultsModal(gameResults).show();
});

export { app, router };

// chore: remove in production

// import { KnowledgeCheckModal } from '@pages/GamePage/components';
// import { AnswerRatingModal } from '@pages/GamePage/components';
// import { GameResultsModal } from '@pages/GamePage/components';
// import { gameResults } from '@__mocks__';
