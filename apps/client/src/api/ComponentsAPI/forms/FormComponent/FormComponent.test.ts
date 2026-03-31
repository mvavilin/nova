import { describe, it, expect, vi } from 'vitest';
import FormComponent from './FormComponent';

describe('FormComponent creation', () => {
  it('creates form element', () => {
    const formComponent = new FormComponent();
    const element = formComponent.element;

    expect(element).toBeInstanceOf(HTMLFormElement);
    if (element instanceof HTMLFormElement) {
      expect(element.tagName).toBe('FORM');
    }
  });

  it('sets method, action and autocomplete via constructor', () => {
    const formComponent = new FormComponent({
      method: 'post',
      action: '/submit',
      autocomplete: 'off',
    });

    const element = formComponent.element;

    expect(element).toBeInstanceOf(HTMLFormElement);
    if (element instanceof HTMLFormElement) {
      expect(element.method).toBe('post');
      expect(element.action).toContain('/submit');
      expect(element.autocomplete).toBe('off');
    }
  });
});

describe('FormComponent methods', () => {
  it('sets action via setAction()', () => {
    const formComponent = new FormComponent();

    formComponent.setAction('/test');

    const element = formComponent.element;
    if (element instanceof HTMLFormElement) {
      expect(element.action).toContain('/test');
    }
  });

  it('sets method via setMethod()', () => {
    const formComponent = new FormComponent();

    formComponent.setMethod('post');

    const element = formComponent.element;
    if (element instanceof HTMLFormElement) {
      expect(element.method).toBe('post');
    }
  });

  it('sets autocomplete via setAutocomplete()', () => {
    const formComponent = new FormComponent();

    formComponent.setAutocomplete('off');

    const element = formComponent.element;
    if (element instanceof HTMLFormElement) {
      expect(element.autocomplete).toBe('off');
    }
  });

  it('calls native submit()', () => {
    const formComponent = new FormComponent();
    const element = formComponent.element;

    if (element instanceof HTMLFormElement) {
      const submitSpy = vi.spyOn(element, 'submit');

      formComponent.submit();

      expect(submitSpy).toHaveBeenCalled();
    }
  });

  it('calls native reset()', () => {
    const formComponent = new FormComponent();
    const element = formComponent.element;

    if (element instanceof HTMLFormElement) {
      const resetSpy = vi.spyOn(element, 'reset');

      formComponent.reset();

      expect(resetSpy).toHaveBeenCalled();
    }
  });

  it('returns FormData with inputs', () => {
    const formComponent = new FormComponent();

    const input = document.createElement('input');
    input.name = 'test';
    input.value = '123';

    const element = formComponent.element;

    if (element instanceof HTMLFormElement) {
      element.append(input);

      const formData = formComponent.getFormData();

      expect(formData.get('test')).toBe('123');
    }
  });
});
