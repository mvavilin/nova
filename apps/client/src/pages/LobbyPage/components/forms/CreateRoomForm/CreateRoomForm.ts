import { FormComponent } from '@ComponentsAPI';
import store from '@store';
import { SocketActionTypes } from '@actions';

import { FORM_CLASSES } from '@constants/styles';
import { CREATE_ROOM_FORM_CONFIG as CONFIG } from '@constants/forms';
import { PlayerCountField, RoomNameField } from '@pages/LobbyPage/components/fields';

export default class CreateRoomForm extends FormComponent {
  private maxPlayers: string = CONFIG.PLAYERS.DEFAULT;
  private name: string = '';

  constructor() {
    super({
      classes: FORM_CLASSES.FORM,
      listeners: { submit: (event: Event) => event.preventDefault() },
    });

    this.render();
  }

  private render(): void {
    this.appendChildren([
      new PlayerCountField((value) => (this.maxPlayers = value)),
      new RoomNameField((value) => (this.name = value), this.createRoom.bind(this)),
    ]);
  }

  private createRoom(): void {
    store.dispatch({
      type: SocketActionTypes.SOCKET_CREATE_ROOM,
      payload: { name: this.name, maxPlayers: Number(this.maxPlayers) },
    });
  }
}
