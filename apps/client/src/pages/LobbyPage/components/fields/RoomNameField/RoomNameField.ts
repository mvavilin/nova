import { ContainerComponent } from '@api/ComponentsAPI';
import { FieldLabel, InputText, Button } from '@components/ui';
import { FORM_CLASSES } from '@constants/styles';
import { CREATE_ROOM_FORM_CONFIG as CONFIG } from '@constants/forms';
import { t } from '@i18n';
import { TranslationKeys } from '@i18n/translationKeys';

export default class RoomNameField extends ContainerComponent {
  private onInput: (value: string) => void;
  private onSubmit: () => void;

  constructor(onInput: (value: string) => void, onSubmit: () => void) {
    super({ classes: FORM_CLASSES.INPUT_CONTAINER });

    this.onInput = onInput;
    this.onSubmit = onSubmit;

    this.render();
  }

  private render(): void {
    const label = new FieldLabel({
      text: t(TranslationKeys.ROOM_NAME_FIELD_TITLE),
      htmlFor: CONFIG.ROOM.INPUT_ID,
      classes: FORM_CLASSES.LABEL,
    });

    const input = new InputText({
      id: CONFIG.ROOM.INPUT_ID,
      name: CONFIG.ROOM.INPUT_NAME,
      placeholder: t(TranslationKeys.ROOM_NAME_FIELD_PLACEHOLDER),
      classes: FORM_CLASSES.INPUT,
      listeners: {
        input: (): void => {
          input.isEmpty();

          this.onInput(input.value);
        },
      },
    });

    const button = new Button({
      label: t(TranslationKeys.ROOM_NAME_FIELD_CREATE_BUTTON_LABEL),
      classes: FORM_CLASSES.BUTTON,
      listeners: {
        click: (): void => {
          if (input.isEmpty()) return;

          this.onSubmit();
        },
      },
    });

    const inputRow = new ContainerComponent({
      classes: FORM_CLASSES.INPUT_ROW,
      children: [input, button],
    });

    this.appendChildren([label, inputRow]);
  }
}
