import { describe, it, expect, vi } from 'vitest';
import { mockClientUserStore } from '@__mocks__/store/clientUserStore.mock';

vi.mock('@store/clientUserStore', () => ({
  clientUserStore: mockClientUserStore,
}));

import LoginButton from './LoginButton';

describe('Login button creation', () => {
  it('creates a button element', () => {
    const button = new LoginButton();

    expect(button.element?.tagName).toBe('BUTTON');
  });
});
