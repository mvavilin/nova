import { describe, it, expect } from 'vitest';
import SelectComponent from './SelectComponent';

describe('SelectComponent creation', () => {
  it('creates select element', () => {
    const selectComponent = new SelectComponent();
    const element = selectComponent.element;

    expect(element).toBeInstanceOf(HTMLSelectElement);
    if (element instanceof HTMLSelectElement) {
      expect(element.tagName).toBe('SELECT');
    }
  });

  it('sets multiple and autocomplete via constructor', () => {
    const selectComponent = new SelectComponent({
      multiple: true,
      autocomplete: 'off',
    });

    const element = selectComponent.element;

    if (element instanceof HTMLSelectElement) {
      expect(element.multiple).toBe(true);
      expect(element.autocomplete).toBe('off');
    }
  });
});

describe('SelectComponent options management', () => {
  it('sets options via setOptions()', () => {
    const selectComponent = new SelectComponent();

    selectComponent.setOptions([
      { value: '1', label: 'One' },
      { value: '2', label: 'Two', selected: true },
    ]);

    const element = selectComponent.element;

    if (element instanceof HTMLSelectElement) {
      expect(element.options.length).toBe(2);
      expect(element.options[0]?.value).toBe('1');
      expect(element.options[1]?.selected).toBe(true);
    }
  });

  it('adds option via addOption()', () => {
    const selectComponent = new SelectComponent();

    selectComponent.addOption('1', 'One', true);

    const element = selectComponent.element;

    if (element instanceof HTMLSelectElement) {
      expect(element.options.length).toBe(1);
      expect(element.options[0]?.value).toBe('1');
      expect(element.options[0]?.selected).toBe(true);
    }
  });

  it('removes option by value', () => {
    const selectComponent = new SelectComponent();

    selectComponent.setOptions([
      { value: '1', label: 'One' },
      { value: '2', label: 'Two' },
    ]);

    selectComponent.removeOption('1');

    const element = selectComponent.element;

    if (element instanceof HTMLSelectElement) {
      expect(element.options.length).toBe(1);
      expect(element.options[0]?.value).toBe('2');
    }
  });

  it('clears all options', () => {
    const selectComponent = new SelectComponent();

    selectComponent.setOptions([
      { value: '1', label: 'One' },
      { value: '2', label: 'Two' },
    ]);

    selectComponent.clearOptions();

    const element = selectComponent.element;

    if (element instanceof HTMLSelectElement) {
      expect(element.options.length).toBe(0);
    }
  });
});

describe('SelectComponent value handling', () => {
  it('gets and sets value (single)', () => {
    const selectComponent = new SelectComponent({
      options: [
        { value: '1', label: 'One' },
        { value: '2', label: 'Two' },
      ],
    });

    selectComponent.setValue('2');

    expect(selectComponent.getValue()).toBe('2');
  });

  it('gets and sets value (multiple)', () => {
    const selectComponent = new SelectComponent({
      multiple: true,
      options: [
        { value: '1', label: 'One' },
        { value: '2', label: 'Two' },
        { value: '3', label: 'Three' },
      ],
    });

    selectComponent.setValue(['1', '3']);

    const value = selectComponent.getValue();

    expect(Array.isArray(value)).toBe(true);
    if (Array.isArray(value)) {
      expect(value).toContain('1');
      expect(value).toContain('3');
      expect(value.length).toBe(2);
    }
  });
});

describe('SelectComponent behavior', () => {
  it('toggles multiple mode', () => {
    const selectComponent = new SelectComponent();

    expect(selectComponent.isMultiple()).toBe(false);

    selectComponent.setMultiple(true);
    expect(selectComponent.isMultiple()).toBe(true);
  });
});
