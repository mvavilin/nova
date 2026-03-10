import { FORM_CLASSES } from '@constants/styles';
import { ContainerComponent, FormComponent } from '@api/ComponentsAPI';
import { Input, Button, FieldLabel } from '@components/ui';

export default class CreateRoomForm extends FormComponent {
  private roomLabel: FieldLabel;
  private inputContainer: ContainerComponent;
  private roomInput: Input;
  private createRoomButton: Button;

  constructor() {
    super({ classes: FORM_CLASSES.FORM });

    this.roomLabel = new FieldLabel({
      text: 'Введите название комнаты',
      htmlFor: 'roomName',
      classes: 'w-full',
    });

    this.roomInput = new Input({
      id: 'roomName',
      name: 'roomName',
      placeholder: 'Название комнаты',
      classes: FORM_CLASSES.INPUT,
    });

    this.createRoomButton = new Button({
      label: 'Создать',
      classes: FORM_CLASSES.BUTTON,
      onClick: (): void => {
        console.log('Создать комнату:', this.roomInput.value);
      },
    });

    this.inputContainer = new ContainerComponent({
      classes: FORM_CLASSES.INPUT_CONTAINER,
      children: [
        this.roomLabel,
        new ContainerComponent({
          classes: FORM_CLASSES.INPUT_ROW,
          children: [this.roomInput, this.createRoomButton],
        }),
      ],
    });

    this.render();
  }

  private render(): void {
    this.appendChildren([this.inputContainer]);
  }
}
