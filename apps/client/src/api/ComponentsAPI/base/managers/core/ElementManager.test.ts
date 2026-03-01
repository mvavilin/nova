import { describe, it, expect } from 'vitest';
import ElementManager from './ElementManager';

function getDomElement(manager: ElementManager): Element {
  return manager.domElement;
}

describe('ElementManager default creation', () => {
  it('creates an HTML div element by default', () => {
    const manager = new ElementManager();
    const element = getDomElement(manager);

    expect(element).toBeInstanceOf(HTMLElement);
    expect(element.tagName).toBe('DIV');
  });
});

describe('ElementManager custom HTML tag', () => {
  it('creates an HTML element with provided tag', () => {
    const manager = new ElementManager('button');
    const element = getDomElement(manager);

    expect(element).toBeInstanceOf(HTMLElement);
    expect(element.tagName).toBe('BUTTON');
  });
});

describe('ElementManager SVG namespace', () => {
  it('creates an SVG element when namespace is svg', () => {
    const manager = new ElementManager('circle', 'svg');
    const element = getDomElement(manager);

    expect(element).toBeInstanceOf(SVGElement);
    expect(element.tagName).toBe('circle');
    expect(element.namespaceURI).toBe('http://www.w3.org/2000/svg');
  });
});

describe('ElementManager error handling', () => {
  it('throws if domElement accessed before creation', () => {
    const manager = new ElementManager();
    Object.defineProperty(manager, 'element', { value: null });

    expect(() => manager.domElement).toThrow('Element not created');
  });
});
