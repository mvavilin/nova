import { describe, it, expect } from 'vitest';
import WelcomeHeading from './WelcomeHeading';

describe('Welcome heading creation', () => {
  it('creates a h1 element', () => {
    const heading = new WelcomeHeading();

    expect(heading.element?.tagName).toBe('H1');
  });
});
