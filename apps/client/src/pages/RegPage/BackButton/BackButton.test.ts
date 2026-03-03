import { describe, it, expect } from 'vitest';
import BackButton from './BackButton';

describe('Back button creation', () => {
  it('creates a button element', () => {
    const button = new BackButton();

    expect(button.element?.tagName).toBe('BUTTON');
  });
});
