import { BaseComponent, ContainerComponent } from '@ComponentsAPI';
import { type Card, CardColorEnum } from '@repo/shared/src/types/game';
import { type Player } from '@shared/types/room';

type CardProperties = {
  card: Card;
  isSpymaster: boolean;
  onSelect: (cardId: string) => void;
};

const CARD_CLASSES = {
  CONTAINER: `relative p-1 flex items-center justify-center rounded w-22 h-22 select-none pointer-events-none`,
  CONTENT: `font-bold text-sm text-center wrap-anywhere leading-none text-black`,
  AVAILABLE_TO_CLICK: `cursor-pointer transition-all duration-300 hover:scale-105 hover:bg-orange-400`,
  VOTES: `absolute bottom-1 right-1 text-xs font-bold bg-white text-black px-1 rounded`,
};

export default class CardComponent extends BaseComponent {
  private cardId: string;
  private onSelect: (cardId: string) => void;
  private votesBadge: ContainerComponent;

  constructor({ card, isSpymaster, onSelect }: CardProperties) {
    super({
      classes: `${CARD_CLASSES.CONTAINER} ${CardColorEnum.neutral}`,
      listeners: {
        click: (): void => this.onSelect(this.cardId),
      },
    });

    this.cardId = card.id;
    this.onSelect = onSelect;

    if (isSpymaster) {
      this.removeClasses(CardColorEnum.neutral);
      this.setClasses(CardColorEnum[card.color]);
    }

    this.votesBadge = new ContainerComponent({
      classes: CARD_CLASSES.VOTES,
      content: '',
    });

    this.render(card);

    //   socketClient.onGameClueGiven(() => {
    //     this.setClasses(CARD_CLASSES.AVAILABLE_TO_CLICK);
    //   });

    //   socketClient.onGameTurnChanged((payload) => {
    //     const isMyTurn = payload.team === this.gameState?.myTeam;
    //     if (!isMyTurn) {
    //       this.removeClasses(CARD_CLASSES.AVAILABLE_TO_CLICK);
    //     }
    //   });

    //   socketClient.onGameCardShown((payload) => {
    //     console.log(111);
    //     if (payload.cardId === card.id) {
    //       console.log(222);
    //       this.removeClasses(CardColorEnum.neutral);
    //       this.removeClasses(CARD_CLASSES.AVAILABLE_TO_CLICK);
    //       this.setClasses(payload.color);
    //       this.setVotes([]);
    //     }
    //   });
  }

  private render(card: Card): void {
    this.appendChildren([
      new ContainerComponent({
        classes: CARD_CLASSES.CONTENT,
        content: card.word,
      }),
      this.votesBadge,
    ]);
  }

  public makeAbleToClick(isAble: boolean): void {
    if (isAble) {
      this.setClasses(CARD_CLASSES.AVAILABLE_TO_CLICK);
      this.removeClasses('pointer-events-none');
    } else {
      this.removeClasses(CARD_CLASSES.AVAILABLE_TO_CLICK);
      this.setClasses('pointer-events-none');
    }
  }

  // установка количества голосов
  public setVotes(players: Player[]): void {
    if (players.length === 0) {
      this.votesBadge.setContent('');
      return;
    }

    this.votesBadge.setContent(String(players.length));
  }

  public setSelected(selected: boolean): void {
    if (selected) {
      this.removeClasses(CardColorEnum.neutral);
      this.setClasses(CardColorEnum.selected);
    } else {
      this.removeClasses(CardColorEnum.selected);
      this.setClasses(CardColorEnum.neutral);
    }
  }

  // feat: add card color and status change
}
