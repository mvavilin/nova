import { TextComponent } from '@api/ComponentsAPI';

const WARNING_MESSAGE_CLASSES = 'absolute top-full left-0 warning-text text-xs text-brand';

export default class WarningMessage extends TextComponent {
  constructor(message: string) {
    super({ content: message, classes: WARNING_MESSAGE_CLASSES });
  }
}
