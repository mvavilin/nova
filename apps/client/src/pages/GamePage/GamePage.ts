import { ContainerComponent, HeadingComponent } from '@api/ComponentsAPI';
import { Header } from '@components';

import { GAME_PAGE_BACKGROUND } from '@assets/backgrounds';

import { TITLE_CLASSES } from '@constants/styles';
import { logOutput, TeamTurnIndicator, Timer } from '@pages/GamePage/components';
import { GameBoardSection, LogChatSection } from '@pages/GamePage/components/sections';

import { TeamsEnum } from '@repo/shared/src/types/room';
import { t } from '@i18n';
import { TranslationKeys } from '@i18n/translationKeys';
import { getSessionStorageData } from '@utils';
import { SESSION_STORAGE_KEYS } from '@constants/sessionStorageKeys';
import { socketClient } from '@SocketClientAPI';
import { LogMessageKeys, LogMessageType } from '@shared/types/logMessage';

const GAME_PAGE_CLASSES = `w-full h-full flex flex-col items-center justify-start gap-5 px-20 py-5 bg-cover bg-right font-text`;
const MAIN_CLASSES = `w-full h-full max-w-7xl grid grid-cols-2 grid-cols-[3fr_1fr] gap-5 text-white rounded`;

export default class GamePage extends ContainerComponent {
  private main: ContainerComponent;

  constructor() {
    super({ id: 'game-page', classes: GAME_PAGE_CLASSES });

    this.setStyle({ backgroundImage: `url(${GAME_PAGE_BACKGROUND})` });

    this.main = new ContainerComponent({ tag: 'main', classes: MAIN_CLASSES });

    this.render();

    socketClient.onGameAskClue(() => {
      logOutput.addMessage({
        type: LogMessageType.SYSTEM,
        key: LogMessageKeys.LOG_HINT_PHASE_STARTED,
      });
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
            classes: `flex gap-2`,
            children: [
              new TeamTurnIndicator({ team: TeamsEnum.RED }),
              new Timer(
                getSessionStorageData<number>(SESSION_STORAGE_KEYS.GAME_TIME) || 0,
                false,
                SESSION_STORAGE_KEYS.GAME_TIME
              ),
            ],
          }),
        ],
      }),
      this.main,
    ]);
  }
}
