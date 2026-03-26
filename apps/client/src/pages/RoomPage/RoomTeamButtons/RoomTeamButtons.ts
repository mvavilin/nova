import { ButtonComponent, ContainerComponent } from '@/api/ComponentsAPI';
import type { TeamButtonProps } from './RoomTeamButtons.types';
import { TranslationKeys } from '@/i18n/translationKeys';
import { t } from '@/i18n';
import store from '@/store/store';
import { SocketActionTypes } from '@/store/actions';
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
  private teamName: Teams;

  constructor({ teamName }: TeamButtonProps) {
    super({ classes: styles.container });
    this.teamName = teamName;

    this.render(teamName);
    this.update();
  }

  private render(teamName: Teams): void {
    const buttonColor = teamName === 'red' ? styles.buttonRed : styles.buttonBlue;
    const buttonStyle = `${styles.button} ${buttonColor}`;
    const containerRoleButtons = new ContainerComponent({ classes: styles.containerRoleBtn });

    this.spyButton = new ButtonComponent({
      content: t(TranslationKeys.ROOM_SPYMASTER_BTN),
      classes: buttonStyle,
      listeners: {
        click: (): void => this.playAsSpymaster(),
      },
    });

    this.agentButton = new ButtonComponent({
      content: t(TranslationKeys.ROOM_AGENT_BTN),
      classes: buttonStyle,
      listeners: {
        click: (): void => this.playAsAgent(),
      },
    });
    containerRoleButtons.appendChildren([this.spyButton, this.agentButton]);

    this.leaveButton = new ButtonComponent({
      content: t(TranslationKeys.ROOM_LEAVE_TEAM_BTN),
      classes: buttonStyle,
      listeners: {
        click: (): void => this.leaveTeam(),
      },
    });

    this.appendChildren([containerRoleButtons, this.leaveButton]);
  }

  private playAsSpymaster(): void {
    const { id, username } = store.getState();
    if (!id || !username) return;

    const player: Player = {
      id: id,
      username: username,
      team: this.teamName,
      role: 'spymaster',
    };

    store.dispatch({
      type: SocketActionTypes.TEAM_CHANGE,
      payload: player,
    });
  }

  private playAsAgent(): void {
    const { id, username } = store.getState();
    if (!id || !username) return;

    const player: Player = {
      id: id,
      username: username,
      team: this.teamName,
      role: 'agent',
    };

    store.dispatch({
      type: SocketActionTypes.TEAM_CHANGE,
      payload: player,
    });
  }

  private leaveTeam(): void {
    const { id, username } = store.getState();
    if (!id || !username) return;

    const player: Player = {
      id: id,
      username: username,
      team: 'choosing',
      role: 'choosing',
    };
    store.dispatch({
      type: SocketActionTypes.TEAM_CHANGE,
      payload: player,
    });
  }

  public update(): void {
    if (!this.spyButton || !this.agentButton || !this.leaveButton) return;

    this.resetButtons();

    const { currentRoom: room, id: myId } = store.getState();
    if (!room || !myId) return;

    // 1. Получаем данные игрока и текущей команды (this.teamName)
    const allPlayers = [...room.redPlayers, ...room.bluePlayers, ...room.choosingPlayers];
    const me = allPlayers.find((p) => p.id === myId);
    if (!me) return;

    const currentTeamPlayers = this.teamName === 'red' ? room.redPlayers : room.bluePlayers;
    const isMyTeam = me.team === this.teamName;

    // 2. Рассчитываем состояния занятости/лимитов
    const isSpyOccupied = currentTeamPlayers.some((p) => p.role === 'spymaster');
    const agentCount = currentTeamPlayers.filter((p) => p.role === 'agent').length;
    const isAgentLimit = agentCount >= Math.floor(room.maxPlayers / 2) - 1;

    // 3. Блокировка кнопок выбора роли (если занято, достигнут лимит или я уже на этой роли)
    if (isSpyOccupied || (isMyTeam && me.role === 'spymaster')) {
      this.disable(this.spyButton);
    }

    if (isAgentLimit || (isMyTeam && me.role === 'agent')) {
      this.disable(this.agentButton);
    }

    // 4. Управление кнопкой Leave (активна только если я в этой команде и не в 'choosing')
    if (!isMyTeam || me.team === 'choosing') {
      this.disable(this.leaveButton);
    } else {
      this.enable(this.leaveButton);
    }
  }

  private disable(button: ButtonComponent): void {
    button.setAttributes({ disabled: 'disabled' });
    button.setClasses('disabled-state');
  }

  private enable(button: ButtonComponent): void {
    button.removeAttributes('disabled');
    button.removeClasses('disabled-state');
  }

  private resetButtons(): void {
    const allButtons = [this.spyButton, this.agentButton, this.leaveButton];
    for (const button of allButtons) {
      if (!button) return;
      button.removeAttributes('disabled');
      button.removeClasses('disabled-state');
    }
  }
  public switchLanguage(): void {
    if (!this.spyButton || !this.agentButton || !this.leaveButton) return;
    this.spyButton.setContent(t(TranslationKeys.ROOM_SPYMASTER_BTN));
    this.agentButton.setContent(t(TranslationKeys.ROOM_AGENT_BTN));
    this.leaveButton.setContent(t(TranslationKeys.ROOM_LEAVE_TEAM_BTN));
  }

  public destroyComponent(): void {
    this.destroyChildren();

    this.spyButton = null;
    this.agentButton = null;
    this.leaveButton = null;

    super.destroy();
  }
}
