import { ContainerComponent, FormComponent } from '@ComponentsAPI';
import store from '@store';
import { SocketActionTypes } from '@actions';
import { FORM_CLASSES } from '@constants/styles';
import { InputText, Button, FieldLabel } from '@components/ui';

export default class JoinRoomForm extends FormComponent {
  private roomLabel: FieldLabel;
  private inputContainer: ContainerComponent;
  private roomInput: InputText;
  private joinRoomButton: Button;

  constructor() {
    super({ classes: FORM_CLASSES.FORM });

    this.roomLabel = new FieldLabel({
      text: 'Введите ID комнаты',
      htmlFor: 'roomID',
      classes: 'w-full',
    });

    this.roomInput = new InputText({
      id: 'roomID',
      name: 'roomID',
      placeholder: 'ID комнаты',
      classes: FORM_CLASSES.INPUT,
      listeners: {
        input: (): void => {
          this.roomInput.isEmpty();
        },
      },
    });

    this.joinRoomButton = new Button({
      label: 'Присоединиться',
      classes: FORM_CLASSES.BUTTON,
      listeners: {
        click: (): void => this.handleJoinRoom(),
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

  private handleJoinRoom(): void {
    if (this.roomInput.isEmpty()) return;

    const roomId = this.roomInput.value?.trim();
    if (!roomId) return;

    store.dispatch({
      type: SocketActionTypes.SOCKET_JOIN_ROOM,
      payload: { roomId },
    });
  }
}
