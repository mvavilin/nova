import { describe, it, expect } from 'vitest';
import TestText from './TestText';

describe('Test Text creation', () => {
  it('creates a p element', () => {
    const heading = new TestText();

    expect(heading.element?.tagName).toBe('P');
  });
});
