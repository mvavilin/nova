import { ContainerComponent, HeadingComponent } from '@api/ComponentsAPI';
import { Header } from '@components';

import { GAME_PAGE_BACKGROUND } from '@assets/backgrounds';

import { TITLE_CLASSES } from '@constants/styles';
import { Timer } from '@pages/GamePage/components';
import { LogChatSection } from '@pages/GamePage/components/sections';

const GAME_PAGE_CLASSES = `w-full h-full flex flex-col items-center justify-start gap-5 px-20 py-5 bg-cover bg-right font-text`;
const MAIN_CLASSES = `w-full h-full grid grid-cols-2 grid-cols-[1fr_3fr] gap-5 text-white rounded`;

export default class GamePage extends ContainerComponent {
  private main: ContainerComponent;

  constructor() {
    super({ id: 'game-page', classes: GAME_PAGE_CLASSES });

    this.setStyle({ backgroundImage: `url(${GAME_PAGE_BACKGROUND})` });

    this.main = new ContainerComponent({ tag: 'main', classes: MAIN_CLASSES });

    this.render();
  }

  private render(): void {
    this.main.appendChildren([new LogChatSection()]);

    this.appendChildren([
      new Header({
        children: [
          new HeadingComponent({ level: 1, content: 'ИГРА', classes: TITLE_CLASSES }),
          new Timer(),
        ],
      }),
      this.main,
    ]);
  }
}
