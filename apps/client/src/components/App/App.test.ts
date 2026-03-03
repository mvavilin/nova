import { describe, it, expect } from 'vitest';
import App from './App';

describe('App creation', () => {
  it('creates a div element', () => {
    const app = new App();

    expect(app.element?.tagName).toBe('DIV');
  });
});
