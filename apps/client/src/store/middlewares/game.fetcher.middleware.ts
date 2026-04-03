import type { Middleware } from '@StateAPI';
import type { AppActions } from '@AppActions';
// import { ClientEventType, ServerEventType, SocketErrorCode } from '@repo/shared/src/socketEvents';
// import type { CardColor } from '@repo/shared/src/types/game';
// import type { Player, Teams } from '@repo/shared/src/types/room';

// import { socketClient } from '@SocketClientAPI';
// import { SOCKET_ERROR_MESSAGES } from '@SocketClientAPI/socket.constants';
// import { GameActionTypes, type GameActions } from '@actions';
// import { URLS } from '@RouterAPI/router.constants';
// import { router } from '@router';

// import { showErrorToast, saveSessionStorageData, getSessionStorageData } from '@utils';
// import { isObject } from '@utils/isObject';
// import { Toast } from '@components';
// import MessageType from '@constants/messageType';
// import { SESSION_STORAGE_KEYS } from '@/constants/sessionStorageKeys';

export default function gameFetcher<State>(): Middleware<State, AppActions> {
  return function middleware(context) {
    // Отправка подсказки шпионом
    // if (context.action.type === GameActionTypes.GAME_CLUE_GIVE) {
    //   try {
    //     const { clue } = context.action.payload;
    //     console.log('[GAME] Отправка подсказки:', { clue });

    //     socketClient.onError(({ code }) => {
    //       console.error('[GAME] Ошибка при отправке подсказки:', { code, clue });
    //       showErrorToast(code, SOCKET_ERROR_MESSAGES.ON_ERROR);
    //       socketClient.off(ServerEventType.ERROR);
    //     });

    //     socketClient.onGameClueTimeout(() => {
    //       console.warn('[GAME] Таймаут подсказки, ход переходит другой команде');
    //       context.next({
    //         type: GameActionTypes.GAME_CLUE_TIMEOUT,
    //       });
    //       socketClient.off(ServerEventType.GAME_CLUE_TIMEOUT);
    //     });

    //     socketClient.emit(ClientEventType.GAME_CLUE_GIVE, { clue });
    //     console.log('[GAME] Запрос GAME_CLUE_GIVE отправлен:', { clue });
    //   } catch (error) {
    //     console.error('[GAME] Ошибка при отправке запроса GAME_CLUE_GIVE:', error);
    //     showErrorToast(error, SOCKET_ERROR_MESSAGES.ON_ERROR);
    //   }
    // }

    // Выбор карты агентом
    // if (context.action.type === GameActionTypes.GAME_CARD_CHOOSE) {
    //   try {
    //     const { cardId } = context.action.payload;
    //     console.log('[GAME] Выбор карты:', { cardId });

    //     socketClient.onError(({ code }) => {
    //       console.error('[GAME] Ошибка при выборе карты:', { code, cardId });
    //       showErrorToast(code, SOCKET_ERROR_MESSAGES.ON_ERROR);
    //       socketClient.off(ServerEventType.ERROR);
    //     });

    //     socketClient.emit(ClientEventType.GAME_CARD_CHOOSE, { cardId });
    //     console.log('[GAME] Запрос GAME_CARD_CHOOSE отправлен:', { cardId });
    //   } catch (error) {
    //     console.error('[GAME] Ошибка при отправке запроса GAME_CARD_CHOOSE:', error);
    //     showErrorToast(error, SOCKET_ERROR_MESSAGES.ON_ERROR);
    //   }
    // }

    // Обработка запроса подсказки от сервера (для шпиона)
    // if (context.action.type === GameActionTypes.GAME_ASK_CLUE) {
    //   try {
    //     console.log('[GAME] Сервер запрашивает подсказку у шпиона');

    //     socketClient.onGameAskClue(() => {
    //       console.log('[GAME] Получен запрос на подсказку');
    //       context.next({
    //         type: GameActionTypes.GAME_ASK_CLUE,
    //       });
    //     });
    //   } catch (error) {
    //     console.error('[GAME] Ошибка при обработке GAME_ASK_CLUE:', error);
    //     showErrorToast(error, SOCKET_ERROR_MESSAGES.ON_ERROR);
    //   }
    // }

    // Обработка таймаута подсказки
    // if (context.action.type === GameActionTypes.GAME_CLUE_TIMEOUT) {
    //   try {
    //     console.log('[GAME] Ожидание таймаута подсказки');

    //     socketClient.onGameClueTimeout(() => {
    //       console.warn('[GAME] Таймаут подсказки, ход переходит другой команде');
    //       context.next({
    //         type: GameActionTypes.GAME_CLUE_TIMEOUT,
    //       });
    //     });
    //   } catch (error) {
    //     console.error('[GAME] Ошибка при обработке GAME_CLUE_TIMEOUT:', error);
    //     showErrorToast(error, SOCKET_ERROR_MESSAGES.ON_ERROR);
    //   }
    // }

    // Обработка смены хода
    // if (context.action.type === GameActionTypes.GAME_TURN_CHANGED) {
    //   try {
    //     console.log('[GAME] Ожидание смены хода');

    //     socketClient.onGameTurnChanged(({ team }) => {
    //       console.log('[GAME] Смена хода, новая команда:', { team });
    //       context.next({
    //         type: GameActionTypes.GAME_TURN_CHANGED,
    //         payload: { team },
    //       });

    //       new Toast({
    //         type: MessageType.INFO,
    //         message: `Ход переходит к команде ${team === 'red' ? 'Красных' : 'Синих'}`,
    //       });
    //     });
    //   } catch (error) {
    //     console.error('[GAME] Ошибка при обработке GAME_TURN_CHANGED:', error);
    //     showErrorToast(error, SOCKET_ERROR_MESSAGES.ON_ERROR);
    //   }
    // }

    // Обработка получения подсказки агентами
    // if (context.action.type === GameActionTypes.GAME_CLUE_GIVEN) {
    //   try {
    //     console.log('[GAME] Ожидание получения подсказки');

    //     socketClient.onGameClueGiven(({ clue }) => {
    //       console.log('[GAME] Получена подсказка от шпиона:', { clue });
    //       context.next({
    //         type: GameActionTypes.GAME_CLUE_GIVEN,
    //         payload: { clue },
    //       });

    //       new Toast({
    //         type: MessageType.INFO,
    //         message: `Подсказка: ${clue}`,
    //       });
    //     });
    //   } catch (error) {
    //     console.error('[GAME] Ошибка при обработке GAME_CLUE_GIVEN:', error);
    //     showErrorToast(error, SOCKET_ERROR_MESSAGES.ON_ERROR);
    //   }
    // }

    // Обработка выбора карты игроком
    // if (context.action.type === GameActionTypes.GAME_CARD_CHOSEN) {
    //   try {
    //     console.log('[GAME] Ожидание выбора карты игроком');

    //     socketClient.onGameCardChosen(({ cardId, players }) => {
    //       console.log('[GAME] Игрок выбрал карту:', { cardId, players });
    //       context.next({
    //         type: GameActionTypes.GAME_CARD_CHOSEN,
    //         payload: { cardId, players },
    //       });
    //     });
    //   } catch (error) {
    //     console.error('[GAME] Ошибка при обработке GAME_CARD_CHOSEN:', error);
    //     showErrorToast(error, SOCKET_ERROR_MESSAGES.ON_ERROR);
    //   }
    // }

    // Обработка открытия карты
    // if (context.action.type === GameActionTypes.GAME_CARD_SHOWN) {
    //   try {
    //     console.log('[GAME] Ожидание открытия карты');

    //     socketClient.onGameCardShown(({ cardId, color }) => {
    //       console.log('[GAME] Карта открыта:', { cardId, color });
    //       context.next({
    //         type: GameActionTypes.GAME_CARD_SHOWN,
    //         payload: { cardId, color },
    //       });

    //       let message = '';
    //       if (color === 'red') message = 'Красная карта! Продолжайте ход!';
    //       if (color === 'blue') message = 'Синяя карта! Продолжайте ход!';
    //       if (color === 'neutral') message = 'Нейтральная карта! Ход переходит другой команде';
    //       if (color === 'bomb') message = 'БОМБА! Игра окончена!';

    //       if (message) {
    //         new Toast({
    //           type: color === 'bomb' ? MessageType.ERROR : MessageType.INFO,
    //           message,
    //         });
    //       }
    //     });
    //   } catch (error) {
    //     console.error('[GAME] Ошибка при обработке GAME_CARD_SHOWN:', error);
    //     showErrorToast(error, SOCKET_ERROR_MESSAGES.ON_ERROR);
    //   }
    // }

    return context.next(context.action);
  };
}
