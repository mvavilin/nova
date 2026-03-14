import { FORM_CLASSES } from '@constants/styles';
import { ContainerComponent, FormComponent } from '@api/ComponentsAPI';
import { InputText, Button, FieldLabel } from '@components/ui';

export default class SearchRoomForm extends FormComponent {
  private roomLabel: FieldLabel;
  private inputContainer: ContainerComponent;
  private roomInput: InputText;
  private searchRoomButton: Button;

  constructor() {
    super({ classes: FORM_CLASSES.FORM });

    this.roomLabel = new FieldLabel({
      text: 'Введите название комнаты',
      htmlFor: 'searchRoom',
      classes: 'w-full',
    });

    this.roomInput = new InputText({
      id: 'searchRoom',
      name: 'searchRoom',
      placeholder: 'Поиск комнаты',
      classes: FORM_CLASSES.INPUT,
    });

    this.searchRoomButton = new Button({
      label: 'Найти',
      classes: FORM_CLASSES.BUTTON,
      onClick: (): void => {
        console.log('Поиск комнаты:', this.roomInput.value);
      },
    });

    this.inputContainer = new ContainerComponent({
      classes: FORM_CLASSES.INPUT_CONTAINER,
      children: [
        this.roomLabel,
        new ContainerComponent({
          classes: FORM_CLASSES.INPUT_ROW,
          children: [this.roomInput, this.searchRoomButton],
        }),
      ],
    });

    this.render();
  }

  private render(): void {
    this.appendChildren([this.inputContainer]);
  }
}
