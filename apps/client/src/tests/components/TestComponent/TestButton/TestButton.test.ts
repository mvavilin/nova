import { describe, it, expect } from 'vitest';
import TestButton from './TestButton';

describe('Test button creation', () => {
  it('creates a button element', () => {
    const button = new TestButton();

    expect(button.element?.tagName).toBe('BUTTON');
  });
});
