import { describe, it, expect } from 'vitest';
import ImageComponent from './ImageComponent';

describe('ImageComponent', () => {
  it('creates an img element', () => {
    const imageComponent = new ImageComponent();
    const element = imageComponent.element;
    expect(element).toBeInstanceOf(HTMLImageElement);
    if (element instanceof HTMLImageElement) {
      expect(element.tagName).toBe('IMG');
    }
  });

  it('sets src and alt via constructor', () => {
    const imageComponent = new ImageComponent({ source: 'path/to/image.png', alt: 'Test image' });
    const element = imageComponent.element;
    expect(element).toBeInstanceOf(HTMLImageElement);
    if (element instanceof HTMLImageElement) {
      expect(element.src).toContain('path/to/image.png');
      expect(element.alt).toBe('Test image');
    }
  });

  it('sets src via setSrc()', () => {
    const imageComponent = new ImageComponent();
    imageComponent.setSrc('new/path.png');
    const element = imageComponent.element;
    expect(element).toBeInstanceOf(HTMLImageElement);
    if (element instanceof HTMLImageElement) {
      expect(element.src).toContain('new/path.png');
    }
  });

  it('sets alt via setAlt()', () => {
    const imageComponent = new ImageComponent();
    imageComponent.setAlt('New alt');
    const element = imageComponent.element;
    expect(element).toBeInstanceOf(HTMLImageElement);
    if (element instanceof HTMLImageElement) {
      expect(element.alt).toBe('New alt');
    }
  });

  it('sets width and height via constructor', () => {
    const imageComponent = new ImageComponent({ width: 200, height: 100 });
    const element = imageComponent.element;
    expect(element).toBeInstanceOf(HTMLImageElement);
    if (element instanceof HTMLImageElement) {
      expect(element.width).toBe(200);
      expect(element.height).toBe(100);
    }
  });

  it('sets width and height via setDimensions()', () => {
    const imageComponent = new ImageComponent();
    imageComponent.setDimensions(300, 150);
    const element = imageComponent.element;
    expect(element).toBeInstanceOf(HTMLImageElement);
    if (element instanceof HTMLImageElement) {
      expect(element.width).toBe(300);
      expect(element.height).toBe(150);
    }
  });
});
