import { BaseComponent, ContainerComponent } from '@ComponentsAPI';
import { type Card, CardColorEnum } from '@repo/shared/src/types/game';
import store from '@/store/store';
import { GameActionTypes } from '@/store/actions';
import { socketClient } from '@/api/SocketClientAPI';

type CardProperties = {
  card: Card;
  isSpymaster: boolean;
};

const CARD_CLASSES = {
  CONTAINER: `relative p-1 flex items-center justify-center rounded w-22 h-22 select-none cursor-pointer transition-all duration-300 hover:scale-105`,
  CONTENT: `font-bold text-sm text-center wrap-anywhere leading-none text-black`,
};

export default class CardComponent extends BaseComponent {
  constructor({ card, isSpymaster }: CardProperties) {
    super({ classes: `${CARD_CLASSES.CONTAINER} ${CardColorEnum.neutral}` });

    if (isSpymaster) {
      this.removeClasses(CardColorEnum.neutral);
      this.setClasses(CardColorEnum[card.color]);
    }

    this.render(card);

    socketClient.onGameCardShown((payload) => {
      if (payload.cardId === card.id) {
        console.log(2222);
        this.setClasses(payload.color);
      }
    });
  }

  private render(card: Card): void {
    this.appendChildren(
      new ContainerComponent({
        classes: CARD_CLASSES.CONTENT,
        content: card.word,
        listeners: {
          click: (): void => this.handleClick(card.id),
        },
      })
    );
  }

  private handleClick(cardId: string): void {
    store.dispatch({
      type: GameActionTypes.GAME_CARD_CHOOSE,
      payload: { cardId },
    });
  }

  // feat: add card color and status change
}
