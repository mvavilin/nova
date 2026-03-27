import { LogMessageType, LogMessageKeys } from '@repo/shared/src/types/logMessage';
import { ContainerComponent, FormComponent } from '@ComponentsAPI';
import { Button, InputText } from '@components/ui';
import { logOutput } from '@pages/GamePage/components';
import ICONS from '@assets/icons';
import { FORM_CLASSES } from '@constants/styles';
import { CREATE_ROOM_FORM_CONFIG as CONFIG } from '@constants/forms';
import { t } from '@i18n';
import { TranslationKeys } from '@i18n/translationKeys';

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
    logOutput.addMessage({ key: LogMessageKeys.LOG_START_GAME });

    this.appendChildren([logOutput]);
  }

  private initControls(): void {
    this.input = new InputText({
      id: CONFIG.LOG_CHAT.INPUT_ID,
      name: CONFIG.LOG_CHAT.INPUT_NAME,
      placeholder: t(TranslationKeys.CHAT_INPUT_PLACEHOLDER),
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
      key: LogMessageKeys.LOG_HINT_RED,
      info: this.input?.value || null,
    });

    logOutput.addMessage({ key: LogMessageKeys.LOG_VOTE_STARTED });

    this.input?.setValue();
    this.input?.setDisabled(true);
    this.button?.setDisabled(true);

    // feat: add action to send prompt
  }
}
