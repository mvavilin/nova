import { describe, it, expect } from 'vitest';
import WelcomePage from './WelcomePage';

describe('WelcomePage container creation', () => {
  it('creates a div element', () => {
    const container = new WelcomePage();

    expect(container.element?.tagName).toBe('DIV');
  });
});
