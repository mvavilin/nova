import { describe, it, expect } from 'vitest';
import LangButton from './LangButton';

describe('Language button creation', () => {
  it('creates a button element', () => {
    const button = new LangButton();

    expect(button.element?.tagName).toBe('BUTTON');
  });
});
