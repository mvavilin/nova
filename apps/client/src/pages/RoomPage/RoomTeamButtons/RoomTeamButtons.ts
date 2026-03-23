import { ButtonComponent, ContainerComponent } from '@/api/ComponentsAPI';
import type { TeamButtonProps } from './RoomTeamButtons.types';
import { TranslationKeys } from '@/i18n/translationKeys';
import { t } from '@/i18n';
import type { State } from '@/store/types/state';
import type { Action } from '@/api/StateAPI';
import store from '@/store/store';
import { AppActionTypes, RoomPageActionTypes } from '@/store/actions';
import type { Player, Teams } from '@shared/types/room';

const styles = {
  container: 'flex flex-col items-center gap-5',
  containerRoleBtn: 'flex justify-center gap-5 flex-wrap',
  button:
    'w-44 h-9 shrink-0 whitespace-normal leading-tight text-base text-white text-center font-main font-bold rounded-md hover:cursor-pointer hover:bg-green-600/80 hover:transition-colors hover:duration-300',
  buttonRed: 'bg-red-500/80',
  buttonBlue: 'bg-blue-500/80',
};

export default class RoomTeamButtons extends ContainerComponent {
  private spyButton: ButtonComponent | null = null;
  private agentButton: ButtonComponent | null = null;
  private leaveButton: ButtonComponent | null = null;
  private userId = store.getState().id;
  private userName = store.getState().username;

  constructor({ teamName }: TeamButtonProps) {
    super({ classes: styles.container });

    this.render(teamName);
    this.addSubscriptions([store.subscribe((state, action) => this.switchLanguage(state, action))]);
  }

  private render(teamName: Teams): void {
    const buttonColor = teamName === 'red' ? styles.buttonRed : styles.buttonBlue;
    const buttonStyle = `${styles.button} ${buttonColor}`;
    const containerRoleButtons = new ContainerComponent({ classes: styles.containerRoleBtn });

    this.spyButton = new ButtonComponent({
      content: t(TranslationKeys.ROOM_SPYMASTER_BTN),
      classes: buttonStyle,
      listeners: {
        click: (): void => this.playAsSpymaster(teamName),
      },
    });
    this.agentButton = new ButtonComponent({
      content: t(TranslationKeys.ROOM_AGENT_BTN),
      classes: buttonStyle,
      listeners: {
        click: (): void => this.playAsAgent(teamName),
      },
    });
    containerRoleButtons.appendChildren([this.spyButton, this.agentButton]);

    this.leaveButton = new ButtonComponent({
      content: t(TranslationKeys.ROOM_LEAVE_TEAM_BTN),
      classes: buttonStyle,
      listeners: {
        click: (): void => this.leaveTeam(teamName),
      },
    });

    this.appendChildren([containerRoleButtons, this.leaveButton]);

    const room = store.getState().currentRoom;
    const myId = store.getState().id;

    if (!room || !myId) return;

    const allPlayers = [...room.redPlayers, ...room.bluePlayers, ...room.choosingPlayers];
    const me = allPlayers.find((player) => player.userId === myId);

    const myTeam = me ? me.team : null;
    this.update(myTeam, teamName);
  }

  private switchLanguage(_state: State, action: Action): void {
    if (!this.spyButton || !this.agentButton || !this.leaveButton) return;

    if (action.type === AppActionTypes.SWITCH_LANGUAGE) {
      this.spyButton.setContent(t(TranslationKeys.ROOM_SPYMASTER_BTN));
      this.agentButton.setContent(t(TranslationKeys.ROOM_AGENT_BTN));
      this.leaveButton.setContent(t(TranslationKeys.ROOM_LEAVE_TEAM_BTN));
    }
  }

  private playAsSpymaster(teamName: Teams): void {
    if (!this.userId || !this.userName) return;

    const player: Player = {
      userId: this.userId,
      username: this.userName,
      team: teamName,
      role: 'spymaster',
    };

    store.dispatch({
      type: RoomPageActionTypes.TEAM_CHANGE,
      payload: player,
    });
  }

  private playAsAgent(teamName: Teams): void {
    if (!this.userId || !this.userName) return;

    const player: Player = {
      userId: this.userId,
      username: this.userName,
      team: teamName,
      role: 'agent',
    };

    store.dispatch({
      type: RoomPageActionTypes.TEAM_CHANGE,
      payload: player,
    });
  }

  private leaveTeam(teamName: Teams): void {
    if (!this.userId || !this.userName) return;

    const player: Player = {
      userId: this.userId,
      username: this.userName,
      team: teamName,
      role: 'choosing',
    };

    store.dispatch({
      type: RoomPageActionTypes.TEAM_CHANGE,
      payload: player,
    });
  }

  public update(myTeam: Teams | null, sectionTeam: string): void {
    if (!this.spyButton || !this.agentButton || !this.leaveButton) return;

    const hasTeam = myTeam !== null && myTeam !== 'choosing';
    const isMyTeam = hasTeam && myTeam === sectionTeam;

    // Блокируем, если я УЖЕ в какой-то команде
    this.toggleButton(this.spyButton, hasTeam);
    this.toggleButton(this.agentButton, hasTeam);

    // leave оказываем и активируем только если я в ЭТОЙ команде
    if (isMyTeam) {
      this.toggleButton(this.leaveButton, false);
    } else {
      // Скрываем, если я в другой команде или еще не выбрал
      this.toggleButton(this.leaveButton, true);
    }
  }

  private toggleButton(button: ButtonComponent, isDisabled: boolean): void {
    if (isDisabled) {
      button.setAttributes({ disabled: 'disabled' });
      button.setClasses('disabled-state');
    } else {
      button.removeAttributes('disabled');
      button.removeClasses('disabled-state');
    }
  }
}
