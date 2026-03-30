import { describe, it, expect } from 'vitest';
import DomFacade from './DomFacade';
import BaseComponent from '../BaseComponent';

describe('DomFacade', () => {
  it('creates all managers and exposes them', () => {
    const owner = new BaseComponent();
    const facade = new DomFacade(owner, 'div');

    expect(facade.element).toBeDefined();
    expect(facade.classes).toBeDefined();
    expect(facade.styles).toBeDefined();
    expect(facade.visibility).toBeDefined();
    expect(facade.content).toBeDefined();

    expect(facade.attributes).toBeDefined();
    expect(facade.events).toBeDefined();

    expect(facade.children).toBeDefined();
    expect(facade.hierarchy).toBeDefined();
  });
});
