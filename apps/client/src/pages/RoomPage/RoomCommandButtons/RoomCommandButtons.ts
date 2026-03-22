import { ButtonComponent, ContainerComponent } from '@/api/ComponentsAPI';
import type { CommandButtonProps } from './RoomCommandButtons.types';
import { TranslationKeys } from '@/i18n/translationKeys';
import { t } from '@/i18n';
import type { State } from '@/store/types/state';
import type { Action } from '@/api/StateAPI';
import store from '@/store/store';
import { AppActionTypes } from '@/store/actions';

const styles = {
  container: 'flex flex-col items-center gap-5',
  containerRoleBtn: 'flex justify-center gap-5 flex-wrap',
  button:
    'w-44 h-9 shrink-0 whitespace-normal leading-tight text-base text-white text-center font-main font-bold rounded-md hover:cursor-pointer hover:bg-green-600/80 hover:transition-colors hover:duration-300',
  buttonRed: 'bg-red-500/80',
  buttonBlue: 'bg-blue-500/80',
};

export default class RoomCommandButtons extends ContainerComponent {
  private spyButton: ButtonComponent;
  private agentButton: ButtonComponent;
  private leaveButton: ButtonComponent;

  constructor({ commandName }: CommandButtonProps) {
    const buttonColor = commandName === 'red' ? styles.buttonRed : styles.buttonBlue;
    const buttonStyle = `${styles.button} ${buttonColor}`;
    super({ classes: styles.container });

    const containerRoleButtons = new ContainerComponent({ classes: styles.containerRoleBtn });

    this.spyButton = new ButtonComponent({
      content: t(TranslationKeys.ROOM_SPYMASTER_BTN),
      classes: buttonStyle,
    });
    this.agentButton = new ButtonComponent({
      content: t(TranslationKeys.ROOM_AGENT_BTN),
      classes: buttonStyle,
    });
    containerRoleButtons.appendChildren([this.spyButton, this.agentButton]);

    this.leaveButton = new ButtonComponent({
      content: t(TranslationKeys.ROOM_LEAVE_COMM_BTN),
      classes: buttonStyle,
    });

    this.appendChildren([containerRoleButtons, this.leaveButton]);

    this.addSubscriptions([store.subscribe((state, action) => this.switchLanguage(state, action))]);
  }

  private switchLanguage(_state: State, action: Action): void {
    if (action.type === AppActionTypes.SWITCH_LANGUAGE) {
      this.spyButton.setContent(t(TranslationKeys.ROOM_SPYMASTER_BTN));
      this.agentButton.setContent(t(TranslationKeys.ROOM_AGENT_BTN));
      this.leaveButton.setContent(t(TranslationKeys.ROOM_LEAVE_COMM_BTN));
    }
  }
}
