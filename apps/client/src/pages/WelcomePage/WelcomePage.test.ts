import { describe, it, expect, vi } from 'vitest';
import { mockClientUserStore } from '@__mocks__/store/clientUserStore.mock';

vi.mock('@store/clientUserStore', () => ({
  clientUserStore: mockClientUserStore,
}));

import WelcomePage from './WelcomePage';

describe('WelcomePage container creation', () => {
  it('creates a div element', () => {
    const container = new WelcomePage();

    expect(container.element?.tagName).toBe('DIV');
  });
});
