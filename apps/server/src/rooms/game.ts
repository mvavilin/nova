import {
  CardCounts,
  type Card,
  type CardColor,
  type GameInfo,
} from '../../../../packages/shared/src/types/game.ts';
import type { Player, Teams } from '../../../../packages/shared/src/types/room.ts';
import jsonData from '../../../../packages/shared/src/question-bank.json' with { type: 'json' };
import { v4 as uuid } from 'uuid';
import {
  SECOND_COUNT_FOR_ASK_CLUE,
  type ErrorCode,
  type GAME_PHASE,
} from '../../../../packages/shared/src/socketEvents.ts';

export class Game {
  private roomId: string;
  private redTeam: Player[] = [];
  private blueTeam: Player[] = [];
  private maxPlayers: number;
  private cards: Card[] = [];
  private currentTeam: Teams = 'red';
  private clueTimer: NodeJS.Timeout | null = null;
  private gamePhase: GAME_PHASE = 'clue';
  private chosenCards: Map<string, string[]> = new Map();

  constructor(roomId: string, maxPlayers: number) {
    this.roomId = roomId;
    this.maxPlayers = maxPlayers;
  }

  public addPlayer(player: Player): void {
    if (player.team === 'red') this.redTeam.push(player);
    if (player.team === 'blue') this.blueTeam.push(player);
  }

  public getRoomId(): string {
    return this.roomId;
  }

  public isFull(): boolean {
    return this.redTeam.length + this.blueTeam.length >= this.maxPlayers;
  }

  public getGameInfo(playerId: string): GameInfo {
    const player = this.getPlayer(playerId);

    const cards: Card[] = this.cards.map((card) => ({
      ...card,
      color:
        card.status === 'revealed' || (player && player.role === 'spymaster')
          ? card.color
          : 'unknown',
    }));

    return {
      redTeam: this.redTeam,
      blueTeam: this.blueTeam,
      currentTeam: this.currentTeam,
      cards,
    };
  }

  // public getSpymasterIds(): string[] {
  //   return this.getAllPlayers()
  //     .filter((player) => player.role === 'spymaster')
  //     .map((player) => player.id);
  // }

  // public getAgentIds(): string[] {
  //   return this.getAllPlayers()
  //     .filter((player) => player.role === 'agent')
  //     .map((player) => player.id);
  // }

  private getAllPlayers(): Player[] {
    return [...this.redTeam, ...this.blueTeam];
  }

  public getPlayerIds(): string[] {
    return this.getAllPlayers().map((player) => player.id);
  }

  public getPlayer(userId: string): Player | undefined {
    return this.getAllPlayers().find((player) => player.id === userId);
  }

  public removePlayer(userId: string): void {
    this.redTeam = this.redTeam.filter((player) => player.id !== userId);
    this.blueTeam = this.blueTeam.filter((player) => player.id !== userId);
  }

  public initial(): void {
    this.createCards();
  }

  private createCards(): void {
    const words = Object.keys(jsonData)
      .toSorted(() => Math.random() - 0.5)
      .slice(0, CardCounts.ALL);

    const colors: CardColor[] = [];
    for (let i = 0; i < CardCounts.RED; i++) colors.push('red');
    for (let i = 0; i < CardCounts.BLUE; i++) colors.push('blue');
    for (let i = 0; i < CardCounts.NEUTRAL; i++) colors.push('neutral');
    colors.push('bomb');
    colors.sort(() => Math.random() - 0.5);

    for (let i = 0; i < CardCounts.ALL; i++) {
      const word = words[i];
      const color = colors[i];
      if (word && color) {
        this.cards.push({ id: uuid(), word, color, status: 'hidden' });
      }
    }
  }

  public askClue(callback: (value: string, team: Teams) => void): string | undefined {
    const currentTeam = this.currentTeam;
    const team = currentTeam === 'red' ? this.redTeam : this.blueTeam;
    const spymaster = team.find((player) => player.role === 'spymaster');
    if (spymaster) {
      this.clueTimer = setTimeout(() => {
        this.clueTimer = null;
        const spymasterId = this.turnChange();
        callback(spymasterId, this.currentTeam);
      }, SECOND_COUNT_FOR_ASK_CLUE * 1000);
      return spymaster.id;
    }

    return;
  }

  public giveClue(
    userId: string,
    clue: string
  ): { clue: string; agentIds: string[] } | { error: ErrorCode } {
    const team = this.currentTeam === 'red' ? this.redTeam : this.blueTeam;
    const spymaster = team.find((player) => player.role === 'spymaster' && player.id === userId);

    if (spymaster && this.gamePhase === 'clue') {
      if (this.clueTimer) {
        clearTimeout(this.clueTimer);
        this.clueTimer = null;
      }
      this.gamePhase = 'guess';
      const agentIds = team.filter((player) => player.role === 'agent').map((player) => player.id);
      return { clue, agentIds };
    }
    return { error: 'ACTION_IS_PROHIBITED' };
  }

  public chooseCard(
    userId: string,
    cardId: string
  ): { players: Player[]; recipients: string[] } | { error: ErrorCode } {
    const team = this.currentTeam === 'red' ? this.redTeam : this.blueTeam;
    const agent = team.find((player) => player.role === 'agent' && player.id === userId);

    if (agent && this.gamePhase === 'guess') {
      const card = this.cards.find((card) => card.id === cardId);

      if (card && card.status === 'hidden') {
        let choice = this.chosenCards.get(this.roomId);
        if (choice) {
          if (choice.includes(userId)) {
            choice = choice.filter((id) => id !== userId);
          } else {
            choice.push(userId);
          }
        } else {
          choice = [userId];
        }
        this.chosenCards.set(this.roomId, choice);
        const players = team.filter((player) => choice.includes(player.id));
        const recipients = team.map((player) => player.id);
        return { players, recipients };
      }
    }
    return { error: 'ACTION_IS_PROHIBITED' };
  }

  private turnChange(): string {
    this.currentTeam = this.currentTeam === 'red' ? 'blue' : 'red';
    this.gamePhase = 'clue';
    const team = this.currentTeam === 'red' ? this.redTeam : this.blueTeam;
    const spymaster = team.find((player) => player.role === 'spymaster');
    this.chosenCards.clear();
    if (spymaster) {
      return spymaster.id;
    }
    return '';
  }
}
