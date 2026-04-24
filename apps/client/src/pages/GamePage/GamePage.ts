import { ContainerComponent, HeadingComponent } from '@api/ComponentsAPI';
import { Header } from '@components';
import { GAME_PAGE_BACKGROUND } from '@assets/backgrounds';
import { TITLE_CLASSES } from '@constants/styles';
import { TeamTurnIndicator, Timer } from '@pages/GamePage/components';
import { logOutput } from '@pages/GamePage/components';
import { GameBoardSection, LogChatSection } from '@pages/GamePage/components/sections';
import { TeamsEnum } from '@repo/shared/src/types/room';
import { t } from '@i18n';
import { TranslationKeys } from '@i18n/translationKeys';
import { socketClient } from '@SocketClientAPI';
import { LogMessageKeys, LogMessageType } from '@repo/shared/src/types/logMessage';
import store from '@store';
import { ProfileSection } from '@pages/LobbyPage/components';

const GAME_PAGE_CLASSES = `w-full h-full flex flex-col items-center justify-start gap-5 px-20 py-5 bg-cover bg-right font-text`;
const MAIN_CLASSES = `w-full h-full max-w-7xl grid grid-cols-2 grid-cols-[3fr_1fr] gap-5 text-white rounded`;

export default class GamePage extends ContainerComponent {
  private main: ContainerComponent;

  constructor() {
    super({ id: 'game-page', classes: GAME_PAGE_CLASSES });

    this.setStyle({ backgroundImage: `url(${GAME_PAGE_BACKGROUND})` });

    this.main = new ContainerComponent({ tag: 'main', classes: MAIN_CLASSES });

    this.render();

    this.setupSocketListeners();
  }

  private setupSocketListeners(): void {
    // GAME_ASK_CLUE
    socketClient.onGameAskClue(() => {
      logOutput.addMessage({ key: LogMessageKeys.LOG_HINT_PHASE_STARTED });
      logOutput.addMessage({ key: LogMessageKeys.LOG_HINT_REQUEST });
    });

    // GAME_START
    // socketClient.onGameStart((payload) => {
    //   console.log('[GamePage] Получено событие: GAME_START - игра началась', payload);

    //   logOutput.addMessage({ key: LogMessageKeys.LOG_START_GAME });
    // });

    // GAME_CLUE_TIMEOUT
    socketClient.onGameClueTimeout(() => {
      logOutput.addMessage({ key: LogMessageKeys.LOG_HINT_TIMEOUT });
    });

    // GAME_TURN_CHANGED
    socketClient.onGameTurnChanged((payload) => {
      if (payload.team === TeamsEnum.RED) {
        logOutput.addMessage({
          type: LogMessageType.RED,
          key: LogMessageKeys.LOG_TURN_CHANGED_RED,
        });
        logOutput.addMessage({
          type: LogMessageType.RED,
          key: LogMessageKeys.LOG_HINT_RED,
        });
      } else if (payload.team === TeamsEnum.BLUE) {
        logOutput.addMessage({
          type: LogMessageType.BLUE,
          key: LogMessageKeys.LOG_TURN_CHANGED_BLUE,
        });
        logOutput.addMessage({
          type: LogMessageType.BLUE,
          key: LogMessageKeys.LOG_HINT_BLUE,
        });
      }
    });

    // GAME_CLUE_GIVEN
    socketClient.onGameClueGiven((payload) => {
      logOutput.addMessage({
        key: LogMessageKeys.LOG_HINT_GIVEN,
        info: payload.clue,
      });

      logOutput.addMessage({ key: LogMessageKeys.LOG_VOTE_STARTED });
    });

    // GAME_CARD_CHOSEN
    // socketClient.onGameCardChosen((payload) => {
    //   console.log('[GamePage] Получено событие: GAME_CARD_CHOSEN - карта выбрана', payload);
    //   logOutput.addMessage({
    //     key: LogMessageKeys.LOG_VOTE_ENDED,
    //     info: payload.cardId,
    //   });
    // });

    //GAME_CARD_CHANGED
    socketClient.onGameVotesUpdated(() => {
      logOutput.addMessage({
        key: LogMessageKeys.LOG_VOTE_CHANGED,
      });
    });

    // GAME_CARD_SHOWN
    socketClient.onGameCardShown((payload) => {
      console.log('[GamePage] Получено событие: GAME_CARD_SHOWN - карта открыта', payload);
    });

    // GAME_ASK_ANSWER
    socketClient.onGameAskAnswer((payload) => {
      console.log(
        '[GamePage] Получено событие: GAME_ASK_ANSWER - запрос ответа на вопрос',
        payload
      );
    });

    // GAME_ANSWER_TIMEOUT
    socketClient.onGameAnswerTimeout(() => {
      console.log('[GamePage] Получено событие: GAME_ANSWER_TIMEOUT - время ответа истекло');
    });

    // GAME_ASK_CHECK
    socketClient.onGameAskCheck((payload) => {
      console.log('[GamePage] Получено событие: GAME_ASK_CHECK - запрос проверки ответа', payload);
    });

    // GAME_CHECK_RESULTS
    socketClient.onGameCheckResults((payload) => {
      console.log('[GamePage] Получено событие: GAME_CHECK_RESULTS - результаты проверки', payload);
    });

    // GAME_CHECK_TIMEOUT
    socketClient.onGameCheckTimeout(() => {
      console.log('[GamePage] Получено событие: GAME_CHECK_TIMEOUT - время проверки истекло');
    });

    // GAME_SEND_SCORE
    socketClient.onGameSendScore((payload) => {
      console.log('[GamePage] Получено событие: GAME_SEND_SCORE - обновление счета', payload);
    });

    // GAME_GAME_END
    socketClient.onGameGameEnd((payload) => {
      console.log('[GamePage] Получено событие: GAME_GAME_END - конец игры', payload);
    });
  }

  private render(): void {
    this.main.appendChildren([new GameBoardSection(), new LogChatSection()]);

    this.appendChildren([
      new Header({
        children: [
          new HeadingComponent({
            level: 1,
            content: t(TranslationKeys.GAME_TITLE),
            classes: TITLE_CLASSES,
          }),
          new ContainerComponent({
            classes: `flex gap-5 items-center`,
            children: [
              new TeamTurnIndicator({ team: store.getState().game?.currentTeam }),
              new Timer(store.getState().game?.gameTime, false),
              new ProfileSection({
                name: store.getState().username,
                id: store.getState().id,
              }).removeListeners(),
            ],
          }),
        ],
      }),
      this.main,
    ]);
  }
}
