import { expect, test } from 'vitest';
import { Room } from './room.ts';
import type {
  Player,
  RoomInfo,
  RoomPreview,
  RoomSettings,
} from '../../../../packages/shared/src/types/room.ts';
import { v4 as uuid } from 'uuid';

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

  const userId = uuid();
  const player: Player = { userId, username: 'John Doe' };
  room.addPlayer(player);

  const result = room.getPlayer(userId);

  expect(result).toEqual(player);
});

test('The getPlayerIds method should return a list of player IDs', () => {
  const roomSettings: RoomSettings = { name: 'unknown room', maxPlayers: 4 };

  const room = new Room(roomSettings);

  const players: Player[] = [
    { userId: uuid(), username: 'player1' },
    { userId: uuid(), username: 'player2' },
  ];

  for (const player of players) {
    room.addPlayer(player);
  }

  const result = room.getPlayerIds();

  expect(result.length).toBe(2);
  for (const player of players) {
    expect(result).toContain(player.userId);
  }
});

test('The removePlayer method should remove a previously added player from the room using its id', () => {
  const roomSettings: RoomSettings = { name: 'unknown room', maxPlayers: 4 };

  const room = new Room(roomSettings);

  const userId = uuid();
  const player: Player = { userId, username: 'John Doe' };
  room.addPlayer(player);

  let result = room.getPlayerIds();

  expect(result).toContain(userId);

  room.removePlayer(userId);

  result = room.getPlayerIds();

  expect(result).not.toContain(userId);
});

test('The isFull method should indicate whether the room is full or not', () => {
  const roomSettings: RoomSettings = { name: 'unknown room', maxPlayers: 4 };

  const room = new Room(roomSettings);

  for (let i = 0; i < 3; i++) {
    const player: Player = { userId: uuid(), username: 'John Doe' };
    room.addPlayer(player);
  }

  let result = room.isFull();

  expect(result).toBeFalsy();

  const userId = uuid();
  room.addPlayer({ userId, username: 'John Doe' });

  result = room.isFull();

  expect(result).toBeTruthy();

  room.removePlayer(userId);

  result = room.isFull();

  expect(result).toBeFalsy();
});

test('The getRoomInfo method should return detailed information about the room', () => {
  const roomSettings: RoomSettings = { name: 'unknown room', maxPlayers: 4 };

  const room = new Room(roomSettings);

  const players: Player[] = [
    { userId: uuid(), username: 'player1' },
    { userId: uuid(), username: 'player2' },
  ];

  for (const player of players) {
    room.addPlayer(player);
  }

  const id = room.getId();

  const resultExample: RoomInfo = { ...roomSettings, id, players };

  const result = room.getRoomInfo();

  expect(result).toEqual(resultExample);
});
