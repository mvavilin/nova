import { describe, it, expect, vi } from 'vitest';
import mockStore from '@__mocks__/store/store.mock';

vi.mock('@store/store', () => ({
  __esModule: true,
  default: mockStore,
}));

import AboutUs from './AboutUs';

describe('About Us creation', () => {
  it('creates a p element', () => {
    const p = new AboutUs();

    expect(p.element?.tagName).toBe('DIV');
  });
});
