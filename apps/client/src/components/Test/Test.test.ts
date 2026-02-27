import { describe, it, expect } from 'vitest';
import Test from './Test';

describe('App creation', () => {
  it('creates a div element', () => {
    const app = new Test();

    expect(app.element?.tagName).toBe('DIV');
  });
});
