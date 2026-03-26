import { ContainerComponent, HeadingComponent } from '@api/ComponentsAPI';
import { Header } from '@components';

import { GAME_PAGE_BACKGROUND } from '@assets/backgrounds';

import { TITLE_CLASSES } from '@constants/styles';
import { TeamTurnIndicator, Timer } from '@pages/GamePage/components';
import { GameBoardSection, LogChatSection } from '@pages/GamePage/components/sections';

import { Team } from '@__mocks__';
import { t } from '@i18n';
import { TranslationKeys } from '@i18n/translationKeys';

const GAME_PAGE_CLASSES = `w-full h-full flex flex-col items-center justify-start gap-5 px-20 py-5 bg-cover bg-right font-text`;
const MAIN_CLASSES = `w-full h-full grid grid-cols-2 grid-cols-[3fr_1fr] gap-5 text-white rounded`;

export default class GamePage extends ContainerComponent {
  private main: ContainerComponent;

  constructor() {
    super({ id: 'game-page', classes: GAME_PAGE_CLASSES });

    this.setStyle({ backgroundImage: `url(${GAME_PAGE_BACKGROUND})` });

    this.main = new ContainerComponent({ tag: 'main', classes: MAIN_CLASSES });

    this.render();
  }

  private render(): void {
    this.main.appendChildren([new GameBoardSection(), new LogChatSection()]);

    this.appendChildren([
      new Header({
        children: [
          new HeadingComponent({
            level: 1,
            content: t(TranslationKeys.LOBBY_TITLE),
            classes: TITLE_CLASSES,
          }),
          new TeamTurnIndicator({ team: Team.RED }),
          new Timer(),
        ],
      }),
      this.main,
    ]);
  }
}
