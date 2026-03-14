import { ContainerComponent } from '@api/ComponentsAPI';
import { FieldLabel, InputText, Button } from '@components/ui';
import { FORM_CLASSES } from '@constants/styles';
import { CREATE_ROOM_FORM_CONFIG as CONFIG } from '@constants/forms';

export default class RoomNameField extends ContainerComponent {
  constructor(onInput: (value: string) => void, onSubmit: () => void) {
    const label = new FieldLabel({
      text: CONFIG.ROOM.LABEL_TEXT,
      htmlFor: CONFIG.ROOM.INPUT_ID,
      classes: FORM_CLASSES.LABEL,
    });

    const input = new InputText({
      id: CONFIG.ROOM.INPUT_ID,
      name: CONFIG.ROOM.INPUT_NAME,
      placeholder: CONFIG.ROOM.PLACEHOLDER,
      classes: FORM_CLASSES.INPUT,
      listeners: { input: (): void => onInput(input.value) },
    });

    const button = new Button({
      label: CONFIG.BUTTON.LABEL,
      classes: FORM_CLASSES.BUTTON,
      onClick: onSubmit,
    });

    super({
      classes: FORM_CLASSES.INPUT_CONTAINER,
      children: [
        label,
        new ContainerComponent({ classes: FORM_CLASSES.INPUT_ROW, children: [input, button] }),
      ],
    });
  }
}
