import { describe, it, expect, vi } from 'vitest';
import mockStore from '@__mocks__/store/store.mock';

vi.mock('@store/store', () => ({
  __esModule: true,
  default: mockStore,
}));

import WelcomeHeading from './WelcomeHeading';

describe('Welcome heading creation', () => {
  it('creates a h1 element', () => {
    const heading = new WelcomeHeading();

    expect(heading.element?.tagName).toBe('H1');
  });
});
