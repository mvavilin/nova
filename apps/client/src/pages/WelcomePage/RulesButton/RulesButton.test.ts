import { describe, it, expect, vi } from 'vitest';
import mockStore from '@__mocks__/store/store.mock';

vi.mock('@store/store', () => ({
  __esModule: true,
  default: mockStore,
}));

import RulesButton from './RulesButton';

describe('Rules Button creation', () => {
  it('creates a button element', () => {
    const button = new RulesButton();

    expect(button.element?.tagName).toBe('BUTTON');
  });
});
