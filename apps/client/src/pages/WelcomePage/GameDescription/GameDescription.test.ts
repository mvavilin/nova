import { describe, it, expect, vi } from 'vitest';
import mockStore from '@__mocks__/store/store.mock';

vi.mock('@store/store', () => ({
  __esModule: true,
  default: mockStore,
}));

import GameDescription from './GameDescription';

describe('Game Description creation', () => {
  it('creates a p element', () => {
    const p = new GameDescription();

    expect(p.element?.tagName).toBe('P');
  });
});
