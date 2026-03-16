import { describe, it, expect, vi } from 'vitest';
import mockStore from '@__mocks__/store/store.mock';

vi.mock('@store/store', () => ({
  __esModule: true,
  default: mockStore,
}));

vi.mock('@/api/RouterAPI/router', () => ({
  default: class {
    public init(): void {}
  },
}));

import WelcomePage from './WelcomePage';

describe('WelcomePage container creation', () => {
  it('creates a div element', () => {
    const container = new WelcomePage();

    expect(container.element?.tagName).toBe('DIV');
  });
});
