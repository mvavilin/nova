import { LogMessageType } from '@repo/shared/src/types/logMessage';
import { ContainerComponent, FormComponent } from '@ComponentsAPI';
import { Button, InputText } from '@components/ui';
import { logOutput } from '@pages/GamePage/components';
import ICONS from '@assets/icons';
import { FORM_CLASSES } from '@constants/styles';
import { LOG_MESSAGES } from '@constants/logMessage';
import { CREATE_ROOM_FORM_CONFIG as CONFIG } from '@constants/forms';

export default class LogChatForm extends FormComponent {
  private input?: InputText;
  private button?: Button;

  constructor() {
    super({
      classes: `${FORM_CLASSES.FORM} h-full gap-4`,
      listeners: {
        submit: (event: Event) => event.preventDefault(),
      },
    });

    this.render();
  }

  private render(): void {
    this.initOutput();

    // feat: add role verification
    this.initControls();
  }

  private initOutput(): void {
    logOutput.addMessage({ message: LOG_MESSAGES.START_GAME() });

    this.appendChildren([logOutput]);
  }

  private initControls(): void {
    this.input = new InputText({
      id: CONFIG.LOG_CHAT.INPUT_ID,
      name: CONFIG.LOG_CHAT.INPUT_NAME,
      placeholder: CONFIG.LOG_CHAT.PLACEHOLDER,
      listeners: {
        input: (): void => {
          this.input?.isEmpty();
        },
      },
    });

    this.button = new Button({
      iconUrl: ICONS.SEND,
      listeners: {
        click: (): void => this.handleSubmit(),
      },
    });

    this.appendChildren([
      new ContainerComponent({
        classes: FORM_CLASSES.INPUT_ROW,
        children: [this.input, this.button],
      }),
    ]);
  }

  private handleSubmit(): void {
    if (this.input?.isEmpty()) return;

    logOutput.addMessage({
      type: LogMessageType.RED,
      message: LOG_MESSAGES.HINT(LogMessageType.RED),
      info: this.input?.value || null,
    });

    logOutput.addMessage({
      message: LOG_MESSAGES.VOTE_STARTED(),
    });

    this.input?.setValue();
    this.input?.setDisabled(true);
    this.button?.setDisabled(true);

    // feat: add action to send prompt
  }
}
