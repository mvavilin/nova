import {
  CardCounts,
  type Card,
  type CardColor,
  type ChosenCard,
  type GAME_PHASE,
  type GameEndInfo,
  type GameInfo,
  type GameStateForClient,
  type GamePhaseInfo,
  type PlayerScore,
  type Score,
} from '../../../../packages/shared/src/types/game.ts';
import type { Player, Teams } from '../../../../packages/shared/src/types/room.ts';
import jsonData from '../../../../packages/shared/src/question-bank.json' with { type: 'json' };
import { v4 as uuid } from 'uuid';
import {
  SECOND_COUNT_FOR_ANSWER,
  SECOND_COUNT_FOR_ASK_CLUE,
  SECOND_COUNT_FOR_CHECK,
  SECOND_COUNT_FOR_GUESS,
  type CardTestResult,
  type CheckResults,
  type ErrorCode,
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
  private answerUserId: string | undefined;
  private answerCard: Card | null = null;
  private accepts: Array<{ userId: string; accept: boolean }> = [];
  private score: Score = { red: 0, blue: 0 };
  private playerAnswers = new Map<string, boolean[]>();
  private playerChoices: Map<string, string> = new Map();

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
    if (!spymaster) return;

    this.gamePhase = 'clue';

    this.runPhaseTimer(SECOND_COUNT_FOR_ASK_CLUE, () => {
      this.turnChange();
      callback(this.currentTeam);
    });

    return spymaster.id;
  }

  public giveClue(
    userId: string,
    clue: string,
    callback: (result: CardTestResult) => void
  ): { clue: string; agentIds: string[] } | { error: ErrorCode } {
    const team = this.currentTeam === 'red' ? this.redTeam : this.blueTeam;
    const spymaster = team.find((player) => player.role === 'spymaster' && player.id === userId);

    if (!spymaster || this.gamePhase !== 'clue') {
      return { error: 'ACTION_IS_PROHIBITED' };
    }

    this.gamePhase = 'guess';
    this.runPhaseTimer(SECOND_COUNT_FOR_GUESS, () => {
      const result = this.guessTest();
      callback(result);
    });

    const agentIds = team.filter((player) => player.role === 'agent').map((player) => player.id);
    return { clue, agentIds };
  }

  // public chooseCard(
  //   userId: string,
  //   cardId: string
  // ): { players: Player[]; recipients: string[] } | { error: ErrorCode } {
  //   const team = this.currentTeam === 'red' ? this.redTeam : this.blueTeam;
  //   const agent = team.find((player) => player.role === 'agent' && player.id === userId);

  //   if (agent && this.gamePhase === 'guess') {
  //     const card = this.cards.find((card) => card.id === cardId);

  //     if (card && !card.whoSees.has(agent.team)) {
  //       let choice = this.chosenCards.get(cardId);
  //       if (choice) {
  //         if (choice.includes(userId)) {
  //           choice = choice.filter((id) => id !== userId);
  //         } else {
  //           choice.push(userId);
  //         }
  //       } else {
  //         choice = [userId];
  //       }
  //       this.chosenCards.set(cardId, choice);
  //       const players = team.filter((player) => choice.includes(player.id));
  //       const recipients = team.map((player) => player.id);
  //       return { players, recipients };
  //     }
  //   }
  //   return { error: 'ACTION_IS_PROHIBITED' };
  // }

  public chooseCard(
    userId: string,
    cardId: string
  ): { players: Player[]; recipients: string[] } | { error: ErrorCode } {
    const team = this.currentTeam === 'red' ? this.redTeam : this.blueTeam;

    const agent = team.find((player) => player.role === 'agent' && player.id === userId);

    if (!agent || this.gamePhase !== 'guess') {
      return { error: 'ACTION_IS_PROHIBITED' };
    }

    const card = this.cards.find((card) => card.id === cardId);

    if (!card || card.whoSees.has(agent.team)) {
      return { error: 'ACTION_IS_PROHIBITED' };
    }

    const currentChoice = this.playerChoices.get(userId);

    // 🔁 toggle логика
    if (currentChoice === cardId) {
      // снять выбор
      this.playerChoices.delete(userId);
    } else {
      // заменить или поставить новый
      this.playerChoices.set(userId, cardId);
    }

    // 📊 собрать игроков, выбравших эту карту
    const players = team.filter((player) => this.playerChoices.get(player.id) === cardId);

    // 📡 отправляем всей команде
    const recipients = team.map((player) => player.id);

    return { players, recipients };
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
    this.stopPhaseTimer();
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
            case this.currentTeam:
            case 'neutral': {
              return this.chosenOwnCard(choice, card);
            }
            case opponentColor: {
              return this.chosenOpponentCard(card);
            }
            case 'bomb': {
              return this.chosenBombCard(card);
            }
          }
        }
      }
    }

    const team = this.currentTeam === 'red' ? this.redTeam : this.blueTeam;
    const playerIds = team.map((player) => player.id);
    const spymasterId = this.turnChange();
    return { type: 'no-change', payload: { team: this.currentTeam, spymasterId, playerIds } };
  }

  // private guessTest(): CardTestResult {
  //   this.stopPhaseTimer();

  //   const team = this.currentTeam === 'red' ? this.redTeam : this.blueTeam;

  //   // ❗ 0 голосов → смена хода
  //   if (this.playerChoices.size === 0) {
  //     const playerIds = team.map((player) => player.id);
  //     const spymasterId = this.turnChange();

  //     return {
  //       type: 'no-change',
  //       payload: { team: this.currentTeam, spymasterId, playerIds },
  //     };
  //   }

  //   // 📊 группируем: cardId → userIds[]
  //   const grouped = new Map<string, string[]>();

  //   for (const [userId, cardId] of this.playerChoices.entries()) {
  //     if (!grouped.has(cardId)) {
  //       grouped.set(cardId, []);
  //     }
  //     grouped.get(cardId)!.push(userId);
  //   }

  //   // 🔍 ищем максимум голосов
  //   let maxVotes = 0;
  //   let candidates: [string, string[]][] = [];

  //   for (const entry of grouped.entries()) {
  //     const count = entry[1].length;

  //     if (count > maxVotes) {
  //       maxVotes = count;
  //       candidates = [entry];
  //     } else if (count === maxVotes) {
  //       candidates.push(entry);
  //     }
  //   }

  //   // 🎲 если несколько — случайная карта
  //   const [cardId, userIds] = candidates[Math.floor(Math.random() * candidates.length)];

  //   const card = this.cards.find((c) => c.id === cardId);
  //   if (!card) {
  //     const playerIds = team.map((player) => player.id);
  //     const spymasterId = this.turnChange();

  //     return {
  //       type: 'no-change',
  //       payload: { team: this.currentTeam, spymasterId, playerIds },
  //     };
  //   }

  //   const opponentColor = this.currentTeam === 'red' ? 'blue' : 'red';

  //   // 🧹 очищаем выборы перед дальнейшей логикой
  //   this.playerChoices.clear();

  //   switch (card.color) {
  //     case this.currentTeam:
  //     case 'neutral': {
  //       // 👤 выбираем отвечающего
  //       const userId = userIds[Math.floor(Math.random() * userIds.length)];

  //       const checkQuestion = this.getCheckQuestion(card.word);

  //       if (userId && checkQuestion) {
  //         this.checkQuestion = checkQuestion;

  //         const { question, question_en } = checkQuestion;

  //         const playerIds = team.map((player) => player.id);

  //         // 👁 открываем карту для всех
  //         card.whoSees.add(this.currentTeam);
  //         card.whoSees.add(opponentColor);

  //         this.answerUserId = userId;
  //         this.answerCard = card;

  //         this.updateScore();

  //         return {
  //           type: 'own',
  //           payload: {
  //             userId,
  //             question,
  //             question_en,
  //             card,
  //             score: this.score,
  //             playerIds,
  //           },
  //         };
  //       }

  //       // fallback
  //       const playerIds = team.map((player) => player.id);
  //       const spymasterId = this.turnChange();

  //       return {
  //         type: 'no-change',
  //         payload: { team: this.currentTeam, spymasterId, playerIds },
  //       };
  //     }

  //     case opponentColor: {
  //       const recipients = team.map((player) => player.id);

  //       card.whoSees.add(this.currentTeam);

  //       const spymasterId = this.turnChange();

  //       return {
  //         type: 'alien',
  //         payload: {
  //           spymasterId,
  //           team: this.currentTeam,
  //           cardId: card.id,
  //           color: card.color,
  //           recipients,
  //         },
  //       };
  //     }

  //     case 'bomb': {
  //       this.stopPhaseTimer();

  //       const opponentTeam = this.currentTeam === 'red' ? this.blueTeam : this.redTeam;

  //       const winPlayerIds = opponentTeam.map((player) => player.id);

  //       const gameEndInfo = this.getGameEndInfo(true);

  //       card.whoSees.add(this.currentTeam);

  //       gameEndInfo.winningTeam = opponentTeam === this.redTeam ? 'red' : 'blue';

  //       this.gamePhase = 'finish';

  //       return {
  //         type: 'bomb',
  //         payload: {
  //           cardId: card.id,
  //           color: card.color,
  //           gameEndInfo,
  //           winPlayerIds,
  //         },
  //       };
  //     }
  //   }
  // }

  private chosenOwnCard(choice: [string, string[]], card: Card): CardTestResult {
    const termWithUserIds = 1;
    const userIds = choice[termWithUserIds];
    const userId = userIds[Math.floor(Math.random() * userIds.length)];
    const checkQuestion = this.getCheckQuestion(card.word);
    if (userId && checkQuestion) {
      this.checkQuestion = checkQuestion;
      const { question, question_en } = this.checkQuestion;
      const team = this.currentTeam === 'red' ? this.redTeam : this.blueTeam;
      const playerIds = team.map((player) => player.id);
      card.whoSees.add(this.currentTeam);
      card.whoSees.add(this.currentTeam === 'red' ? 'blue' : 'red');
      this.answerUserId = userId;
      this.answerCard = card;
      this.updateScore();
      const score = this.score;
      return { type: 'own', payload: { userId, question, question_en, card, score, playerIds } };
    }
    const team = this.currentTeam === 'red' ? this.redTeam : this.blueTeam;
    const playerIds = team.map((player) => player.id);
    const spymasterId = this.turnChange();
    return { type: 'no-change', payload: { team: this.currentTeam, spymasterId, playerIds } };
  }

  private chosenOpponentCard(card: Card): CardTestResult {
    const team = this.currentTeam === 'red' ? this.redTeam : this.blueTeam;
    const recipients = team.map((player) => player.id);
    card.whoSees.add(this.currentTeam);
    const { id: cardId, color } = card;
    const spymasterId = this.turnChange();
    return {
      type: 'alien',
      payload: { spymasterId, team: this.currentTeam, cardId, color, recipients },
    };
  }

  private chosenBombCard(card: Card): CardTestResult {
    this.stopPhaseTimer();
    const opponentTeam = this.currentTeam === 'red' ? this.blueTeam : this.redTeam;
    const winPlayerIds = opponentTeam.map((player) => player.id);
    const gameEndInfo = this.getGameEndInfo(true);
    card.whoSees.add(this.currentTeam);
    gameEndInfo.winningTeam = opponentTeam === this.redTeam ? 'red' : 'blue';
    this.gamePhase = 'finish';
    return {
      type: 'bomb',
      payload: {
        cardId: card.id,
        color: card.color,
        gameEndInfo,
        winPlayerIds,
      },
    };
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

  public startAnswerPhase(callback: (team: Teams) => void): void {
    this.gamePhase = 'answer';

    this.runPhaseTimer(SECOND_COUNT_FOR_ANSWER, () => {
      this.checkQuestion = null;
      this.answerCard = null;
      this.answerUserId = undefined;
      this.turnChange();
      callback(this.currentTeam);
    });
  }

  public giveAnswer(
    userId: string,
    answer: string
  ):
    | { answer: string; checkQuestion: CheckQuestion; spymasterId: string; playerIds: string[] }
    | { error: ErrorCode } {
    if (this.gamePhase === 'answer' && this.answerUserId === userId && this.checkQuestion) {
      this.stopPhaseTimer();

      const opponentTeam = this.currentTeam === 'red' ? this.blueTeam : this.redTeam;
      const playerIds = opponentTeam.map((player) => player.id);
      const spymaster = opponentTeam.find((player) => player.role === 'spymaster');
      if (spymaster) {
        const spymasterId = spymaster.id;
        return {
          answer,
          checkQuestion: this.checkQuestion,
          spymasterId,
          playerIds,
        };
      }
    }

    return { error: 'ACTION_IS_PROHIBITED' };
  }

  public startCheckPhase(callback: (results: CheckResults) => void): void {
    this.gamePhase = 'check';

    this.runPhaseTimer(SECOND_COUNT_FOR_CHECK, () => {
      const result = this.resultsProcessing();
      callback(result);
    });
  }

  public giveCheck(userId: string, accept: boolean): void {
    const opponentTeam = this.currentTeam === 'red' ? this.blueTeam : this.redTeam;
    const agentIds = opponentTeam
      .filter((player) => player.role === 'agent')
      .map((player) => player.id);
    if (this.gamePhase === 'check' && agentIds.includes(userId)) {
      const userAccept = this.accepts.find((item) => item.userId === userId);
      if (!userAccept) {
        this.accepts.push({ userId, accept });
      }
    }
  }

  private resultsProcessing(): CheckResults {
    this.stopPhaseTimer();
    const correct = this.accepts.length === 0 || this.accepts.some((item) => item.accept);
    this.setCheckResult(correct);

    const isEnd = this.score.red >= CardCounts.RED || this.score.blue >= CardCounts.BLUE;
    if (isEnd) {
      this.gamePhase = 'finish';
      const gameEndInfo = this.getGameEndInfo();
      const team = this.currentTeam === 'red' ? this.redTeam : this.blueTeam;
      const winPlayerIds = team.map((player) => player.id);
      return { type: 'game-end', payload: { gameEndInfo, winPlayerIds } };
    }

    this.accepts = [];
    this.checkQuestion = null;
    this.answerCard = null;
    this.answerUserId = undefined;
    this.turnChange();
    return { type: 'turn-end', payload: { correct, team: this.currentTeam } };
  }

  private updateScore(): void {
    if (this.answerCard?.color === this.currentTeam) {
      if (this.currentTeam === 'red') {
        this.score.red += 1;
      } else {
        this.score.blue += 1;
      }
    }
  }

  private getGameEndInfo(bombRevealed: boolean = false): GameEndInfo {
    this.stopPhaseTimer();
    if (this.gameTimer) {
      clearInterval(this.gameTimer);
    }
    const winningTeam = this.score.red >= CardCounts.RED ? 'red' : 'blue';
    const redPlayerScores = this.redTeam.map((player) => this.getPlayerScore(player));
    const bluePlayerScores = this.blueTeam.map((player) => this.getPlayerScore(player));
    return {
      winningTeam,
      win: false,
      bombRevealed,
      score: this.score,
      time: this.gameTime,
      redPlayerScores,
      bluePlayerScores,
    };
  }

  private setCheckResult(correct: boolean): void {
    if (this.answerUserId) {
      const userAnswers = this.playerAnswers.get(this.answerUserId) || [];
      userAnswers.push(correct);
      this.playerAnswers.set(this.answerUserId, userAnswers);
    }
  }

  private getPlayerScore(player: Player): PlayerScore {
    const answers = this.playerAnswers.get(player.id) || [];
    const score = answers.filter((answer) => answer === true).length;
    return { id: player.id, username: player.username, score, attempts: answers.length };
  }

  private getChosenCards(): ChosenCard[] {
    return [...this.chosenCards.entries()].map(([cardId, userIds]) => ({
      cardId,
      players: this.getAllPlayers().filter((player) => userIds.includes(player.id)),
    }));
  }

  private getGamePhaseInfo(): GamePhaseInfo {
    const guessPhaseInfo =
      this.gamePhase === 'guess' ? { chosenCards: this.getChosenCards() } : null;
    const answerPhaseInfo =
      this.gamePhase === 'answer' && this.checkQuestion
        ? {
            word: this.checkQuestion.word,
            question: this.checkQuestion.question,
            question_en: this.checkQuestion.question_en,
          }
        : null;
    const checkPhaseInfo =
      this.gamePhase === 'check' && this.checkQuestion
        ? {
            word: this.checkQuestion.word,
            question: this.checkQuestion.question,
            question_en: this.checkQuestion.question_en,
            referenceAnswer: this.checkQuestion.referenceAnswer,
            referenceAnswer_en: this.checkQuestion.referenceAnswer_en,
          }
        : null;
    const finishPhaseInfo =
      this.gamePhase === 'finish' ? { gameEndInfo: this.getGameEndInfo() } : null;

    return { guessPhaseInfo, answerPhaseInfo, checkPhaseInfo, finishPhaseInfo };
  }

  public getGameStateForClient(userId: string): GameStateForClient {
    const player = this.getPlayer(userId);

    const cards: Card[] = this.cards.map((card) => ({
      ...card,
      color:
        (player && card.whoSees.has(player.team)) || (player && player.role === 'spymaster')
          ? card.color
          : 'unknown',
    }));

    return {
      id: this.id,
      cards,
      currentTeam: this.currentTeam,
      isSpymaster: player ? player.role === 'spymaster' : false,
      redTeam: this.redTeam,
      blueTeam: this.blueTeam,
      gamePhase: this.gamePhase,
      gameTime: this.gameTime,
      phaseTime: this.phaseTime,
      score: this.score,
      gamePhaseInfo: this.getGamePhaseInfo(),
    };
  }

  private runPhaseTimer(durationSec: number, onEnd: () => void): void {
    if (this.phaseTimer) {
      clearTimeout(this.phaseTimer);
      this.phaseTimer = null;
    }

    this.phaseTime = 0;

    const start = Date.now();

    const tick = (): void => {
      const elapsed = Math.floor((Date.now() - start) / 1000);
      this.phaseTime = elapsed;

      if (elapsed >= durationSec) {
        this.phaseTimer = null;
        onEnd();
        return;
      }

      this.phaseTimer = setTimeout(tick, 200); // обновление UI каждые 200мс
    };

    tick();
  }

  private stopPhaseTimer(): void {
    if (this.phaseTimer) {
      clearTimeout(this.phaseTimer);
      this.phaseTimer = null;
    }
  }
}
