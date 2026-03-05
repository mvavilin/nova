import { describe, it, expect } from 'vitest';
import RegPage from './TestPage';

describe('Reg page container creation', () => {
  it('creates a div element', () => {
    const container = new RegPage();

    expect(container.element?.tagName).toBe('DIV');
  });
});
