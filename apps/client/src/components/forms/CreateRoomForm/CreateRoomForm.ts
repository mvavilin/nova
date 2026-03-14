import { FormComponent } from '@api/ComponentsAPI';
import { FORM_CLASSES } from '@constants/styles';
import { PlayerCountField, RoomNameField } from '@components/fields';
import { CREATE_ROOM_FORM_CONFIG as CONFIG } from '@constants/forms';

export default class CreateRoomForm extends FormComponent {
  private playerCount: string = CONFIG.PLAYERS.DEFAULT;
  private roomName: string | null = null;

  constructor() {
    super({ classes: FORM_CLASSES.FORM });
    this.render();
  }

  private render(): void {
    this.appendChildren([
      new PlayerCountField((value) => (this.playerCount = value)),
      new RoomNameField(
        (value) => (this.roomName = value),
        () => {
          console.log(CONFIG.LOG.PLAYERS, this.playerCount);
          console.log(CONFIG.LOG.ROOM, this.roomName);
        }
      ),
    ]);
  }
}
