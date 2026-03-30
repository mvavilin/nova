import { expect, test, vi } from 'vitest';
import { CardCounts } from '../../../../packages/shared/src/types/game.ts';
import type { Player } from '../../../../packages/shared/src/types/room.ts';
import { v4 as uuid } from 'uuid';
import { Game } from '../rooms/game.ts';
import {
  SECOND_COUNT_FOR_ASK_CLUE,
  SECOND_COUNT_FOR_GUESS,
  type CardTestResult,
} from '../../../../packages/shared/src/socketEvents.ts';

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

  expect(game['clueTimer']).not.toBeNull();
});

test('The askClue method should clear the timer after the time is up', () => {
  vi.useFakeTimers();
  const game = new Game('', 4);
  const spymasterId = uuid();
  const player: Player = { id: spymasterId, username: 'username', team: 'red', role: 'spymaster' };
  game.addPlayer(player);
  game.initial();
  game.askClue(() => {});
  expect(game['clueTimer']).not.toBeNull();

  vi.advanceTimersByTime(SECOND_COUNT_FOR_ASK_CLUE * 1000);
  expect(game['clueTimer']).toBeNull();
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

test('The giveClue method should clear the clue timer', () => {
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
  game.askClue(() => {});
  expect(game['clueTimer']).not.toBeNull();
  const clue = 'clue';
  game.giveClue(spymasterId, clue, () => {});
  expect(game['clueTimer']).toBeNull();
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
    payload: { spymasterId: blueSpymasterId, team: 'blue' },
  };
  expect(callback).toHaveBeenCalledWith(result);
});

test('The giveClue method called the callback function with alien type if chosen card is own', () => {
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
  game['gamePhase'] = 'clue';
  game.giveClue(redSpymasterId, clue, callback);
  expect(callback).not.toHaveBeenCalled();
  const card = game['cards'][0];
  if (card) {
    card.color = 'red';
    const { id: cardId } = card;
    game.chooseCard(agentId, cardId);
    vi.advanceTimersByTime(SECOND_COUNT_FOR_GUESS * 1000);
    const checkQuestion = game['checkQuestion'];
    expect(checkQuestion).not.toBeNull();
    if (checkQuestion) {
      const { question, question_en } = checkQuestion;
      const result: CardTestResult = {
        type: 'own',
        payload: { userId: agentId, question, question_en, observers: [redSpymasterId] },
      };
      expect(callback).toHaveBeenCalledWith(result);
    }
  }
});

test('The giveClue method called the callback function with alien type if chosen card is alien', () => {
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
  game['gamePhase'] = 'clue';
  game.giveClue(redSpymasterId, clue, callback);
  expect(callback).not.toHaveBeenCalled();
  const card = game['cards'][0];
  if (card) {
    card.color = 'blue';
    const { id: cardId, color } = card;
    game.chooseCard(agentId, cardId);
    vi.advanceTimersByTime(SECOND_COUNT_FOR_GUESS * 1000);
    const result: CardTestResult = {
      type: 'alien',
      payload: {
        spymasterId: blueSpymasterId,
        team: 'blue',
        cardId,
        color,
        recipients: [redSpymasterId, agentId],
      },
    };
    expect(callback).toHaveBeenCalledWith(result);
  }
});

test('The giveClue method called the callback function with alien type if question in not found', () => {
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
  game['gamePhase'] = 'clue';
  game.giveClue(redSpymasterId, clue, callback);
  expect(callback).not.toHaveBeenCalled();
  const card = game['cards'][0];
  if (card) {
    card.color = 'red';
    card.word = 'word';
    const { id: cardId } = card;
    game.chooseCard(agentId, cardId);
    vi.advanceTimersByTime(SECOND_COUNT_FOR_GUESS * 1000);
    const checkQuestion = game['checkQuestion'];
    expect(checkQuestion).toBeNull();
    const result: CardTestResult = {
      type: 'no-change',
      payload: { spymasterId: blueSpymasterId, team: 'blue' },
    };
    expect(callback).toHaveBeenCalledWith(result);
  }
});
