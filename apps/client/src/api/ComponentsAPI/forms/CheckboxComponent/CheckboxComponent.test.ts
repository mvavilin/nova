import { describe, it, expect } from 'vitest';
import CheckboxComponent from './CheckboxComponent';

describe('CheckboxComponent creation', () => {
  it('creates input of type checkbox', () => {
    const checkboxComponent = new CheckboxComponent();
    const element = checkboxComponent.element;

    expect(element).toBeInstanceOf(HTMLInputElement);
    if (element instanceof HTMLInputElement) {
      expect(element.type).toBe('checkbox');
    }
  });

  it('sets checked state via constructor', () => {
    const checkboxComponent = new CheckboxComponent({ checked: true });
    const element = checkboxComponent.element;

    expect(element).toBeInstanceOf(HTMLInputElement);
    if (element instanceof HTMLInputElement) {
      expect(element.checked).toBe(true);
    }
  });
});

describe('CheckboxComponent behavior', () => {
  it('returns checked state with isChecked()', () => {
    const checkboxComponent = new CheckboxComponent({ checked: true });

    expect(checkboxComponent.isChecked()).toBe(true);
  });

  it('sets checked state via setChecked()', () => {
    const checkboxComponent = new CheckboxComponent();

    checkboxComponent.setChecked(true);

    const element = checkboxComponent.element;
    expect(element).toBeInstanceOf(HTMLInputElement);
    if (element instanceof HTMLInputElement) {
      expect(element.checked).toBe(true);
    }
  });

  it('toggles checked state', () => {
    const checkboxComponent = new CheckboxComponent({ checked: false });

    checkboxComponent.toggle();
    expect(checkboxComponent.isChecked()).toBe(true);

    checkboxComponent.toggle();
    expect(checkboxComponent.isChecked()).toBe(false);
  });
});
