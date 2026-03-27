import { describe, it, expect, vi } from 'vitest';
import mockStore from '@__mocks__/store/store.mock';

vi.mock('@store/store', () => ({
  __esModule: true,
  default: mockStore,
}));

vi.mock('@/api/RouterAPI/router', () => ({
  default: class {
    public init(): void {}
    public render(): void {}
  },
}));

import ProfileGrid from './ProfileGrid';

describe('ProfileGrid container creation', () => {
  it('creates a div element', () => {
    const container = new ProfileGrid();

    expect(container.element?.tagName).toBe('MAIN');
  });
});
