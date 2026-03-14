import { describe, it, expect, vi } from 'vitest';
import mockStore from '@__mocks__/store/store.mock';

vi.mock('@store/store', () => ({
  __esModule: true,
  default: mockStore,
}));

import AboutButton from './AboutButton';

describe('About Button creation', () => {
  it('creates a button element', () => {
    const button = new AboutButton();

    expect(button.element?.tagName).toBe('BUTTON');
  });
});
