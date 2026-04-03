import { describe, it, expect, vi } from 'vitest';
import mockStore from '@__mocks__/store/store.mock';

vi.mock('@store/store', () => ({
  __esModule: true,
  default: mockStore,
}));

import GameRules from './GameRules';

describe('Game Rules creation', () => {
  it('creates a p element', () => {
    const p = new GameRules();

    expect(p.element?.tagName).toBe('DIV');
  });
});
