import { type Card } from '@repo/shared/src/types/game';
import { ContainerComponent } from '@ComponentsAPI';
import { CardComponent } from '@pages/GamePage/components';
import store from '@/store/store';
import { GameActionTypes } from '@/store/actions';
import { socketClient } from '@/api/SocketClientAPI';
import { type Player } from '@shared/types/room';

type GameBoardProperties = {
  cards: Card[];
  isSpymaster: boolean;
};

const GAME_BOARD_CLASSES = `p-2 rounded bg-white grid grid-cols-5 grid-rows-5 gap-2`;

export default class GameBoard extends ContainerComponent {
  private selectedCardId: string | null = null;
  private cardsMap = new Map<string, CardComponent>();
  private votesMap = new Map<string, Player[]>();
  private gameState = store.getState().game;

  constructor({ cards, isSpymaster }: GameBoardProperties) {
    super({ classes: GAME_BOARD_CLASSES });

    this.render(cards, isSpymaster);

    socketClient.onGameClueGiven(() => {
      for (const card of this.cardsMap.values()) {
        card.makeAbleToClick(true);
      }
    });

    socketClient.onGameTurnChanged((payload) => {
      const isMyTurn = payload.team === this.gameState?.myTeam;
      if (!isMyTurn) {
        for (const card of this.cardsMap.values()) {
          card.makeAbleToClick(false);
        }
      }
    });

    // socketClient.onGameCardShown((payload) => {
    //   console.log(111);
    //   if (payload.cardId === card.id) {
    //     console.log(222);
    //     this.removeClasses(CardColorEnum.neutral);
    //     this.removeClasses(CARD_CLASSES.AVAILABLE_TO_CLICK);
    //     this.setClasses(payload.color);
    //     this.setVotes([]);
    //   }
    // });

    socketClient.onGameVotesUpdated((payload) => {
      const { votes } = payload;

      // обновляем локальный cache
      this.votesMap.clear();

      for (const cardId in votes) {
        const players = votes[cardId];
        if (!players) continue;

        this.votesMap.set(cardId, players);
      }

      // обновляем UI
      this.syncVotesToUI();
    });
  }

  private render(cards: Card[], isSpymaster: boolean): void {
    for (const card of cards) {
      const cardComponent = new CardComponent({
        card,
        isSpymaster,
        onSelect: (id): void => this.handleSelect(id),
      });
      this.cardsMap.set(card.id, cardComponent);
      this.appendChildren(cardComponent);
    }
  }

  private syncVotesToUI(): void {
    for (const [id, card] of this.cardsMap.entries()) {
      const players = this.votesMap.get(id) ?? [];
      card.setVotes(players);
      card.setSelected(this.selectedCardId === id);
    }
  }

  private handleSelect(cardId: string): void {
    if (this.selectedCardId === cardId) {
      // double click → снять выделение
      this.cardsMap.get(cardId)?.setSelected(false);
      this.selectedCardId = null;

      store.dispatch({
        type: GameActionTypes.GAME_CARD_CHOOSE,
        payload: { cardId },
      });

      return;
    }

    // снять старое выделение
    if (this.selectedCardId) {
      this.cardsMap.get(this.selectedCardId)?.setSelected(false);
    }

    // поставить новое
    this.selectedCardId = cardId;
    this.cardsMap.get(cardId)?.setSelected(true);

    store.dispatch({
      type: GameActionTypes.GAME_CARD_CHOOSE,
      payload: { cardId },
    });
  }
}
