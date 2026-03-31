import { FormComponent } from '@ComponentsAPI';
import store from '@store';
import { SocketActionTypes } from '@actions';
import { FORM_CLASSES } from '@constants/styles';
import { CREATE_ROOM_FORM_CONFIG as CONFIG } from '@constants/forms';
import { PlayerCountField, RoomNameField } from '@pages/LobbyPage/components/fields';

export default class CreateRoomForm extends FormComponent {
  private maxPlayers: string = CONFIG.PLAYERS.DEFAULT;
  private name: string = '';
  private playerCountField: PlayerCountField | null = null;
  private roomNameField: RoomNameField | null = null;

  constructor() {
    super({
      classes: FORM_CLASSES.FORM,
      listeners: { submit: (event: Event) => event.preventDefault() },
    });

    this.render();
  }

  private render(): void {
    this.playerCountField = new PlayerCountField((value) => (this.maxPlayers = value));
    this.roomNameField = new RoomNameField(
      (value) => (this.name = value),
      this.createRoom.bind(this)
    );

    this.appendChildren([this.playerCountField, this.roomNameField]);
  }

  private createRoom(): void {
    store.dispatch({
      type: SocketActionTypes.SOCKET_CREATE_ROOM,
      payload: { name: this.name, maxPlayers: Number(this.maxPlayers) },
    });
  }

  public switchLanguage(): void {
    if (!this.playerCountField || !this.roomNameField) return;
    this.playerCountField.switchLanguage();
    this.roomNameField.switchLanguage();
  }
}
