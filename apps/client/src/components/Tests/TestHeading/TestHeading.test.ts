import { describe, it, expect } from 'vitest';
import TestHeading from './TestHeading';

describe('Test heading creation', () => {
  it('creates a h1 element', () => {
    const heading = new TestHeading();

    expect(heading.element?.tagName).toBe('H1');
  });
});
