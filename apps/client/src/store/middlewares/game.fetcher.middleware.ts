import type { Middleware } from '@StateAPI';
import type { AppActions } from '@AppActions';
import { ClientEventType, ServerEventType } from '@repo/shared/src/socketEvents';
import { socketClient } from '@SocketClientAPI';
import { SOCKET_ERROR_MESSAGES } from '@SocketClientAPI/socket.constants';
import { GameActionTypes } from '@actions';
import { showErrorToast } from '@utils';
import { URLS } from '@RouterAPI/router.constants';
import { router } from '@router';

export default function gameFetcher<State>(): Middleware<State, AppActions> {
  return function middleware(context) {
    // Состояние игры (сервер → клиент)
    if (context.action.type === GameActionTypes.GAME_ASK_GAME_STATE) {
      try {
        socketClient.onGameState((payload) => {
          context.next({ type: GameActionTypes.GAME_STATE, payload });

          router.navigate(URLS.GAME(payload.gameState.id));

          socketClient.off(ServerEventType.GAME_STATE);
        });

        socketClient.emit(ClientEventType.GAME_ASK_GAME_STATE);
      } catch (error) {
        showErrorToast(error, SOCKET_ERROR_MESSAGES.ON_ERROR);
      }
    }

    // Отправка подсказки шпионом (клиент → сервер)
    if (context.action.type === GameActionTypes.GAME_CLUE_GIVE) {
      try {
        const { clue } = context.action.payload;
        console.log('[GAME] Отправка подсказки:', { clue });
        socketClient.emit(ClientEventType.GAME_CLUE_GIVE, { clue });
      } catch (error) {
        console.error('[GAME] Ошибка GAME_CLUE_GIVE:', error);
        showErrorToast(error, SOCKET_ERROR_MESSAGES.ON_ERROR);
      }
    }

    // Выбор карты агентом (клиент → сервер)
    // if (context.action.type === GameActionTypes.GAME_CARD_CHOOSE) {
    //   try {
    //     const { cardId } = context.action.payload;
    //     console.log('[GAME] Выбор карты:', { cardId });
    //     socketClient.emit(ClientEventType.GAME_CARD_CHOOSE, { cardId });
    //   } catch (error) {
    //     console.error('[GAME] Ошибка GAME_CARD_CHOOSE:', error);
    //     showErrorToast(error, SOCKET_ERROR_MESSAGES.ON_ERROR);
    //   }
    // }

    // Отправка ответа на вопрос карты (клиент → сервер)
    // if (context.action.type === GameActionTypes.GAME_ANSWER_GIVE) {
    //   try {
    //     const { answer } = context.action.payload;
    //     console.log('[GAME] Отправка ответа:', { answer });
    //     socketClient.emit(ClientEventType.GAME_ANSWER_GIVE, { answer });
    //   } catch (error) {
    //     console.error('[GAME] Ошибка GAME_ANSWER_GIVE:', error);
    //     showErrorToast(error, SOCKET_ERROR_MESSAGES.ON_ERROR);
    //   }
    // }

    // Отправка результата проверки (клиент → сервер)
    // if (context.action.type === GameActionTypes.GAME_CHECK_GIVE) {
    //   try {
    //     const { accept } = context.action.payload;
    //     console.log('[GAME] Отправка проверки:', { accept });
    //     socketClient.emit(ClientEventType.GAME_CHECK_GIVE, { accept });
    //   } catch (error) {
    //     console.error('[GAME] Ошибка GAME_CHECK_GIVE:', error);
    //     showErrorToast(error, SOCKET_ERROR_MESSAGES.ON_ERROR);
    //   }
    // }

    // Подтверждение готовности к игре (клиент → сервер)
    // if (context.action.type === GameActionTypes.GAME_ADD_PLAYER) {
    //   try {
    //     console.log('[GAME] Подтверждение готовности к игре');
    //     socketClient.emit(ClientEventType.GAME_ADD_PLAYER);
    //   } catch (error) {
    //     console.error('[GAME] Ошибка GAME_ADD_PLAYER:', error);
    //     showErrorToast(error, SOCKET_ERROR_MESSAGES.ON_ERROR);
    //   }
    // }

    // Запрос состояния игры (клиент → сервер)
    // if (context.action.type === GameActionTypes.GAME_ASK_GAME_STATE) {
    //   try {
    //     console.log('[GAME] Запрос состояния игры');
    //     socketClient.emit(ClientEventType.GAME_ASK_GAME_STATE);
    //   } catch (error) {
    //     console.error('[GAME] Ошибка GAME_ASK_GAME_STATE:', error);
    //     showErrorToast(error, SOCKET_ERROR_MESSAGES.ON_ERROR);
    //   }
    // }

    // Запрос подсказки от сервера (сервер → клиент)
    // if (context.action.type === GameActionTypes.GAME_ASK_CLUE) {
    //   try {
    //     console.log('[GAME] Ожидание запроса подсказки');
    //     socketClient.onGameAskClue(() => {
    //       console.log('[GAME] Сервер запросил подсказку');
    //       context.next({ type: GameActionTypes.GAME_ASK_CLUE });
    //     });
    //   } catch (error) {
    //     console.error('[GAME] Ошибка GAME_ASK_CLUE:', error);
    //     showErrorToast(error, SOCKET_ERROR_MESSAGES.ON_ERROR);
    //   }
    // }

    // Таймаут подсказки (сервер → клиент)
    // if (context.action.type === GameActionTypes.GAME_CLUE_TIMEOUT) {
    //   try {
    //     console.log('[GAME] Ожидание таймаута подсказки');
    //     socketClient.onGameClueTimeout(() => {
    //       console.log('[GAME] Таймаут подсказки');
    //       context.next({ type: GameActionTypes.GAME_CLUE_TIMEOUT });
    //     });
    //   } catch (error) {
    //     console.error('[GAME] Ошибка GAME_CLUE_TIMEOUT:', error);
    //     showErrorToast(error, SOCKET_ERROR_MESSAGES.ON_ERROR);
    //   }
    // }

    // Смена хода (сервер → клиент)
    // if (context.action.type === GameActionTypes.GAME_TURN_CHANGED) {
    //   try {
    //     console.log('[GAME] Ожидание смены хода');
    //     socketClient.onGameTurnChanged(({ team }) => {
    //       console.log('[GAME] Смена хода:', { team });
    //       context.next({ type: GameActionTypes.GAME_TURN_CHANGED, payload: { team } });
    //     });
    //   } catch (error) {
    //     console.error('[GAME] Ошибка GAME_TURN_CHANGED:', error);
    //     showErrorToast(error, SOCKET_ERROR_MESSAGES.ON_ERROR);
    //   }
    // }

    // Получение подсказки агентами (сервер → клиент)
    // if (context.action.type === GameActionTypes.GAME_CLUE_GIVEN) {
    //   try {
    //     console.log('[GAME] Ожидание подсказки');
    //     socketClient.onGameClueGiven(({ clue }) => {
    //       console.log('[GAME] Получена подсказка:', { clue });
    //       context.next({ type: GameActionTypes.GAME_CLUE_GIVEN, payload: { clue } });
    //     });
    //   } catch (error) {
    //     console.error('[GAME] Ошибка GAME_CLUE_GIVEN:', error);
    //     showErrorToast(error, SOCKET_ERROR_MESSAGES.ON_ERROR);
    //   }
    // }

    // Выбор карты игроком (сервер → клиент)
    // if (context.action.type === GameActionTypes.GAME_CARD_CHOSEN) {
    //   try {
    //     console.log('[GAME] Ожидание выбора карты');
    //     socketClient.onGameCardChosen(({ cardId, players }) => {
    //       console.log('[GAME] Выбрана карта:', { cardId, players });
    //       context.next({ type: GameActionTypes.GAME_CARD_CHOSEN, payload: { cardId, players } });
    //     });
    //   } catch (error) {
    //     console.error('[GAME] Ошибка GAME_CARD_CHOSEN:', error);
    //     showErrorToast(error, SOCKET_ERROR_MESSAGES.ON_ERROR);
    //   }
    // }

    // Открытие карты (сервер → клиент)
    // if (context.action.type === GameActionTypes.GAME_CARD_SHOWN) {
    //   try {
    //     console.log('[GAME] Ожидание открытия карты');
    //     socketClient.onGameCardShown(({ cardId, color }) => {
    //       console.log('[GAME] Карта открыта:', { cardId, color });
    //       context.next({ type: GameActionTypes.GAME_CARD_SHOWN, payload: { cardId, color } });
    //     });
    //   } catch (error) {
    //     console.error('[GAME] Ошибка GAME_CARD_SHOWN:', error);
    //     showErrorToast(error, SOCKET_ERROR_MESSAGES.ON_ERROR);
    //   }
    // }

    // Запрос ответа на вопрос карты (сервер → клиент)
    // if (context.action.type === GameActionTypes.GAME_ASK_ANSWER) {
    //   try {
    //     console.log('[GAME] Ожидание запроса ответа');
    //     socketClient.onGameAskAnswer(({ word, question, question_en, answer }) => {
    //       console.log('[GAME] Запрос ответа:', { word, question, answer });
    //       context.next({
    //         type: GameActionTypes.GAME_ASK_ANSWER,
    //         payload: { word, question, question_en, answer },
    //       });
    //     });
    //   } catch (error) {
    //     console.error('[GAME] Ошибка GAME_ASK_ANSWER:', error);
    //     showErrorToast(error, SOCKET_ERROR_MESSAGES.ON_ERROR);
    //   }
    // }

    // Таймаут ответа (сервер → клиент)
    // if (context.action.type === GameActionTypes.GAME_ANSWER_TIMEOUT) {
    //   try {
    //     console.log('[GAME] Ожидание таймаута ответа');
    //     socketClient.onGameAnswerTimeout(() => {
    //       console.log('[GAME] Таймаут ответа');
    //       context.next({ type: GameActionTypes.GAME_ANSWER_TIMEOUT });
    //     });
    //   } catch (error) {
    //     console.error('[GAME] Ошибка GAME_ANSWER_TIMEOUT:', error);
    //     showErrorToast(error, SOCKET_ERROR_MESSAGES.ON_ERROR);
    //   }
    // }

    // Запрос проверки ответа (сервер → клиент)
    // if (context.action.type === GameActionTypes.GAME_ASK_CHECK) {
    //   try {
    //     console.log('[GAME] Ожидание запроса проверки');
    //     socketClient.onGameAskCheck(({ answer, checkQuestion, check }) => {
    //       console.log('[GAME] Запрос проверки:', { answer, check });
    //       context.next({
    //         type: GameActionTypes.GAME_ASK_CHECK,
    //         payload: { answer, checkQuestion, check },
    //       });
    //     });
    //   } catch (error) {
    //     console.error('[GAME] Ошибка GAME_ASK_CHECK:', error);
    //     showErrorToast(error, SOCKET_ERROR_MESSAGES.ON_ERROR);
    //   }
    // }

    // Результаты проверки (сервер → клиент)
    // if (context.action.type === GameActionTypes.GAME_CHECK_RESULTS) {
    //   try {
    //     console.log('[GAME] Ожидание результатов проверки');
    //     socketClient.onGameCheckResults(({ correct }) => {
    //       console.log('[GAME] Результат проверки:', { correct });
    //       context.next({ type: GameActionTypes.GAME_CHECK_RESULTS, payload: { correct } });
    //     });
    //   } catch (error) {
    //     console.error('[GAME] Ошибка GAME_CHECK_RESULTS:', error);
    //     showErrorToast(error, SOCKET_ERROR_MESSAGES.ON_ERROR);
    //   }
    // }

    // Таймаут проверки (сервер → клиент)
    // if (context.action.type === GameActionTypes.GAME_CHECK_TIMEOUT) {
    //   try {
    //     console.log('[GAME] Ожидание таймаута проверки');
    //     socketClient.onGameCheckTimeout(() => {
    //       console.log('[GAME] Таймаут проверки');
    //       context.next({ type: GameActionTypes.GAME_CHECK_TIMEOUT });
    //     });
    //   } catch (error) {
    //     console.error('[GAME] Ошибка GAME_CHECK_TIMEOUT:', error);
    //     showErrorToast(error, SOCKET_ERROR_MESSAGES.ON_ERROR);
    //   }
    // }

    // Отправка счета (сервер → клиент)
    // if (context.action.type === GameActionTypes.GAME_SEND_SCORE) {
    //   try {
    //     console.log('[GAME] Ожидание счета');
    //     socketClient.onGameSendScore(({ score }) => {
    //       console.log('[GAME] Получен счет:', { score });
    //       context.next({ type: GameActionTypes.GAME_SEND_SCORE, payload: { score } });
    //     });
    //   } catch (error) {
    //     console.error('[GAME] Ошибка GAME_SEND_SCORE:', error);
    //     showErrorToast(error, SOCKET_ERROR_MESSAGES.ON_ERROR);
    //   }
    // }

    // Конец игры (сервер → клиент)
    // if (context.action.type === GameActionTypes.GAME_GAME_END) {
    //   try {
    //     console.log('[GAME] Ожидание конца игры');
    //     socketClient.onGameGameEnd(({ gameEndInfo }) => {
    //       console.log('[GAME] Конец игры:', { gameEndInfo });
    //       context.next({ type: GameActionTypes.GAME_GAME_END, payload: { gameEndInfo } });
    //     });
    //   } catch (error) {
    //     console.error('[GAME] Ошибка GAME_GAME_END:', error);
    //     showErrorToast(error, SOCKET_ERROR_MESSAGES.ON_ERROR);
    //   }
    // }

    // Таймер перед стартом игры (сервер → клиент)
    // if (context.action.type === GameActionTypes.GAME_START_TIMER) {
    //   try {
    //     console.log('[GAME] Ожидание таймера старта');
    //     socketClient.onGameStartTimer(() => {
    //       console.log('[GAME] Старт таймера');
    //       context.next({ type: GameActionTypes.GAME_START_TIMER });
    //     });
    //   } catch (error) {
    //     console.error('[GAME] Ошибка GAME_START_TIMER:', error);
    //     showErrorToast(error, SOCKET_ERROR_MESSAGES.ON_ERROR);
    //   }
    // }

    // Старт игры (сервер → клиент)
    // if (context.action.type === GameActionTypes.GAME_START) {
    //   try {
    //     console.log('[GAME] Ожидание старта игры');
    //     socketClient.onGameStart(({ gameInfo }) => {
    //       console.log('[GAME] Старт игры');
    //       context.next({ type: GameActionTypes.GAME_START, payload: { gameInfo } });
    //     });
    //   } catch (error) {
    //     console.error('[GAME] Ошибка GAME_START:', error);
    //     showErrorToast(error, SOCKET_ERROR_MESSAGES.ON_ERROR);
    //   }
    // }

    return context.next(context.action);
  };
}
