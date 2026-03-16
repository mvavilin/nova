import { FORM_CLASSES } from '@/constants/styles';
import { InputComponent, type InputComponentProperties } from '@ComponentsAPI';
import { WarningMessage } from '@components/ui';

interface InputTextProperties extends InputComponentProperties {
  onInputText?: (value: string) => void;
  onChange?: (value: string) => void;
}

const INPUT_CLASSES = `w-full rounded bg-white px-3 py-1 text-black placeholder:text-gray-400 transition-colors focus:outline-none focus:ring-1 focus:ring-black disabled:cursor-not-allowed disabled:opacity-50`;

export default class InputText extends InputComponent {
  private warningMessage = new WarningMessage('Поле не может быть пустым');

  constructor({ onInputText, onChange, classes = '', ...properties }: InputTextProperties = {}) {
    super({
      ...properties,
      classes: `${INPUT_CLASSES} ${classes}`.trim(),
    });

    if (onInputText) this.setListeners({ input: () => onInputText(this.value) });

    if (onChange) this.setListeners({ input: () => onChange(this.value) });
  }

  public override isEmpty(): boolean {
    if (super.isEmpty()) {
      this.parent?.appendChildren(this.warningMessage);
      this.setClasses(FORM_CLASSES.INPUT_INVAVLID);

      return true;
    } else {
      this.warningMessage.destroy();
      this.removeClasses(FORM_CLASSES.INPUT_INVAVLID);

      return false;
    }
  }
}
