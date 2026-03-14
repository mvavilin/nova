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
      onClick: () => console.log('join room', roomId),
    });
  }
}
