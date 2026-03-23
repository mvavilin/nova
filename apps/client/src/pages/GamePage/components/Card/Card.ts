import { Role, type Card, CardColor, CardStatus } from '@__mocks__';
import { BaseComponent, ContainerComponent } from '@ComponentsAPI';

type CardProperties = {
  card: Card;
  role: Role;
};

const CARD_CLASSES = {
  CONTAINER: `relative p-1 flex items-center justify-center rounded w-22 h-22 select-none cursor-pointer transition-all duration-300 hover:scale-105`,
  CONTENT: `font-bold text-sm text-center wrap-anywhere leading-none text-black`,
};

export default class CardComponent extends BaseComponent {
  constructor({ card, role }: CardProperties) {
    super({ classes: `${CARD_CLASSES.CONTAINER} ${CardColor.NEUTRAL}` });

    if (role === Role.SPYMASTER || card.status === CardStatus.REVEALED) {
      this.removeClasses(CardColor.NEUTRAL);
      this.setClasses(card.color);
    }

    this.render(card.word);
  }

  private render(word: string): void {
    this.appendChildren(new ContainerComponent({ classes: CARD_CLASSES.CONTENT, content: word }));
  }

  // feat: add card color and status change
}
