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
  SECOND_COUNT_FOR_GUESS,
  TIMER_INTERVAL,
  type CardTestResult,
  type ErrorCode,
  type GAME_PHASE,
} from '../../../../packages/shared/src/socketEvents.ts';
import type { CheckQuestion } from '../../../../packages/shared/src/types/question.ts';

export class Game {
  private id: string;
  private roomId: string;
  private redTeam: Player[] = [];
  private blueTeam: Player[] = [];
  private maxPlayers: number;
  private cards: Card[] = [];
  private currentTeam: Teams = 'red';
  private gamePhase: GAME_PHASE = 'clue';
  private chosenCards: Map<string, string[]> = new Map();
  private checkQuestion: CheckQuestion | null = null;
  private gameTimer: NodeJS.Timeout | null = null;
  private gameTime: number = 0;
  private phaseTimer: NodeJS.Timeout | null = null;
  private phaseTime: number = 0;

  constructor(roomId: string, maxPlayers: number) {
    this.id = uuid();
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
        (player && card.whoSees.has(player.team)) || (player && player.role === 'spymaster')
          ? card.color
          : 'unknown',
    }));

    return {
      id: this.id,
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
    this.gameTimer = setInterval(() => {
      this.gameTime += 1;
    }, 1000);
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
        this.cards.push({ id: uuid(), word, color, whoSees: new Set() });
      }
    }
  }

  public askClue(callback: (team: Teams) => void): string | undefined {
    const team = this.currentTeam === 'red' ? this.redTeam : this.blueTeam;
    const spymaster = team.find((player) => player.role === 'spymaster');
    if (spymaster) {
      this.phaseTime = 0;
      this.phaseTimer = setInterval(() => {
        this.phaseTime += 1;
        if (this.phaseTime >= SECOND_COUNT_FOR_ASK_CLUE) {
          this.phaseTime = 0;
          if (this.phaseTimer) {
            clearInterval(this.phaseTimer);
            this.phaseTimer = null;
          }
          this.turnChange();
          callback(this.currentTeam);
        }
      }, TIMER_INTERVAL);

      return spymaster.id;
    }

    return;
  }

  public giveClue(
    userId: string,
    clue: string,
    callback: (result: CardTestResult) => void
  ): { clue: string; agentIds: string[] } | { error: ErrorCode } {
    const team = this.currentTeam === 'red' ? this.redTeam : this.blueTeam;
    const spymaster = team.find((player) => player.role === 'spymaster' && player.id === userId);

    if (spymaster && this.gamePhase === 'clue') {
      this.gamePhase = 'guess';

      this.phaseTime = 0;
      this.phaseTimer = setInterval(() => {
        this.phaseTime += 1;
        if (this.phaseTime >= SECOND_COUNT_FOR_GUESS) {
          this.phaseTime = 0;
          if (this.phaseTimer) {
            clearInterval(this.phaseTimer);
            this.phaseTimer = null;
          }
          const result = this.guessTest();
          callback(result);
        }
      }, TIMER_INTERVAL);

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

      if (card && !card.whoSees.has(agent.team)) {
        let choice = this.chosenCards.get(cardId);
        if (choice) {
          if (choice.includes(userId)) {
            choice = choice.filter((id) => id !== userId);
          } else {
            choice.push(userId);
          }
        } else {
          choice = [userId];
        }
        this.chosenCards.set(cardId, choice);
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

  private guessTest(): CardTestResult {
    const termWithCardId = 0;
    const termWithUserIds = 1;
    let userIdCount = 0;
    let choices = [...this.chosenCards.entries()];
    for (const choice of choices) {
      if (choice[termWithUserIds].length > userIdCount) {
        userIdCount = choice[termWithUserIds].length;
      }
    }
    if (userIdCount > 0) {
      choices = choices.filter((choice) => choice[termWithUserIds].length === userIdCount);
      const choice = choices[Math.floor(Math.random() * choices.length)];
      if (choice) {
        const cardId = choice[termWithCardId];
        const card = this.cards.find((card) => card.id === cardId);
        const opponentColor = this.currentTeam === 'red' ? 'blue' : 'red';
        if (card) {
          switch (card.color) {
            case this.currentTeam: {
              const userIds = choice[termWithUserIds];
              const userId = userIds[Math.floor(Math.random() * userIds.length)];
              const checkQuestion = this.getCheckQuestion(card.word);
              if (userId && checkQuestion) {
                this.checkQuestion = checkQuestion;
                const { question, question_en } = this.checkQuestion;
                const team = this.currentTeam === 'red' ? this.redTeam : this.blueTeam;
                const observers = team
                  .filter((player) => player.id !== userId)
                  .map((player) => player.id);
                return { type: 'own', payload: { userId, question, question_en, observers } };
              }
              break;
            }
            case opponentColor:
            case 'neutral': {
              const team = this.currentTeam === 'red' ? this.redTeam : this.blueTeam;
              const recipients = team.map((player) => player.id);
              card.whoSees.add(this.currentTeam);
              const { id: cardId, color } = card;
              const spymasterId = this.turnChange();
              return {
                type: card.color === opponentColor ? 'alien' : 'neutral',
                payload: { spymasterId, team: this.currentTeam, cardId, color, recipients },
              };
            }
          }
        }
      }
    }

    const spymasterId = this.turnChange();
    return { type: 'no-change', payload: { team: this.currentTeam, spymasterId } };
  }

  private getCheckQuestion(word: string): CheckQuestion | undefined {
    const termWithWord = 0;
    const termWithCheckQuestions = 1;
    const entries = Object.entries(jsonData);
    const entry = entries.find((entry) => entry[termWithWord] === word);
    if (entry) {
      const list = entry[termWithCheckQuestions];
      const checkQuestion = list[Math.floor(Math.random() * list.length)];
      if (checkQuestion) {
        return checkQuestion;
      }
    }

    return;
  }
}
