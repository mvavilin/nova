import { Role, type Card } from '@__mocks__';

import { ContainerComponent } from '@ComponentsAPI';
import { CardComponent } from '@pages/GamePage/components';

type GameBoardProperties = {
  cards: Card[];
  role: Role;
};

const GAME_BOARD_CLASSES = `p-2 rounded bg-white grid grid-cols-5 grid-rows-5 gap-2`;

export default class GameBoard extends ContainerComponent {
  constructor({ cards, role }: GameBoardProperties) {
    super({ classes: GAME_BOARD_CLASSES });

    this.render(cards, role);
  }

  private render(cards: Card[], role: Role): void {
    for (const card of cards) {
      this.appendChildren([new CardComponent({ card, role })]);
    }
  }
}
