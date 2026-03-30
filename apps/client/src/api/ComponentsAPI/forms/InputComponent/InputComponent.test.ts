import { describe, it, expect } from 'vitest';
import InputComponent from './InputComponent';

describe('InputComponent creation', () => {
  it('creates input element', () => {
    const inputComponent = new InputComponent();
    const element = inputComponent.element;

    expect(element).toBeInstanceOf(HTMLInputElement);
    if (element instanceof HTMLInputElement) {
      expect(element.tagName).toBe('INPUT');
      expect(element.type).toBe('text');
    }
  });

  it('sets properties via constructor', () => {
    const inputComponent = new InputComponent({
      type: 'email',
      name: 'email',
      placeholder: 'Enter email',
      value: 'test@mail.com',
      autocomplete: 'off',
    });

    const element = inputComponent.element;

    expect(element).toBeInstanceOf(HTMLInputElement);
    if (element instanceof HTMLInputElement) {
      expect(element.type).toBe('email');
      expect(element.name).toBe('email');
      expect(element.placeholder).toBe('Enter email');
      expect(element.value).toBe('test@mail.com');
      expect(element.autocomplete).toBe('off');
    }
  });
});

describe('InputComponent setters', () => {
  it('sets value', () => {
    const inputComponent = new InputComponent();

    inputComponent.setValue('123');

    const element = inputComponent.element;
    if (element instanceof HTMLInputElement) {
      expect(element.value).toBe('123');
    }
  });

  it('sets name, type and placeholder', () => {
    const inputComponent = new InputComponent();

    inputComponent.setName('username').setType('password').setPlaceholder('Enter password');

    const element = inputComponent.element;

    if (element instanceof HTMLInputElement) {
      expect(element.name).toBe('username');
      expect(element.type).toBe('password');
      expect(element.placeholder).toBe('Enter password');
    }
  });

  it('sets disabled and required', () => {
    const inputComponent = new InputComponent();

    inputComponent.setDisabled(true).setRequired(true);

    const element = inputComponent.element;

    if (element instanceof HTMLInputElement) {
      expect(element.disabled).toBe(true);
      expect(element.required).toBe(true);
    }
  });
});

describe('InputComponent getters and helpers', () => {
  it('returns value and length', () => {
    const inputComponent = new InputComponent({ value: 'abc' });

    expect(inputComponent.value).toBe('abc');
    expect(inputComponent.length).toBe(3);
  });

  it('checks isEmpty()', () => {
    const inputComponent = new InputComponent();

    expect(inputComponent.isEmpty()).toBe(true);

    inputComponent.setValue('x');
    expect(inputComponent.isEmpty()).toBe(false);
  });

  it('checks length range', () => {
    const inputComponent = new InputComponent({ value: 'abcd' });

    expect(inputComponent.isLengthBetween(2, 5)).toBe(true);
    expect(inputComponent.isLengthBetween(5, 10)).toBe(false);
  });

  it('validates by regex', () => {
    const inputComponent = new InputComponent({ value: '12345' });

    expect(inputComponent.isValidByRegex(/^\d+$/)).toBe(true);
    expect(inputComponent.isValidByRegex(/^[a-z]+$/)).toBe(false);
  });
});

describe('InputComponent form behavior', () => {
  it('checks validity', () => {
    const inputComponent = new InputComponent();

    const element = inputComponent.element;

    if (element instanceof HTMLInputElement) {
      element.required = true;

      expect(inputComponent.isValid()).toBe(false);

      inputComponent.setValue('value');
      expect(inputComponent.isValid()).toBe(true);
    }
  });

  it('clears value', () => {
    const inputComponent = new InputComponent({ value: 'test' });

    inputComponent.clear();

    expect(inputComponent.value).toBe('');
  });
});
