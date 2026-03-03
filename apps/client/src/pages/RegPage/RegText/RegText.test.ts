import { describe, it, expect } from 'vitest';
import RegText from './RegText';

describe('Reg Text creation', () => {
  it('creates a p element', () => {
    const heading = new RegText();

    expect(heading.element?.tagName).toBe('P');
  });
});
