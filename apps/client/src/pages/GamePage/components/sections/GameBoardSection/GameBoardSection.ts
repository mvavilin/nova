import { SESSION_STORAGE_KEYS } from '@constants/sessionStorageKeys';
import { blueTeam, redTeam, Role, cards } from '@__mocks__';
import { BaseComponent, ContainerComponent } from '@ComponentsAPI';
import { SECTION_CLASSES } from '@constants/styles';
// import { Tablo } from '@pages/GamePage/components';
import { TeamHeader, Timer, GameBoard } from '@pages/GamePage/components';
import { SECOND_COUNT_FOR_ASK_CLUE } from '@repo/shared/src/socketEvents';
import { getSessionStorageData } from '@utils';
import { socketClient } from '@SocketClientAPI';

const HEADER_CLASSES = {
  CONTAINER: 'grid grid-cols-3 items-center w-full',
  LEFT: 'justify-self-start',
  CENTER: 'w-full flex flex-col gap-2 justify-start items-center self-start',
  RIGHT: 'justify-self-end',
};
const MAIN_CLASSES = `w-full h-full flex items-center justify-center`;

export default class GameBoardSection extends BaseComponent {
  private header: ContainerComponent;
  private main: ContainerComponent;
  private timer: Timer;

  constructor() {
    super({ classes: SECTION_CLASSES.SECTION });

    this.header = new ContainerComponent({ classes: HEADER_CLASSES.CONTAINER });
    this.main = new ContainerComponent({ classes: MAIN_CLASSES });

    this.timer = new Timer(
      getSessionStorageData<number>(SESSION_STORAGE_KEYS.TURN_TIMER) || SECOND_COUNT_FOR_ASK_CLUE,
      true,
      SESSION_STORAGE_KEYS.TURN_TIMER
    );

    socketClient.onGameTurnChanged(() => this.timer.reset(SECOND_COUNT_FOR_ASK_CLUE, true));

    this.render();
  }

  private render(): void {
    const leftColumn = new TeamHeader({ ...blueTeam, classes: HEADER_CLASSES.LEFT });
    const centerColumn = new ContainerComponent({
      classes: HEADER_CLASSES.CENTER,
      // children: [new Tablo(), this.timer],
      children: [this.timer],
    });
    const rightColumn = new TeamHeader({ ...redTeam, classes: HEADER_CLASSES.RIGHT });

    this.header.appendChildren([leftColumn, centerColumn, rightColumn]);

    this.main.appendChildren([new GameBoard({ cards, role: Role.SPYMASTER })]);
    // this.main.appendChildren([new GameBoard({ cards, role: Role.OPERATIVE })]);

    this.appendChildren([this.header, this.main]);
  }
}
