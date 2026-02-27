import { describe, it, expect } from 'vitest';
import LabelComponent from './LabelComponent';

describe('LabelComponent creation', () => {
  it('creates a label element', () => {
    const label = new LabelComponent();

    expect(label.element?.tagName).toBe('LABEL');
  });

  it('sets htmlFor via constructor', () => {
    const label = new LabelComponent({ htmlFor: 'input-id' });
    const element = label.element;

    expect(element instanceof HTMLLabelElement).toBe(true);
    if (element instanceof HTMLLabelElement) {
      expect(element.htmlFor).toBe('input-id');
    }
  });
});

describe('LabelComponent setFor()', () => {
  it('sets htmlFor attribute', () => {
    const label = new LabelComponent();

    label.setFor('email');

    const element = label.element;
    if (element instanceof HTMLLabelElement) {
      expect(element.htmlFor).toBe('email');
    }
  });

  it('overwrites existing htmlFor', () => {
    const label = new LabelComponent({ htmlFor: 'first' });

    label.setFor('second');

    const element = label.element;
    if (element instanceof HTMLLabelElement) {
      expect(element.htmlFor).toBe('second');
    }
  });

  it('returns this for chaining', () => {
    const label = new LabelComponent();

    const result = label.setFor('test');

    expect(result).toBe(label);
  });
});
