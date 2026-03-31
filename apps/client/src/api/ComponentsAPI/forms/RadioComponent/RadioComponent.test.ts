import { describe, it, expect } from 'vitest';
import RadioComponent from './RadioComponent';

describe('RadioComponent creation', () => {
  it('creates input of type radio', () => {
    const radioComponent = new RadioComponent();
    const element = radioComponent.element;

    expect(element).toBeInstanceOf(HTMLInputElement);
    if (element instanceof HTMLInputElement) {
      expect(element.type).toBe('radio');
    }
  });

  it('sets checked and value via constructor', () => {
    const radioComponent = new RadioComponent({
      checked: true,
      value: 'option1',
      name: 'group',
    });

    const element = radioComponent.element;

    expect(element).toBeInstanceOf(HTMLInputElement);
    if (element instanceof HTMLInputElement) {
      expect(element.checked).toBe(true);
      expect(element.value).toBe('option1');
      expect(element.name).toBe('group');
    }
  });
});

describe('RadioComponent behavior', () => {
  it('returns checked state', () => {
    const radioComponent = new RadioComponent({ checked: true });

    expect(radioComponent.isChecked()).toBe(true);
  });

  it('sets checked state via setChecked()', () => {
    const radioComponent = new RadioComponent();

    radioComponent.setChecked(true);

    expect(radioComponent.isChecked()).toBe(true);
  });

  it('changes value via inherited setValue()', () => {
    const radioComponent = new RadioComponent();

    radioComponent.setValue('new-value');

    const element = radioComponent.element;
    if (element instanceof HTMLInputElement) {
      expect(element.value).toBe('new-value');
    }
  });
});
