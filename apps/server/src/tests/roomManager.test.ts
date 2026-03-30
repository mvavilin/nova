import { describe, expect, test } from 'vitest';
import { RoomManager } from '../rooms/roomManager.ts';
import { v4 as uuid } from 'uuid';
import type { Player } from '../../../../packages/shared/src/types/room.ts';
import type { ErrorCode } from '../../../../packages/shared/src/socketEvents.ts';

describe('The addPlayerToLobby method should', () => {
  const rm = new RoomManager();
  const id = uuid();

  test('add a new player', () => {
    const player1: Player = { id, username: 'username1', team: 'red', role: 'spymaster' };

    rm.addPlayerToLobby(player1);

    const playerIds = rm.getLobbyIds();

    expect(playerIds).toEqual([id]);
  });

  test('block duplicate players', () => {
    const player1: Player = { id, username: 'username1', team: 'red', role: 'spymaster' };
    const player2: Player = { id: uuid(), username: 'username1', team: 'red', role: 'spymaster' };

    rm.addPlayerToLobby(player1);

    const playerIds = rm.getLobbyIds();

    expect(playerIds).toEqual([id]);

    rm.addPlayerToLobby(player2);

    const newPlayerIds = rm.getLobbyIds();

    expect(newPlayerIds).not.toEqual([id]);
    expect(newPlayerIds).toHaveLength(2);
  });
});

describe('The addPlayerToProfile should', () => {
  const rm = new RoomManager();
  const id = uuid();
  const player: Player = { id, username: 'username', team: 'red', role: 'spymaster' };

  test('move a player from the lobby to a profile', () => {
    rm.addPlayerToLobby(player);

    const lobbyPlayerIds = rm.getLobbyIds();
    const profilePlayerIds = rm.getProfileIds();

    expect(lobbyPlayerIds).toEqual([id]);
    expect(profilePlayerIds).toEqual([]);

    rm.addPlayerToProfile(id);

    const newLobbyPlayerIds = rm.getLobbyIds();
    const newProfilePlayerIds = rm.getProfileIds();

    expect(newLobbyPlayerIds).toEqual([]);
    expect(newProfilePlayerIds).toEqual([id]);
  });

  test('return an object with the PLAYER_NOT_FOUND error if the user is not in the lobby', () => {
    const errorId = 'error_id';

    const result = rm.addPlayerToProfile(errorId);
    const expectation: { error: ErrorCode } = { error: 'PLAYER_NOT_FOUND' };

    expect(result).toEqual(expectation);
  });
});

describe('The leaveProfile should', () => {
  const rm = new RoomManager();
  const id = uuid();
  const player: Player = { id, username: 'username', team: 'red', role: 'spymaster' };

  test('move a player from the profile to a lobby', () => {
    rm.addPlayerToLobby(player);
    rm.addPlayerToProfile(id);

    const lobbyPlayerIds = rm.getLobbyIds();
    const profilePlayerIds = rm.getProfileIds();

    expect(lobbyPlayerIds).toEqual([]);
    expect(profilePlayerIds).toEqual([id]);

    rm.leaveProfile(id);

    const newLobbyPlayerIds = rm.getLobbyIds();
    const newProfilePlayerIds = rm.getProfileIds();

    expect(newLobbyPlayerIds).toEqual([id]);
    expect(newProfilePlayerIds).toEqual([]);
  });

  test('return an object with the PLAYER_NOT_FOUND error if the user is not in the profile', () => {
    const errorId = 'error_id';

    const result = rm.leaveProfile(errorId);
    const expectation: { error: ErrorCode } = { error: 'PLAYER_NOT_FOUND' };

    expect(result).toEqual(expectation);
  });
});
