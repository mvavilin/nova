import { VALUE_OF_KEY_FOR_SHOW_LOG } from '../types/types.ts';
import { Logger } from '../ws/logger/logger.ts';
import { expect, test, vi } from 'vitest';

test('Logger should not log when SHOW_LOG is not set', () => {
  const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {});
  const logger = new Logger();

  logger.emit('user-id', 'session:connect', { userStatus: 'IN_ROOM' });
  expect(consoleSpy).not.toHaveBeenCalled();

  logger.on('user-id', 'room:ask-list');
  expect(consoleSpy).not.toHaveBeenCalled();

  logger.info('This is an info message');
  expect(consoleSpy).not.toHaveBeenCalled();

  consoleSpy.mockRestore();
});

test('Logger should log emit', () => {
  const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {});
  vi.stubEnv('SHOW_LOG', VALUE_OF_KEY_FOR_SHOW_LOG);
  const logger = new Logger();

  logger.emit('user-id', 'game:start-timer');
  expect(consoleSpy).toHaveBeenCalledWith(
    expect.stringContaining('game:start-timer'),
    expect.stringContaining('TO:'),
    'user-id'
  );

  logger.emit('user-id', 'session:connect', { userStatus: 'IN_ROOM' });
  expect(consoleSpy).toHaveBeenCalledWith(
    expect.stringContaining('session:connect'),
    expect.stringContaining('TO:'),
    'user-id'
  );
  consoleSpy.mockRestore();
});

test('Logger should log error', () => {
  const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {});
  vi.stubEnv('SHOW_LOG', VALUE_OF_KEY_FOR_SHOW_LOG);
  const logger = new Logger();
  logger.emit('user-id', 'error', { code: 'ALREADY_ONLINE' });
  expect(consoleSpy).toHaveBeenCalledWith(
    expect.stringContaining('error'),
    expect.stringContaining('TO:'),
    'user-id'
  );
  consoleSpy.mockRestore();
});

test('Logger should log info', () => {
  const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {});
  vi.stubEnv('SHOW_LOG', VALUE_OF_KEY_FOR_SHOW_LOG);
  const logger = new Logger();
  logger.info('This is an info message');
  expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining('This is an info message'));
  consoleSpy.mockRestore();
});

test('Logger should log on', () => {
  const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {});
  vi.stubEnv('SHOW_LOG', VALUE_OF_KEY_FOR_SHOW_LOG);
  const logger = new Logger();
  logger.on('user-id', 'room:ask-list');
  expect(consoleSpy).toHaveBeenCalledWith(
    expect.stringContaining('room:ask-list'),
    expect.stringContaining('FROM:'),
    'user-id'
  );
  logger.on('user-id', 'room:create', { settings: { name: 'room', maxPlayers: 4 } });
  expect(consoleSpy).toHaveBeenCalledWith(
    expect.stringContaining('payload:'),
    expect.objectContaining({
      settings: { name: 'room', maxPlayers: 4 },
    })
  );
  consoleSpy.mockRestore();
});
