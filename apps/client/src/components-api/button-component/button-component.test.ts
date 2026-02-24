import { describe, it, expect } from 'vitest';
import ButtonComponent from './button-component';

function getButtonElement(button: ButtonComponent): HTMLButtonElement {
  const element = button.element;
  if (!element) throw new Error('Button element is null');
  if (!(element instanceof HTMLButtonElement)) throw new TypeError('Element is not a button');
  return element;
}

describe('ButtonComponent creation', () => {
  it('creates a button element with default content', () => {
    const button = new ButtonComponent();
    const element = getButtonElement(button);
    expect(element.tagName).toBe('BUTTON');
    expect(element.textContent).toBe('Button');
  });
});

describe('ButtonComponent type property', () => {
  it('sets type correctly', () => {
    const button = new ButtonComponent({ type: 'submit' });
    const element = getButtonElement(button);
    expect(element.type).toBe('submit');

    button.setType('reset');
    expect(element.type).toBe('reset');
  });
});

describe('ButtonComponent disabled property', () => {
  it('sets disabled correctly', () => {
    const button = new ButtonComponent({ disabled: true });
    const element = getButtonElement(button);
    expect(element.disabled).toBe(true);

    button.setDisabled(false);
    expect(element.disabled).toBe(false);
  });
});

describe('ButtonComponent name property', () => {
  it('sets name correctly', () => {
    const button = new ButtonComponent({ name: 'my-button' });
    const element = getButtonElement(button);
    expect(element.name).toBe('my-button');

    button.setName('new-name');
    expect(element.name).toBe('new-name');
  });
});

describe('ButtonComponent value property', () => {
  it('sets value correctly', () => {
    const button = new ButtonComponent({ value: '123' });
    const element = getButtonElement(button);
    expect(element.value).toBe('123');

    button.setValue('456');
    expect(element.value).toBe('456');
  });
});
