import { describe, it, expect } from 'vitest';
import TestContainer from './TestContainer';

describe('Test container creation', () => {
  it('creates a div element', () => {
    const container = new TestContainer();

    expect(container.element?.tagName).toBe('DIV');
  });
});
