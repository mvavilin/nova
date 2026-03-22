import { BaseComponent, TextComponent } from '@ComponentsAPI';
import { type LogMessage, LogMessageType } from '@repo/shared/src/types/logMessage';

type LogMessageProperties = Partial<LogMessage>;

export default class LogMessageComponent extends TextComponent {
  private messageComponent?: BaseComponent;
  private infoComponent?: BaseComponent;

  constructor({
    type = LogMessageType.SYSTEM,
    message = 'No message',
    info = null,
  }: LogMessageProperties) {
    super({ classes: LOG_MESSAGE_CLASSES[type] });

    if (message) {
      this.messageComponent = new BaseComponent({
        tag: 'span',
        content: message,
      });
      this.appendChildren([this.messageComponent]);
    }

    if (info) {
      this.infoComponent = new BaseComponent({
        tag: 'span',
        content: info,
        classes: 'font-bold',
      });
      this.appendChildren([this.infoComponent]);
    }
  }
}

const BASE_MESSAGE_CLASSES = 'p-2 rounded-lg leading-none text-black select-none break-words';

const LOG_MESSAGE_CLASSES: Record<LogMessageType, string> = {
  [LogMessageType.BLUE]: `${BASE_MESSAGE_CLASSES} text-left bg-blue-300 w-5/6 rounded-bl-none place-self-start`,
  [LogMessageType.RED]: `${BASE_MESSAGE_CLASSES} text-right bg-red-300 w-5/6 rounded-br-none place-self-end`,
  [LogMessageType.SYSTEM]: `${BASE_MESSAGE_CLASSES} text-center bg-green-300`,
};
