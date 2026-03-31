import { SocketActionTypes } from '@actions';
import store from '@store';
import { Button } from '@components/ui';
import { t } from '@i18n';
import { TranslationKeys } from '@i18n/translationKeys';

const JOIN_BUTTON_CLASSES = 'min-w-[78px] text-xs bg-green-600 hover:bg-green-700 mx-auto';

interface JoinButtonProperties {
  roomId: string;
  isCustom?: boolean;
}

export default class JoinButton extends Button {
  constructor({ roomId, isCustom = false }: JoinButtonProperties) {
    super({
      classes: isCustom ? JOIN_BUTTON_CLASSES : '',
      label: t(TranslationKeys.ROOM_ROW_JOIN_BUTTON),
      onClick: () => {
        store.dispatch({ type: SocketActionTypes.SOCKET_JOIN_ROOM, payload: { roomId } });
      },
    });
  }

  public switchLanguage(): void {
    this.setLabel(t(TranslationKeys.ROOM_ROW_JOIN_BUTTON));
  }
}
