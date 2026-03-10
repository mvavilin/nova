import { InputComponent, type InputComponentProperties } from '@ComponentsAPI';

interface InputProperties extends InputComponentProperties {
  onInput?: (value: string) => void;
  onChange?: (value: string) => void;
}

const INPUT_CLASSES = `w-full rounded bg-white px-3 py-1 text-black placeholder:text-gray-400 shadow-sm transition-colors focus:outline-none focus:ring-1 focus:ring-black disabled:cursor-not-allowed disabled:opacity-50`;

export default class Input extends InputComponent {
  constructor({ onInput, onChange, classes = '', ...properties }: InputProperties = {}) {
    super({
      ...properties,
      classes: `${INPUT_CLASSES} ${classes}`.trim(),
    });

    if (onInput) this.setListeners({ input: () => onInput(this.value) });

    if (onChange) this.setListeners({ input: () => onChange(this.value) });
  }
}
