import { ContainerComponent, RadioComponent } from '@api/ComponentsAPI';
import { FieldLabel } from '@components/ui';

interface RadioItemProperties {
  id: string;
  value: string;
  label: string;
}

const RADIO_CLASSES = {
  ITEM: 'flex items-center justify-center w-6 h-6',
  LABEL:
    'w-full text-black text-center rounded inline-block transition bg-white peer-checked:bg-blue-600 peer-checked:text-white hover:bg-blue-600 hover:text-white cursor-pointer',
  INPUT: 'hidden peer',
};

export default class RadioItem extends ContainerComponent {
  private _radioInput: RadioComponent;
  private radioLabel: FieldLabel;

  constructor({ id, value, label }: RadioItemProperties) {
    super({ classes: RADIO_CLASSES.ITEM });

    this._radioInput = new RadioComponent({
      id,
      value,
      classes: RADIO_CLASSES.INPUT,
    });

    this.radioLabel = new FieldLabel({
      htmlFor: id,
      text: label,
      classes: RADIO_CLASSES.LABEL,
    });

    this.render();
  }

  private render(): void {
    this.appendChildren([this.radioInput, this.radioLabel]);
  }

  public get radioInput(): RadioComponent {
    return this._radioInput;
  }

  public get checked(): boolean {
    return this.radioInput.isChecked();
  }

  public get value(): string {
    return this.radioInput.value;
  }
}
