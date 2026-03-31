import { describe, it, expect } from 'vitest';
import TextareaComponent from './TextareaComponent';

describe('TextareaComponent creation', () => {
  it('creates textarea element', () => {
    const textareaComponent = new TextareaComponent();
    const element = textareaComponent.element;

    expect(element).toBeInstanceOf(HTMLTextAreaElement);
    if (element instanceof HTMLTextAreaElement) {
      expect(element.tagName).toBe('TEXTAREA');
    }
  });

  it('sets properties via constructor', () => {
    const textareaComponent = new TextareaComponent({
      value: 'Hello',
      placeholder: 'Enter text',
      rows: 5,
      cols: 10,
      autocomplete: 'off',
    });

    const element = textareaComponent.element;

    if (element instanceof HTMLTextAreaElement) {
      expect(element.value).toBe('Hello');
      expect(element.placeholder).toBe('Enter text');
      expect(element.rows).toBe(5);
      expect(element.cols).toBe(10);
      expect(element.autocomplete).toBe('off');
    }
  });
});

describe('TextareaComponent setters', () => {
  it('sets value', () => {
    const textareaComponent = new TextareaComponent();

    textareaComponent.setValue('Test');

    expect(textareaComponent.getValue()).toBe('Test');
  });

  it('sets placeholder, rows and cols', () => {
    const textareaComponent = new TextareaComponent();

    textareaComponent.setPlaceholder('Type here').setRows(3).setCols(20);

    const element = textareaComponent.element;

    if (element instanceof HTMLTextAreaElement) {
      expect(element.placeholder).toBe('Type here');
      expect(element.rows).toBe(3);
      expect(element.cols).toBe(20);
    }
  });

  it('sets required', () => {
    const textareaComponent = new TextareaComponent();

    textareaComponent.setRequired(true);

    const element = textareaComponent.element;

    if (element instanceof HTMLTextAreaElement) {
      expect(element.required).toBe(true);
    }
  });

  it('sets autocomplete', () => {
    const textareaComponent = new TextareaComponent();

    textareaComponent.setAutocomplete('off');

    const element = textareaComponent.element;

    if (element instanceof HTMLTextAreaElement) {
      expect(element.autocomplete).toBe('off');
    }
  });
});

describe('TextareaComponent behavior', () => {
  it('clears value', () => {
    const textareaComponent = new TextareaComponent({ value: 'Some text' });

    textareaComponent.clear();

    expect(textareaComponent.getValue()).toBe('');
  });
});
