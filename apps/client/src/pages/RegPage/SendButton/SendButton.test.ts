import { describe, it, expect } from 'vitest';
import SendButton from './SendButton';

describe('Send button creation', () => {
  it('creates a button element', () => {
    const button = new SendButton();

    expect(button.element?.tagName).toBe('BUTTON');
  });
});
