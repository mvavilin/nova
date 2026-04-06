import { BaseComponent, ContainerComponent } from '@ComponentsAPI';
import { type Card, CardColorEnum } from '@repo/shared/src/types/game';

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

    this.render(card.word);
  }

  private render(word: string): void {
    this.appendChildren(new ContainerComponent({ classes: CARD_CLASSES.CONTENT, content: word }));
  }

  // feat: add card color and status change
}
