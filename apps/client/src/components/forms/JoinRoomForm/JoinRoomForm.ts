import { FORM_CLASSES } from '@constants/styles';
import { ContainerComponent, FormComponent } from '@api/ComponentsAPI';
import { Input, Button, FieldLabel } from '@components/ui';

export default class JoinRoomForm extends FormComponent {
  private roomLabel: FieldLabel;
  private inputContainer: ContainerComponent;
  private roomInput: Input;
  private joinRoomButton: Button;

  constructor() {
    super({ classes: FORM_CLASSES.FORM });

    this.roomLabel = new FieldLabel({
      text: 'Введите ID комнаты',
      htmlFor: 'roomID',
      classes: 'w-full',
    });

    this.roomInput = new Input({
      id: 'roomID',
      name: 'roomID',
      placeholder: 'ID комнаты',
      classes: FORM_CLASSES.INPUT,
    });

    this.joinRoomButton = new Button({
      label: 'Присоединиться',
      classes: FORM_CLASSES.BUTTON,
      onClick: (): void => {
        console.log('Join Room:', this.roomInput.value);
      },
    });

    this.inputContainer = new ContainerComponent({
      classes: FORM_CLASSES.INPUT_CONTAINER,
      children: [
        this.roomLabel,
        new ContainerComponent({
          classes: FORM_CLASSES.INPUT_ROW,
          children: [this.roomInput, this.joinRoomButton],
        }),
      ],
    });

    this.render();
  }

  private render(): void {
    this.appendChildren([this.inputContainer]);
  }
}
