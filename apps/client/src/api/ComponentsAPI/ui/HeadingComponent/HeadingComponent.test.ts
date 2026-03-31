import { describe, it, expect } from 'vitest';
import HeadingComponent from './HeadingComponent';

describe('HeadingComponent creation', () => {
  it('creates h1 by default', () => {
    const heading = new HeadingComponent();
    expect(heading.element?.tagName).toBe('H1');
  });

  it('creates correct heading level', () => {
    const heading = new HeadingComponent({ level: 3 });
    expect(heading.element?.tagName).toBe('H3');
  });

  it('sets default content', () => {
    const heading = new HeadingComponent();
    expect(heading.element?.textContent).toBe('Header');
  });

  it('sets custom content', () => {
    const heading = new HeadingComponent({ content: 'Title' });
    expect(heading.element?.textContent).toBe('Title');
  });
});

describe('HeadingComponent setLevel', () => {
  it('changes heading level and keeps content', () => {
    const heading = new HeadingComponent({
      level: 1,
      content: 'Title',
    });

    heading.setLevel(3);

    expect(heading.element?.tagName).toBe('H3');
    expect(heading.element?.textContent).toBe('Title');
  });

  it('preserves classes and attributes', () => {
    const heading = new HeadingComponent({
      level: 2,
      classes: 'test',
      attributes: { 'data-id': '123' },
    });

    heading.setLevel(4);

    expect(heading.element?.classList.contains('test')).toBe(true);
    expect(heading.element?.dataset['id']).toBe('123');
  });
});
