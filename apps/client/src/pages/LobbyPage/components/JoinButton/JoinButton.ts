import { SocketActionTypes } from '@actions';
import store from '@store';
import { Button } from '@components/ui';

const JOIN_BUTTON_CLASSES = 'text-xs bg-green-600 hover:bg-green-700 mx-auto';

interface JoinButtonProperties {
  roomId: string;
  isCustom?: boolean;
}

export default class JoinButton extends Button {
  constructor({ roomId, isCustom = false }: JoinButtonProperties) {
    super({
      classes: isCustom ? JOIN_BUTTON_CLASSES : '',
      label: 'Вступить',
      onClick: () => {
        store.dispatch({ type: SocketActionTypes.SOCKET_JOIN_ROOM, payload: { roomId } });
      },
    });
  }
}
