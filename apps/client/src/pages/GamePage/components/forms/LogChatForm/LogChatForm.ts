import { ContainerComponent, FormComponent } from '@ComponentsAPI';
import { Button, InputText } from '@components/ui';
import { logOutput } from '@pages/GamePage/components';
import ICONS from '@assets/icons';
import { FORM_CLASSES } from '@constants/styles';
import { CREATE_ROOM_FORM_CONFIG as CONFIG } from '@constants/forms';
import { t } from '@i18n';
import { TranslationKeys } from '@i18n/translationKeys';
import store from '@store';
import { GameActionTypes } from '@actions';
import { LogMessageKeys } from '@repo/shared/src/types/logMessage';
import { socketClient } from '@SocketClientAPI';
import { TeamsEnum } from '@repo/shared/src/types/room';

export default class LogChatForm extends FormComponent {
  private input?: InputText;
  private button?: Button;
  private gameState = store.getState().game;

  constructor() {
    super({
      classes: `${FORM_CLASSES.FORM} h-full gap-4`,
      listeners: {
        submit: (event: Event) => event.preventDefault(),
      },
    });

    this.render();

    socketClient.onGameTurnChanged((payload) => {
      if (payload.team === TeamsEnum.RED) this.setDisableControls(false);
      else if (payload.team === TeamsEnum.BLUE) this.setDisableControls(false);
    });

    socketClient.onGameClueTimeout(() => this.setDisableControls(true));
  }

  private setDisableControls(disabled: boolean): void {
    this.input?.setDisabled(disabled);
    this.button?.setDisabled(disabled);
  }

  private render(): void {
    this.initOutput();

    if (this.gameState && this.gameState.isSpymaster) this.initControls();

    this.setDisableControls(true);
  }

  private initOutput(): void {
    this.appendChildren([logOutput]);
  }

  public initControls(): void {
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
    if (this.gameState && this.gameState.gamePhase === 'clue') {
      const clue = this.input?.value;

      if (!clue) return;

      this.input?.setValue();
      this.setDisableControls(true);

      logOutput.addMessage({ key: LogMessageKeys.LOG_HINT_PHASE_ENDED });

      store.dispatch({ type: GameActionTypes.GAME_CLUE_GIVE, payload: { clue } });

      logOutput.addMessage({ key: LogMessageKeys.LOG_VOTE_STARTED });
    }
  }
}
