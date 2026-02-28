import { describe, it, expect } from 'vitest';
import RegButton from './RegButton';

describe('Registration button creation', () => {
  it('creates a button element', () => {
    const button = new RegButton();

    expect(button.element?.tagName).toBe('BUTTON');
  });
});
