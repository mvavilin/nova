import { BaseComponent } from '@ComponentsAPI';
import { LogMessageComponent } from '@pages/GamePage/components';
import { LogMessageKeys, LogMessageType, type LogMessage } from '@repo/shared/src/types/logMessage';

const LOG_OUTPUT_CLASSES =
  'bg-white rounded p-4 max-h-130 h-full overflow-y-auto flex flex-col gap-2 w-full';

class LogOutput extends BaseComponent {
  constructor() {
    super({ classes: LOG_OUTPUT_CLASSES });

    // feat: load chat log history
  }

  public addMessage({
    type = LogMessageType.SYSTEM,
    key = LogMessageKeys.LOG_START_GAME,
    info = null,
  }: Partial<LogMessage>): void {
    this.appendChildren(new LogMessageComponent({ type, key, info }));
    this.scrollToBottom();

    // feat: add send message action
  }

  private scrollToBottom(): void {
    if (this.element) {
      this.element.scrollTop = this.element.scrollHeight;
    }
  }
}

const logOutput = new LogOutput();

export default logOutput;
