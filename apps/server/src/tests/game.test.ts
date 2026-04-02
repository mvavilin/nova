import { expect, test, vi } from 'vitest';
import {
  CardCounts,
  type Card,
  type GameEndInfo,
} from '../../../../packages/shared/src/types/game.ts';
import type { Player } from '../../../../packages/shared/src/types/room.ts';
import { v4 as uuid } from 'uuid';
import { Game } from '../rooms/game.ts';
import {
  SECOND_COUNT_FOR_ANSWER,
  SECOND_COUNT_FOR_ASK_CLUE,
  SECOND_COUNT_FOR_CHECK,
  SECOND_COUNT_FOR_GUESS,
  type CardTestResult,
} from '../../../../packages/shared/src/socketEvents.ts';
import type { CheckQuestion } from '../../../../packages/shared/src/types/question.ts';

const redSpymasterId = uuid();
const redSpymaster: Player = {
  id: redSpymasterId,
  username: 'redSpymaster',
  team: 'red',
  role: 'spymaster',
};
const redAgentId: string = uuid();
const redAgent: Player = { id: redAgentId, username: 'redAgent', team: 'red', role: 'agent' };

const blueSpymasterId = uuid();
const blueSpymaster: Player = {
  id: blueSpymasterId,
  username: 'blueSpymaster',
  team: 'blue',
  role: 'spymaster',
};

test('The game should create 25 cards', () => {
  const game = new Game('', 4);
  game.initial();

  const cards = game.getGameInfo('').cards;

  expect(cards).toHaveLength(CardCounts.ALL);
});

test('The spymaster sees the colors of the cards', () => {
  const game = new Game('', 4);

  const userId = uuid();
  const player: Player = { id: userId, username: 'username', team: 'red', role: 'spymaster' };
  game.addPlayer(player);

  game.initial();

  const cards = game.getGameInfo(userId).cards;
  const redCards = cards.filter((card) => card.color === 'red');
  const blueCards = cards.filter((card) => card.color === 'blue');
  const neutralCards = cards.filter((card) => card.color === 'neutral');
  const bombCards = cards.filter((card) => card.color === 'bomb');

  expect(cards).toHaveLength(CardCounts.ALL);
  expect(redCards).toHaveLength(CardCounts.RED);
  expect(blueCards).toHaveLength(CardCounts.BLUE);
  expect(neutralCards).toHaveLength(CardCounts.NEUTRAL);
  expect(bombCards).toHaveLength(CardCounts.BOMB);
});

test('The agent does not see the color of the cards', () => {
  const game = new Game('', 4);

  const userId = uuid();
  const player: Player = { id: userId, username: 'username', team: 'red', role: 'agent' };
  game.addPlayer(player);

  game.initial();

  const cards = game.getGameInfo(userId).cards;
  const unknownCards = cards.filter((card) => card.color === 'unknown');

  expect(cards).toHaveLength(CardCounts.ALL);
  expect(unknownCards).toHaveLength(CardCounts.ALL);
});

// test('The gameTimer should start when the game is initialized', () => {
//   const game = new Game('', 4);
//   game.initial();
//   expect(game['gameTimer']).not.toBeNull();
// });

// test('The gameTimer should update the gameTime every second', () => {
//   vi.useFakeTimers();
//   const game = new Game('', 4);
//   game.initial();
//   expect(game['gameTime']).toBe(0);
//   vi.advanceTimersByTime(1000);
//   expect(game['gameTime']).toBe(1);
//   vi.advanceTimersByTime(2000);
//   expect(game['gameTime']).toBe(3);
// });

test('The addPlayer method should add a player to the game', () => {
  const game = new Game('', 4);

  const player1: Player = { id: uuid(), username: 'username', team: 'red', role: 'agent' };
  game.addPlayer(player1);
  const result1 = game.getPlayer(player1.id);
  expect(result1).toEqual(player1);

  const player2: Player = { id: uuid(), username: 'username', team: 'blue', role: 'agent' };
  game.addPlayer(player2);
  const result2 = game.getPlayer(player2.id);
  expect(result2).toEqual(player2);

  const player3: Player = { id: uuid(), username: 'username', team: 'choosing', role: 'agent' };
  game.addPlayer(player3);
  const result3 = game.getPlayer(player3.id);
  expect(result3).toBeUndefined();
});

test('The getRoomId should return roomId', () => {
  const roomId = 'roomId';
  const game = new Game(roomId, 4);

  const result = game.getRoomId();
  expect(result).toBe(roomId);
});

test('The isFull method should return true if the game has the maximum number of players', () => {
  const game = new Game('', 2);
  const player1: Player = { id: uuid(), username: 'player1', team: 'red', role: 'agent' };
  const player2: Player = { id: uuid(), username: 'player2', team: 'red', role: 'agent' };

  game.addPlayer(player1);
  let result = game.isFull();
  expect(result).toBeFalsy();

  game.addPlayer(player2);
  result = game.isFull();
  expect(result).toBeTruthy();
});

test('The getPlayerIds method should return the ids of the players in the game', () => {
  const game = new Game('', 4);
  const player1: Player = { id: uuid(), username: 'player1', team: 'red', role: 'agent' };
  const player2: Player = { id: uuid(), username: 'player2', team: 'red', role: 'agent' };
  game.addPlayer(player1);
  game.addPlayer(player2);
  const result = game.getPlayerIds();

  expect(result).toHaveLength(2);
  expect(result).toContain(player1.id);
  expect(result).toContain(player2.id);
});

test('The removePlayer method should remove a player from the game using its id', () => {
  const game = new Game('', 4);
  const player1: Player = { id: uuid(), username: 'player1', team: 'red', role: 'agent' };
  const player2: Player = { id: uuid(), username: 'player2', team: 'red', role: 'agent' };
  game.addPlayer(player1);
  game.addPlayer(player2);
  let result = game.getPlayerIds();

  expect(result).toHaveLength(2);
  expect(result).toContain(player1.id);
  expect(result).toContain(player2.id);

  game.removePlayer(player1.id);

  result = game.getPlayerIds();
  expect(result).toHaveLength(1);
  expect(result).not.toContain(player1.id);
  expect(result).toContain(player2.id);
});

test('The askClue method should return the id of a spymaster', () => {
  const game = new Game('', 4);
  const spymasterId = uuid();
  const player: Player = { id: spymasterId, username: 'username', team: 'red', role: 'spymaster' };
  game.addPlayer(player);
  game.initial();
  const result = game.askClue(() => {});

  expect(result).toBe(spymasterId);
});

test('The askClue method should return undefined if there is no spymaster', () => {
  const game = new Game('', 4);
  const player: Player = { id: uuid(), username: 'username', team: 'red', role: 'agent' };
  game.addPlayer(player);
  game.initial();
  const result = game.askClue(() => {});
  expect(result).toBeUndefined();
});

test('The askClue method should set a timer for the clue', () => {
  const game = new Game('', 4);
  const spymasterId = uuid();
  const player: Player = { id: spymasterId, username: 'username', team: 'red', role: 'spymaster' };
  game.addPlayer(player);
  game.initial();
  game.askClue(() => {});

  expect(game['phaseTimer']).not.toBeNull();
});

test('The askClue method should clear the timer after the time is up', () => {
  vi.useFakeTimers();
  const game = new Game('', 4);
  const spymasterId = uuid();
  const player: Player = { id: spymasterId, username: 'username', team: 'red', role: 'spymaster' };
  game.addPlayer(player);
  game.initial();
  game.askClue(() => {});
  expect(game['phaseTimer']).not.toBeNull();

  vi.advanceTimersByTime(SECOND_COUNT_FOR_ASK_CLUE * 1000);
  expect(game['phaseTimer']).toBeNull();
});

test('The askClue method should call the callback function after the time is up', () => {
  vi.useFakeTimers();
  const game = new Game('', 4);
  const spymasterRedId = uuid();
  const player1: Player = {
    id: spymasterRedId,
    username: 'username',
    team: 'red',
    role: 'spymaster',
  };
  const spymasterBlueId = uuid();
  const player2: Player = {
    id: spymasterBlueId,
    username: 'username2',
    team: 'blue',
    role: 'spymaster',
  };
  game.addPlayer(player1);
  game.addPlayer(player2);
  game.initial();
  const callback = vi.fn();
  game.askClue(callback);
  expect(callback).not.toHaveBeenCalled();

  vi.advanceTimersByTime(SECOND_COUNT_FOR_ASK_CLUE * 1000);
  expect(callback).toHaveBeenCalledWith('blue');
});

test('The giveClue method should return the clue and the agent ids if current team is red', () => {
  const game = new Game('', 4);
  const spymasterId = uuid();
  const agentId1 = uuid();
  const agentId2 = uuid();
  const spymaster: Player = {
    id: spymasterId,
    username: 'spymaster',
    team: 'red',
    role: 'spymaster',
  };
  const agent1: Player = { id: agentId1, username: 'agent1', team: 'red', role: 'agent' };
  const agent2: Player = { id: agentId2, username: 'agent2', team: 'red', role: 'agent' };
  game.addPlayer(spymaster);
  game.addPlayer(agent1);
  game.addPlayer(agent2);
  game.initial();
  const clue = 'clue';
  const result = game.giveClue(spymasterId, clue, () => {});
  expect(result).toEqual({ clue, agentIds: [agentId1, agentId2] });
});

test('The giveClue method should return the clue and the agent ids if current team is blue', () => {
  const game = new Game('', 4);
  game['currentTeam'] = 'blue';
  const spymasterId = uuid();
  const agentId1 = uuid();
  const agentId2 = uuid();
  const spymaster: Player = {
    id: spymasterId,
    username: 'spymaster',
    team: 'blue',
    role: 'spymaster',
  };
  const agent1: Player = { id: agentId1, username: 'agent1', team: 'blue', role: 'agent' };
  const agent2: Player = { id: agentId2, username: 'agent2', team: 'blue', role: 'agent' };
  game.addPlayer(spymaster);
  game.addPlayer(agent1);
  game.addPlayer(agent2);
  game.initial();
  const clue = 'clue';
  const result = game.giveClue(spymasterId, clue, () => {});
  expect(result).toEqual({ clue, agentIds: [agentId1, agentId2] });
});

test('The giveClue method should return an error if the player is not a spymaster', () => {
  const game = new Game('', 4);
  const agentId = uuid();
  const agent: Player = { id: agentId, username: 'agent', team: 'red', role: 'agent' };
  game.addPlayer(agent);
  game.initial();
  const clue = 'clue';
  const result = game.giveClue(agentId, clue, () => {});
  expect(result).toEqual({ error: 'ACTION_IS_PROHIBITED' });
});

test('The giveClue method should return an error if the game phase is not clue', () => {
  const game = new Game('', 4);
  const spymasterId = uuid();
  const spymaster: Player = {
    id: spymasterId,
    username: 'spymaster',
    team: 'red',
    role: 'spymaster',
  };
  game.addPlayer(spymaster);
  game.initial();
  game['gamePhase'] = 'guess';
  const clue = 'clue';
  const result = game.giveClue(spymasterId, clue, () => {});
  expect(result).toEqual({ error: 'ACTION_IS_PROHIBITED' });
});

test('The chooseCard method should return the players and recipients if the player is an agent and the game phase is guess', () => {
  const game = new Game('', 4);
  const agentId = uuid();
  const agent: Player = { id: agentId, username: 'agent', team: 'red', role: 'agent' };
  game.addPlayer(agent);
  game.initial();
  game['gamePhase'] = 'guess';
  const cardId = uuid();
  game['cards'] = [{ id: cardId, word: 'word', color: 'unknown', whoSees: new Set() }];
  const result = game.chooseCard(agentId, cardId);
  expect(result).toEqual({ players: [agent], recipients: [agentId] });
});

test('The chooseCard method should return the players and recipients if current team is blue', () => {
  const game = new Game('', 4);
  const agentId = uuid();
  const agent: Player = { id: agentId, username: 'agent', team: 'blue', role: 'agent' };
  game.addPlayer(agent);
  game.initial();
  game['currentTeam'] = 'blue';
  game['gamePhase'] = 'guess';
  const cardId = uuid();
  game['cards'] = [{ id: cardId, word: 'word', color: 'unknown', whoSees: new Set() }];
  const result = game.chooseCard(agentId, cardId);
  expect(result).toEqual({ players: [agent], recipients: [agentId] });
});

test('The chooseCard method should return an error if the player is not an agent', () => {
  const game = new Game('', 4);
  const spymasterId = uuid();
  const spymaster: Player = {
    id: spymasterId,
    username: 'spymaster',
    team: 'red',
    role: 'spymaster',
  };
  game.addPlayer(spymaster);
  game.initial();
  game['gamePhase'] = 'guess';
  const cardId = uuid();
  game['cards'] = [{ id: cardId, word: 'word', color: 'unknown', whoSees: new Set() }];
  const result = game.chooseCard(spymasterId, cardId);
  expect(result).toEqual({ error: 'ACTION_IS_PROHIBITED' });
});

test('The chooseCard method should return an error if the game phase is not guess', () => {
  const game = new Game('', 4);
  const agentId = uuid();
  const agent: Player = { id: agentId, username: 'agent', team: 'red', role: 'agent' };
  game.addPlayer(agent);
  game.initial();
  const cardId = uuid();
  game['cards'] = [{ id: cardId, word: 'word', color: 'unknown', whoSees: new Set() }];
  const result = game.chooseCard(agentId, cardId);
  expect(result).toEqual({ error: 'ACTION_IS_PROHIBITED' });
});

test('The chooseCard method should update the chosen cards', () => {
  const game = new Game('', 4);
  const agentId = uuid();
  const agent: Player = { id: agentId, username: 'agent', team: 'red', role: 'agent' };
  game.addPlayer(agent);
  game.initial();
  game['gamePhase'] = 'guess';
  const cardId = uuid();
  game['cards'] = [{ id: cardId, word: 'word', color: 'unknown', whoSees: new Set() }];
  game.chooseCard(agentId, cardId);
  let chosenCards = game['chosenCards'].get(cardId);
  expect(chosenCards).toEqual([agentId]);
  game.chooseCard(agentId, cardId);
  chosenCards = game['chosenCards'].get(cardId);
  expect(chosenCards).toEqual([]);
  game.chooseCard(agentId, cardId);
  chosenCards = game['chosenCards'].get(cardId);
  expect(chosenCards).toEqual([agentId]);
});

test('The chooseCard method should return error if card is not hidden', () => {
  const game = new Game('', 4);
  const agentId = uuid();
  const agent: Player = { id: agentId, username: 'agent', team: 'red', role: 'agent' };
  game.addPlayer(agent);
  game.initial();
  game['gamePhase'] = 'guess';
  const cardId = uuid();
  game['cards'] = [{ id: cardId, word: 'word', color: 'unknown', whoSees: new Set(['red']) }];
  const result = game.chooseCard(agentId, cardId);
  expect(result).toEqual({ error: 'ACTION_IS_PROHIBITED' });
});

test('The chooseCard method should return an error if the card does not exist', () => {
  const game = new Game('', 4);
  const agentId = uuid();
  const agent: Player = { id: agentId, username: 'agent', team: 'red', role: 'agent' };
  game.addPlayer(agent);
  game.initial();
  game['gamePhase'] = 'guess';
  const cardId = uuid();
  game['cards'] = [{ id: cardId, word: 'word', color: 'unknown', whoSees: new Set() }];
  const result = game.chooseCard(agentId, uuid());
  expect(result).toEqual({ error: 'ACTION_IS_PROHIBITED' });
});

test('The giveClue method should set the check question', () => {
  vi.useFakeTimers();
  const game = new Game('', 4);
  const spymasterId = uuid();
  const spymaster: Player = {
    id: spymasterId,
    username: 'spymaster',
    team: 'red',
    role: 'spymaster',
  };
  const agentId: string = uuid();
  const agent: Player = { id: agentId, username: 'agent', team: 'red', role: 'agent' };
  game.addPlayer(spymaster);
  game.addPlayer(agent);
  game.initial();
  const clue = 'clue';
  const result = game.giveClue(spymasterId, clue, () => {});
  vi.advanceTimersByTime(SECOND_COUNT_FOR_GUESS * 1000);
  expect(result).toEqual({ clue, agentIds: [agentId] });
  expect(game['checkQuestion']).toBeDefined();
});

test('The giveClue method called the callback function with no-change type if card not chosen', () => {
  vi.useFakeTimers();
  const game = new Game('', 4);
  const redSpymasterId = uuid();
  const redSpymaster: Player = {
    id: redSpymasterId,
    username: 'spymaster',
    team: 'red',
    role: 'spymaster',
  };
  const agentId: string = uuid();
  const agent: Player = { id: agentId, username: 'agent', team: 'red', role: 'agent' };
  const blueSpymasterId = uuid();
  const blueSpymaster: Player = {
    id: blueSpymasterId,
    username: 'spymaster2',
    team: 'blue',
    role: 'spymaster',
  };
  game.addPlayer(redSpymaster);
  game.addPlayer(agent);
  game.addPlayer(blueSpymaster);
  game.initial();
  const clue = 'clue';
  const callback = vi.fn();
  game.giveClue(redSpymasterId, clue, callback);
  expect(callback).not.toHaveBeenCalled();
  vi.advanceTimersByTime(SECOND_COUNT_FOR_GUESS * 1000);
  const result: CardTestResult = {
    type: 'no-change',
    payload: { spymasterId: blueSpymasterId, team: 'blue', playerIds: [redSpymasterId, agentId] },
  };
  expect(callback).toHaveBeenCalledWith(result);
});

test('The giveClue method called the callback function with alien type if chosen card is own', () => {
  vi.useFakeTimers();
  const game = new Game('', 4);
  game.addPlayer(redSpymaster);
  game.addPlayer(redAgent);
  game.addPlayer(blueSpymaster);
  game.initial();
  const clue = 'clue';
  const callback = vi.fn();
  game['gamePhase'] = 'clue';
  game.giveClue(redSpymasterId, clue, callback);
  expect(callback).not.toHaveBeenCalled();
  const card = game['cards'][0];
  if (card) {
    card.color = 'red';
    const { id: cardId } = card;
    game.chooseCard(redAgentId, cardId);
    vi.advanceTimersByTime(SECOND_COUNT_FOR_GUESS * 1000);
    const checkQuestion = game['checkQuestion'];
    expect(checkQuestion).not.toBeNull();
    if (checkQuestion) {
      const { question, question_en } = checkQuestion;
      const playerIds = game['redTeam'].map((player) => player.id);
      const score = { red: 1, blue: 0 };
      const result: CardTestResult = {
        type: 'own',
        payload: { userId: redAgentId, question, question_en, card, score, playerIds },
      };
      expect(callback).toHaveBeenCalledWith(result);
    }
  }
});

test('The giveClue method called the callback function with alien type if chosen card is alien', () => {
  vi.useFakeTimers();
  const game = new Game('', 4);
  game.addPlayer(redSpymaster);
  game.addPlayer(redAgent);
  game.addPlayer(blueSpymaster);
  game.initial();
  const clue = 'clue';
  const callback = vi.fn();
  game['gamePhase'] = 'clue';
  game.giveClue(redSpymasterId, clue, callback);
  expect(callback).not.toHaveBeenCalled();
  const card = game['cards'][0];
  if (card) {
    card.color = 'blue';
    const { id: cardId, color } = card;
    game.chooseCard(redAgentId, cardId);
    vi.advanceTimersByTime(SECOND_COUNT_FOR_GUESS * 1000);
    const result: CardTestResult = {
      type: 'alien',
      payload: {
        spymasterId: blueSpymasterId,
        team: 'blue',
        cardId,
        color,
        recipients: [redSpymasterId, redAgentId],
      },
    };
    expect(callback).toHaveBeenCalledWith(result);
  }
});

test('The giveClue method called the callback function with alien type if question in not found', () => {
  vi.useFakeTimers();
  const game = new Game('', 4);
  game.addPlayer(redSpymaster);
  game.addPlayer(redAgent);
  game.addPlayer(blueSpymaster);
  game.initial();
  const clue = 'clue';
  const callback = vi.fn();
  game['gamePhase'] = 'clue';
  game.giveClue(redSpymasterId, clue, callback);
  expect(callback).not.toHaveBeenCalled();
  const card = game['cards'][0];
  if (card) {
    card.color = 'red';
    card.word = 'word';
    const { id: cardId } = card;
    game.chooseCard(redAgentId, cardId);
    vi.advanceTimersByTime(SECOND_COUNT_FOR_GUESS * 1000);
    const checkQuestion = game['checkQuestion'];
    expect(checkQuestion).toBeNull();
    const result: CardTestResult = {
      type: 'no-change',
      payload: {
        spymasterId: blueSpymasterId,
        team: 'blue',
        playerIds: [redSpymasterId, redAgentId],
      },
    };
    expect(callback).toHaveBeenCalledWith(result);
  }
});

test('The startAnswerPhase method should set a timer for the answer', () => {
  const game = new Game('', 4);
  const callback = vi.fn();
  game.startAnswerPhase(callback);
  expect(game['phaseTimer']).not.toBeNull();
});

test('The startAnswerPhase method should clear the timer after the time is up', () => {
  vi.useFakeTimers();
  const game = new Game('', 4);
  const callback = vi.fn();
  game.startAnswerPhase(callback);
  expect(game['phaseTimer']).not.toBeNull();
  vi.advanceTimersByTime(SECOND_COUNT_FOR_ANSWER * 1000);
  expect(game['phaseTimer']).toBeNull();
});

test('The startAnswerPhase method should call the callback function after the time is up', () => {
  vi.useFakeTimers();
  const game = new Game('', 4);
  const callback = vi.fn();
  game.startAnswerPhase(callback);
  expect(callback).not.toHaveBeenCalled();
  vi.advanceTimersByTime(SECOND_COUNT_FOR_ANSWER * 1000);
  expect(callback).toHaveBeenCalledWith('blue');
});

test('The giveAnswer method should return the answer and the check question if the player give answer', () => {
  const game = new Game('', 4);
  const agentId = uuid();
  const agent: Player = { id: agentId, username: 'agent', team: 'red', role: 'agent' };
  const opponentSpymasterId = uuid();
  const opponentSpymaster: Player = {
    id: opponentSpymasterId,
    username: 'spymaster',
    team: 'blue',
    role: 'spymaster',
  };
  game.addPlayer(agent);
  game.addPlayer(opponentSpymaster);
  game.initial();
  game['gamePhase'] = 'answer';
  game['answerUserId'] = agentId;
  const checkQuestion: CheckQuestion = {
    id: uuid(),
    word: 'word',
    question: 'question',
    question_en: 'question_en',
    referenceAnswer: 'answer',
    referenceAnswer_en: 'answer_en',
    difficulty: 1,
    tags: ['tag1', 'tag2'],
  };
  game['checkQuestion'] = checkQuestion;
  const result = game.giveAnswer(agentId, 'answer');
  expect(result).toEqual({
    answer: 'answer',
    checkQuestion,
    spymasterId: opponentSpymasterId,
    playerIds: [opponentSpymasterId],
  });
});

test('The giveAnswer method should return error if opponent spymaster is not find', () => {
  const game = new Game('', 4);
  const agentId = uuid();
  const agent: Player = { id: agentId, username: 'agent', team: 'red', role: 'agent' };
  game.addPlayer(agent);
  game.initial();
  game['gamePhase'] = 'answer';
  game['answerUserId'] = agentId;
  const checkQuestion: CheckQuestion = {
    id: uuid(),
    word: 'word',
    question: 'question',
    question_en: 'question_en',
    referenceAnswer: 'answer',
    referenceAnswer_en: 'answer_en',
    difficulty: 1,
    tags: ['tag1', 'tag2'],
  };
  game['checkQuestion'] = checkQuestion;
  const result = game.giveAnswer(agentId, 'answer');
  console.log(result);
  expect(result).toEqual({
    error: 'ACTION_IS_PROHIBITED',
  });
});

test('The giveAnswer method should clear the timer', () => {
  const game = new Game('', 4);
  const agentId = uuid();
  const agent: Player = { id: agentId, username: 'agent', team: 'red', role: 'agent' };
  const opponentSpymasterId = uuid();
  const opponentSpymaster: Player = {
    id: opponentSpymasterId,
    username: 'spymaster',
    team: 'blue',
    role: 'spymaster',
  };
  game.addPlayer(agent);
  game.addPlayer(opponentSpymaster);
  game.initial();
  game['gamePhase'] = 'answer';
  game['answerUserId'] = agentId;
  const checkQuestion: CheckQuestion = {
    id: uuid(),
    word: 'word',
    question: 'question',
    question_en: 'question_en',
    referenceAnswer: 'answer',
    referenceAnswer_en: 'answer_en',
    difficulty: 1,
    tags: ['tag1', 'tag2'],
  };
  game['checkQuestion'] = checkQuestion;
  game.startAnswerPhase(() => {});
  expect(game['phaseTimer']).not.toBeNull();
  const result = game.giveAnswer(agentId, 'answer');
  expect(result).toEqual({
    answer: 'answer',
    checkQuestion,
    spymasterId: opponentSpymasterId,
    playerIds: [opponentSpymasterId],
  });
  expect(game['phaseTimer']).toBeNull();
});

test('The startCheckPhase method should reset the game state for a new round', () => {
  vi.useFakeTimers();
  const game = new Game('', 4);
  const playerId = uuid();
  const player: Player = { id: playerId, username: 'player', team: 'red', role: 'agent' };
  game.addPlayer(player);
  game.initial();
  game['currentTeam'] = 'red';
  game['gamePhase'] = 'guess';
  game['cards'] = [{ id: uuid(), word: 'word', color: 'red', whoSees: new Set() }];
  game['chosenCards'].set(uuid(), [playerId]);
  game['checkQuestion'] = {
    id: uuid(),
    word: 'word',
    question: 'question',
    question_en: 'question_en',
    referenceAnswer: 'answer',
    referenceAnswer_en: 'answer_en',
    difficulty: 1,
    tags: ['tag1', 'tag2'],
  };
  game.startCheckPhase(() => {});
  vi.advanceTimersByTime(SECOND_COUNT_FOR_CHECK * 1000);
  expect(game['currentTeam']).toBe('blue');
  expect(game['gamePhase']).toBe('clue');
  expect(game['chosenCards'].size).toBe(0);
  expect(game['checkQuestion']).toBeNull();
});

test('The giveCheck method should return the result of the check', () => {
  const game = new Game('', 4);
  const playerId = uuid();
  const player: Player = { id: playerId, username: 'player', team: 'blue', role: 'agent' };
  game.addPlayer(player);
  game.initial();
  game['gamePhase'] = 'check';
  game.giveCheck(playerId, true);
  expect(game['accepts']).toEqual([{ userId: playerId, accept: true }]);
});

test('The updateScore method should update the score of the teams', () => {
  const game = new Game('', 4);
  game['score'] = { red: 1, blue: 2 };
  game['currentTeam'] = 'red';
  game['answerCard'] = { id: uuid(), word: 'word', color: 'red', whoSees: new Set() };
  game['updateScore']();
  expect(game['score']).toEqual({ red: 2, blue: 2 });
  game['currentTeam'] = 'blue';
  game['answerCard'] = { id: uuid(), word: 'word', color: 'blue', whoSees: new Set() };
  game['updateScore']();
  expect(game['score']).toEqual({ red: 2, blue: 3 });
});

test('The resultsProcessing method should return the winning team if a team has won', () => {
  const game = new Game('', 4);
  game.addPlayer(redAgent);
  game['answerUserId'] = redAgentId;
  game['score'] = { red: 9, blue: 8 };
  const gameEndInfo: GameEndInfo = {
    bluePlayerScores: [],
    redPlayerScores: [
      {
        id: redAgentId,
        username: 'redAgent',
        score: 1,
        attempts: 1,
      },
    ],
    winningTeam: 'red',
    win: false,
    bombRevealed: false,
    score: { red: 9, blue: 8 },
    time: 0,
  };
  let result = game['resultsProcessing']();
  expect(result).toEqual({
    type: 'game-end',
    payload: { gameEndInfo, winPlayerIds: [redAgentId] },
  });
  game['answerUserId'] = undefined;
  game['score'] = { red: 8, blue: 9 };
  game['currentTeam'] = 'blue';
  gameEndInfo.winningTeam = 'blue';
  gameEndInfo.score = { red: 8, blue: 9 };
  result = game['resultsProcessing']();
  expect(result).toEqual({ type: 'game-end', payload: { gameEndInfo, winPlayerIds: [] } });
});

test('The getGameEndInfo method should stop the game timer and return the game end info', () => {
  vi.useFakeTimers();
  const game = new Game('', 4);
  game.addPlayer(blueSpymaster);
  game.initial();
  vi.advanceTimersByTime(5000);
  expect(game['gameTime']).toBe(5);
  game['getGameEndInfo']();
  vi.advanceTimersByTime(1000);
  expect(game['gameTime']).toBe(5);
});

test('The guessTest method should ', () => {
  const game = new Game('', 4);
  game.addPlayer(redAgent);
  game.addPlayer(blueSpymaster);
  game.initial();
  game['gamePhase'] = 'guess';
  const bombCard: Card = { id: uuid(), word: 'word', color: 'bomb', whoSees: new Set() };
  game['cards'] = [bombCard];
  game.chooseCard(redAgentId, bombCard.id);
  const result = game['guessTest']();
  const gameEndInfo = game['getGameEndInfo'](true);
  const cardTestResult: CardTestResult = {
    type: 'bomb',
    payload: {
      cardId: bombCard.id,
      color: bombCard.color,
      winPlayerIds: [blueSpymasterId],
      gameEndInfo,
    },
  };

  expect(result).toEqual(cardTestResult);
});

test('The getGameStateForClient should return gameStateInfo', () => {
  const game = new Game('', 4);
  game.addPlayer(blueSpymaster);
  game.addPlayer(redAgent);
  game.initial();
  const neutralCard: Card = { id: uuid(), word: 'word', color: 'neutral', whoSees: new Set() };
  game['cards'] = [neutralCard];
  const gameInfo = game.getGameInfo(redAgentId);
  game['gamePhase'] = 'guess';
  const cards = gameInfo.cards;
  game.chooseCard(redAgentId, neutralCard.id);
  const result = game.getGameStateForClient(redAgentId);
  expect(result).toEqual({
    id: game['id'],
    cards,
    currentTeam: game['currentTeam'],
    isSpymaster: false,
    redTeam: game['redTeam'],
    blueTeam: game['blueTeam'],
    gamePhase: game['gamePhase'],
    gameTime: game['gameTime'],
    phaseTime: game['phaseTime'],
    score: game['score'],
    gamePhaseInfo: {
      guessPhaseInfo: {
        chosenCards: [{ cardId: neutralCard.id, players: [redAgent] }],
      },
      answerPhaseInfo: null,
      checkPhaseInfo: null,
      finishPhaseInfo: null,
    },
  });
});
