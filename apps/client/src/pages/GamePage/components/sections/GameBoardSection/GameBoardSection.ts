import { BaseComponent, ContainerComponent } from '@ComponentsAPI';
import { SECTION_CLASSES } from '@constants/styles';
// import { Tablo } from '@pages/GamePage/components';
import { TeamHeader, Timer } from '@pages/GamePage/components';
import { GameBoard } from '@pages/GamePage/components';
import { SECOND_COUNT_FOR_ASK_CLUE } from '@repo/shared/src/socketEvents';
import { TeamsEnum } from '@shared/types/room';
import { socketClient } from '@SocketClientAPI';
import store from '@store';

const HEADER_CLASSES = {
  CONTAINER: 'grid grid-cols-3 items-center w-full',
  LEFT: 'justify-self-start',
  CENTER: 'w-full flex flex-col gap-2 justify-start items-center self-start',
  RIGHT: 'justify-self-end items-end',
};
const MAIN_CLASSES = `w-full h-full flex items-center justify-center`;

export default class GameBoardSection extends BaseComponent {
  private header: ContainerComponent;
  private main: ContainerComponent;
  private timer: Timer;
  private gameState = store.getState().game;

  constructor() {
    super({ classes: SECTION_CLASSES.SECTION });

    this.header = new ContainerComponent({ classes: HEADER_CLASSES.CONTAINER });
    this.main = new ContainerComponent({ classes: MAIN_CLASSES });

    this.timer = new Timer(
      this.gameState
        ? SECOND_COUNT_FOR_ASK_CLUE - this.gameState.phaseTime
        : SECOND_COUNT_FOR_ASK_CLUE,
      true
    );

    socketClient.onGameTurnChanged(() => this.timer.reset(SECOND_COUNT_FOR_ASK_CLUE, true));

    this.render();
  }

  private render(): void {
    if (!this.gameState) return;

    const leftColumn = new TeamHeader({
      team: TeamsEnum.BLUE,
      players: this.gameState.blueTeam,
      classes: HEADER_CLASSES.LEFT,
    });
    const centerColumn = new ContainerComponent({
      classes: HEADER_CLASSES.CENTER,
      // children: [new Tablo(), this.timer],
      children: [this.timer],
    });
    const rightColumn = new TeamHeader({
      team: TeamsEnum.RED,
      players: this.gameState.redTeam,
      classes: HEADER_CLASSES.RIGHT,
    });

    this.header.appendChildren([leftColumn, centerColumn, rightColumn]);

    this.main.appendChildren([
      new GameBoard({ cards: this.gameState.cards, isSpymaster: this.gameState.isSpymaster }),
    ]);

    this.appendChildren([this.header, this.main]);
  }
}
