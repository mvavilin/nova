import { SESSION_STORAGE_KEYS } from '@constants/sessionStorageKeys';
import { BaseComponent } from '@ComponentsAPI';
import { LogMessageComponent } from '@pages/GamePage/components';
import { LogMessageKeys, LogMessageType, type LogMessage } from '@repo/shared/src/types/logMessage';
import { saveSessionStorageData, getSessionStorageData } from '@utils';

const LOG_OUTPUT_CLASSES =
  'bg-white rounded p-4 max-h-130 h-full overflow-y-auto flex flex-col gap-2 w-full';

class LogOutput extends BaseComponent {
  private logs: LogMessage[] = [];

  constructor() {
    super({ classes: LOG_OUTPUT_CLASSES });

    const savedLogs = getSessionStorageData<LogMessage[]>(SESSION_STORAGE_KEYS.GAME_LOGS);
    if (savedLogs?.length) {
      this.logs = savedLogs;

      for (const log of this.logs) this.appendChildren(new LogMessageComponent(log));

      this.scrollToBottom();
    }
  }

  public addMessage({
    type = LogMessageType.SYSTEM,
    key = LogMessageKeys.LOG_START_GAME,
    info = null,
  }: Partial<LogMessage>): void {
    const message: LogMessage = { type, key, info };
    this.logs.push(message);

    this.appendChildren(new LogMessageComponent(message));
    this.scrollToBottom();

    saveSessionStorageData(SESSION_STORAGE_KEYS.GAME_LOGS, this.logs);
  }

  private scrollToBottom(): void {
    if (this.element) {
      this.element.scrollTop = this.element.scrollHeight;
    }
  }
}

const logOutput = new LogOutput();

export default logOutput;
