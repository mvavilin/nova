import { describe, it, expect, vi } from 'vitest';
import { mockClientUserStore } from '@__mocks__/store/clientUserStore.mock';

vi.mock('@store/clientUserStore', () => ({
  clientUserStore: mockClientUserStore,
}));

import RegButton from './RegButton';

describe('Registration button creation', () => {
  it('creates a button element', () => {
    const button = new RegButton();

    expect(button.element?.tagName).toBe('BUTTON');
  });
});
