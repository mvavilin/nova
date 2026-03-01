import { describe, it, expect } from 'vitest';
import ContainerComponent from './ContainerComponent';

describe('ContainerComponent creation', () => {
  it('creates a div container element', () => {
    const container = new ContainerComponent();
    const element = container.element;

    expect(element?.tagName).toBe('DIV');
  });
});

describe('ContainerComponent getChildren', () => {
  it('returns empty HTMLCollection initially', () => {
    const container = new ContainerComponent();
    expect(container.getChildren().length).toBe(0);
  });

  it('returns children after appending elements', () => {
    const container = new ContainerComponent();
    const child1 = new ContainerComponent();
    const child2 = new ContainerComponent();
    container.setChildren([child1, child2]);

    const children = container.children;
    expect(children.length).toBe(2);
    expect(children[0]).toBe(child1);
    expect(children[1]).toBe(child2);
  });
});
