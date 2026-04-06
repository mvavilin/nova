import { type Card } from '@repo/shared/src/types/game';

import { ContainerComponent } from '@ComponentsAPI';
import { CardComponent } from '@pages/GamePage/components';

type GameBoardProperties = {
  cards: Card[];
  isSpymaster: boolean;
};

const GAME_BOARD_CLASSES = `p-2 rounded bg-white grid grid-cols-5 grid-rows-5 gap-2`;

export default class GameBoard extends ContainerComponent {
  constructor({ cards, isSpymaster }: GameBoardProperties) {
    super({ classes: GAME_BOARD_CLASSES });

    this.render(cards, isSpymaster);
  }

  private render(cards: Card[], isSpymaster: boolean): void {
    for (const card of cards) {
      this.appendChildren([new CardComponent({ card, isSpymaster })]);
    }
  }
}
