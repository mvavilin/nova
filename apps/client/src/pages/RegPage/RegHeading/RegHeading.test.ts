import { describe, it, expect } from 'vitest';
import RegHeading from './RegHeading';

describe('Reg heading creation', () => {
  it('creates a h1 element', () => {
    const heading = new RegHeading();

    expect(heading.element?.tagName).toBe('H1');
  });
});
