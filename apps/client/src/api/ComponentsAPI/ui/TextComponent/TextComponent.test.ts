import { describe, it, expect } from 'vitest';
import TextComponent from './TextComponent';

describe('TextComponent creation', () => {
  it('creates paragraph by default', () => {
    const textComponent = new TextComponent();
    const element = textComponent.element;

    expect(element?.tagName).toBe('P');
  });

  it('creates custom tag', () => {
    const textComponent = new TextComponent({ tag: 'span' });
    const element = textComponent.element;

    expect(element?.tagName).toBe('SPAN');
  });

  it('sets initial content', () => {
    const textComponent = new TextComponent({ content: 'Hello' });
    const element = textComponent.element;

    expect(element?.textContent).toBe('Hello');
  });
});

describe('TextComponent text manipulation', () => {
  it('appends text', () => {
    const textComponent = new TextComponent({ content: 'Hello' });

    textComponent.appendText(' World');

    const element = textComponent.element;
    expect(element?.textContent).toBe('Hello World');
  });

  it('prepends text', () => {
    const textComponent = new TextComponent({ content: 'World' });

    textComponent.prependText('Hello ');

    const element = textComponent.element;
    expect(element?.textContent).toBe('Hello World');
  });

  it('uppercases text', () => {
    const textComponent = new TextComponent({ content: 'hello' });

    textComponent.uppercase();

    const element = textComponent.element;
    expect(element?.textContent).toBe('HELLO');
  });

  it('lowercases text', () => {
    const textComponent = new TextComponent({ content: 'HELLO' });

    textComponent.lowercase();

    const element = textComponent.element;
    expect(element?.textContent).toBe('hello');
  });

  it('capitalizes text', () => {
    const textComponent = new TextComponent({ content: 'hello world' });

    textComponent.capitalize();

    const element = textComponent.element;
    expect(element?.textContent).toBe('Hello World');
  });
});
