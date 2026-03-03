import { describe, it, expect } from 'vitest';
import FetchButton from './FetchButton';

describe('Fetch button creation', () => {
  it('creates a button element', () => {
    const button = new FetchButton();

    expect(button.element?.tagName).toBe('BUTTON');
  });
});
