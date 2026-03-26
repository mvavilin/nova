import { expect, test } from 'vitest';
import { Game } from './game.ts';
import { CardCounts } from '../../../../packages/shared/src/types/game.ts';

test('probe', () => {
  const game = new Game('', 4);
  game.initial();

  const cards = game.getGameInfo('').cards;

  expect(cards.length).toBe(CardCounts.ALL);
});
