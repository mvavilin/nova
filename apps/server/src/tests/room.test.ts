import { expect, test } from 'vitest';
import type {
  Player,
  RoomInfo,
  RoomPreview,
  RoomSettings,
} from '../../../../packages/shared/src/types/room.ts';
import { v4 as uuid } from 'uuid';
import { Room } from '../rooms/room.ts';

test('The getRoomPreview method should return a summary of the room', () => {
  const roomSettings: RoomSettings = { name: 'unknown room', maxPlayers: 4 };

  const room = new Room(roomSettings);

  const roomPreview = room.getRoomPreview();
  const id = room.getId();

  const resultExample: RoomPreview = { ...roomSettings, id, status: 'waiting', playerCount: 0 };

  expect(roomPreview).toEqual(resultExample);
});

test('The getPlayer method should return the previously added player by its id', () => {
  const roomSettings: RoomSettings = { name: 'unknown room', maxPlayers: 4 };

  const room = new Room(roomSettings);

  const id = uuid();
  const player: Player = { id, username: 'John Doe', team: 'choosing', role: 'choosing' };
  room.addPlayer(player);

  const result = room.getPlayer(id);

  expect(result).toEqual(player);
});

test('The getPlayerIds method should return a list of player IDs', () => {
  const roomSettings: RoomSettings = { name: 'unknown room', maxPlayers: 4 };

  const room = new Room(roomSettings);

  const players: Player[] = [
    { id: uuid(), username: 'player1', team: 'choosing', role: 'choosing' },
    { id: uuid(), username: 'player2', team: 'choosing', role: 'choosing' },
  ];

  for (const player of players) {
    room.addPlayer(player);
  }

  const result = room.getPlayerIds();

  expect(result.length).toBe(2);
  for (const player of players) {
    expect(result).toContain(player.id);
  }
});

test('The removePlayer method should remove a previously added player from the room using its id', () => {
  const roomSettings: RoomSettings = { name: 'unknown room', maxPlayers: 4 };

  const room = new Room(roomSettings);

  const id = uuid();
  const player: Player = { id, username: 'John Doe', team: 'choosing', role: 'choosing' };
  room.addPlayer(player);

  let result = room.getPlayerIds();

  expect(result).toContain(id);

  room.removePlayer(id);

  result = room.getPlayerIds();

  expect(result).not.toContain(id);
});

test('The isFull method should indicate whether the room is full or not', () => {
  const roomSettings: RoomSettings = { name: 'unknown room', maxPlayers: 4 };

  const room = new Room(roomSettings);

  for (let i = 0; i < 3; i++) {
    const player: Player = {
      id: uuid(),
      username: 'John Doe',
      team: 'choosing',
      role: 'choosing',
    };
    room.addPlayer(player);
  }

  let result = room.isFull();

  expect(result).toBeFalsy();

  const id = uuid();
  room.addPlayer({ id, username: 'John Doe', team: 'choosing', role: 'choosing' });

  result = room.isFull();

  expect(result).toBeTruthy();

  room.removePlayer(id);

  result = room.isFull();

  expect(result).toBeFalsy();
});

test('The getRoomInfo method should return detailed information about the room', () => {
  const roomSettings: RoomSettings = { name: 'unknown room', maxPlayers: 4 };

  const room = new Room(roomSettings);

  const players: Player[] = [
    { id: uuid(), username: 'player1', team: 'choosing', role: 'choosing' },
    { id: uuid(), username: 'player2', team: 'choosing', role: 'choosing' },
  ];

  for (const player of players) {
    room.addPlayer(player);
  }

  const id = room.getId();

  const resultExample: RoomInfo = {
    ...roomSettings,
    id,
    redPlayers: [],
    bluePlayers: [],
    choosingPlayers: players,
    playerCount: players.length,
  };

  const result = room.getRoomInfo();

  expect(result).toEqual(resultExample);
});

test('The hasSpymaster method should check if there is a spymaster in the room', () => {
  const roomSettings: RoomSettings = { name: 'room', maxPlayers: 4 };

  const room = new Room(roomSettings);

  const player: Player = { id: uuid(), username: 'username', team: 'red', role: 'spymaster' };

  let hasRedSpymaster = room.hasSpymaster('red');
  let hasBlueSpymaster = room.hasSpymaster('blue');

  expect(hasRedSpymaster).toBeFalsy();
  expect(hasBlueSpymaster).toBeFalsy();

  room.addPlayer(player);

  hasRedSpymaster = room.hasSpymaster('red');
  hasBlueSpymaster = room.hasSpymaster('blue');

  expect(hasRedSpymaster).toBeTruthy();
  expect(hasBlueSpymaster).toBeFalsy();
});

test('The hasAllAgents method should check if all agents are in the room', () => {
  const roomSettings: RoomSettings = { name: 'room', maxPlayers: 8 };

  const room = new Room(roomSettings);

  const player1: Player = { id: uuid(), username: 'username1', team: 'red', role: 'agent' };
  const player2: Player = { id: uuid(), username: 'username2', team: 'red', role: 'agent' };
  const player3: Player = { id: uuid(), username: 'username3', team: 'red', role: 'agent' };

  room.addPlayer(player1);
  room.addPlayer(player2);

  let hasAllRedAgents = room.hasAllAgents('red');
  let hasAllBlueAgents = room.hasAllAgents('blue');

  expect(hasAllRedAgents).toBeFalsy();
  expect(hasAllBlueAgents).toBeFalsy();

  room.addPlayer(player3);

  hasAllRedAgents = room.hasAllAgents('red');
  hasAllBlueAgents = room.hasAllAgents('blue');

  expect(hasAllRedAgents).toBeTruthy();
  expect(hasAllBlueAgents).toBeFalsy();
});
