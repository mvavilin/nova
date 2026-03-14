import { InputComponent, type InputComponentProperties } from '@ComponentsAPI';

interface InputTextProperties extends InputComponentProperties {
  onInputText?: (value: string) => void;
  onChange?: (value: string) => void;
}

const INPUT_CLASSES = `w-full rounded bg-white px-3 py-1 text-black placeholder:text-gray-400 shadow-sm transition-colors focus:outline-none focus:ring-1 focus:ring-black disabled:cursor-not-allowed disabled:opacity-50`;

export default class InputText extends InputComponent {
  constructor({ onInputText, onChange, classes = '', ...properties }: InputTextProperties = {}) {
    super({
      ...properties,
      classes: `${INPUT_CLASSES} ${classes}`.trim(),
    });

    if (onInputText) this.setListeners({ input: () => onInputText(this.value) });

    if (onChange) this.setListeners({ input: () => onChange(this.value) });
  }
}
