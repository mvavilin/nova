import { describe, it, expect } from 'vitest';
import LinkComponent from './LinkComponent';

describe('LinkComponent', () => {
  it('creates an anchor element', () => {
    const linkComponent = new LinkComponent();
    const element = linkComponent.element;

    expect(element).toBeInstanceOf(HTMLAnchorElement);
    if (element instanceof HTMLAnchorElement) {
      expect(element.tagName).toBe('A');
    }
  });

  it('sets href, target, and rel via constructor', () => {
    const linkComponent = new LinkComponent({ href: '/home', target: '_blank', rel: 'noopener' });
    const element = linkComponent.element;

    expect(element).toBeInstanceOf(HTMLAnchorElement);
    if (element instanceof HTMLAnchorElement) {
      expect(element.href).toContain('/home'); // браузеры добавляют полный URL
      expect(element.target).toBe('_blank');
      expect(element.rel).toBe('noopener');
    }
  });

  it('sets href via setHref()', () => {
    const linkComponent = new LinkComponent();
    linkComponent.setHref('/about');
    const element = linkComponent.element;

    expect(element).toBeInstanceOf(HTMLAnchorElement);
    if (element instanceof HTMLAnchorElement) {
      expect(element.href).toContain('/about');
    }
  });

  it('sets target via setTarget()', () => {
    const linkComponent = new LinkComponent();
    linkComponent.setTarget('_parent');
    const element = linkComponent.element;

    expect(element).toBeInstanceOf(HTMLAnchorElement);
    if (element instanceof HTMLAnchorElement) {
      expect(element.target).toBe('_parent');
    }
  });

  it('sets rel via setRel()', () => {
    const linkComponent = new LinkComponent();
    linkComponent.setRel('nofollow');
    const element = linkComponent.element;

    expect(element).toBeInstanceOf(HTMLAnchorElement);
    if (element instanceof HTMLAnchorElement) {
      expect(element.rel).toBe('nofollow');
    }
  });
});
