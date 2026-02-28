import { describe, it, expect } from 'vitest';
import LoginButton from './LoginButton';

describe('Login button creation', () => {
  it('creates a button element', () => {
    const button = new LoginButton();

    expect(button.element?.tagName).toBe('BUTTON');
  });
});
