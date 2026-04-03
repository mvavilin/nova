import { TeamsEnum, type Teams } from '@repo/shared/src/types/room';
import { TextComponent } from '@ComponentsAPI';
import { t } from '@i18n';
import { TranslationKeys } from '@i18n/translationKeys';
import { socketClient } from '@SocketClientAPI';
// import { LogMessageType, LogMessageKeys } from '@repo/shared/src/types/logMessage';
// import { logOutput } from '@pages/GamePage/components';
import { SESSION_STORAGE_KEYS } from '@constants/sessionStorageKeys';
import { getSessionStorageData, saveSessionStorageData } from '@utils';

type TeamTurnIndicatorProperties = {
  team: TeamsEnum;
};

const TEAM_TURN_INDICATOR = {
  CONTAINER: `px-2 py-1 rounded-lg font-bold text-lg uppercase text-white`,
  COLORS: {
    [TeamsEnum.RED]: 'bg-red-400',
    [TeamsEnum.BLUE]: 'bg-blue-400',
    [TeamsEnum.CHOOSING]: 'bg-yellow-400',
  },
};

export default class TeamTurnIndicator extends TextComponent {
  private currentTeam: Teams;

  constructor({ team }: TeamTurnIndicatorProperties) {
    const content = TeamTurnIndicator.getContent(team);
    super({
      content,
      classes: `${TEAM_TURN_INDICATOR.CONTAINER} ${TEAM_TURN_INDICATOR.COLORS[team]}`,
    });

    this.currentTeam = getSessionStorageData<Teams>(SESSION_STORAGE_KEYS.GAME_TURN) || team;
    saveSessionStorageData(SESSION_STORAGE_KEYS.GAME_TURN, this.currentTeam);

    socketClient.onGameTurnChanged((payload: { team: Teams }) => {
      saveSessionStorageData(SESSION_STORAGE_KEYS.GAME_TURN, payload.team);

      // logOutput.addMessage({
      //   type: payload.team === 'red' ? LogMessageType.RED : LogMessageType.BLUE,
      //   key: payload.team === 'red' ? LogMessageKeys.LOG_HINT_RED : LogMessageKeys.LOG_HINT_BLUE,
      // });

      this.updateTurn(payload.team);
    });
  }

  private static getContent(team: Teams): string {
    switch (team) {
      case TeamsEnum.RED: {
        return t(TranslationKeys.RED_TURN);
      }
      case TeamsEnum.BLUE: {
        return t(TranslationKeys.BLUE_TURN);
      }
      default: {
        return t(TranslationKeys.CHOOSING_TURN);
      }
    }
  }

  private updateTurn(team: Teams): void {
    if (team === this.currentTeam) return;

    const oldColorClass = TEAM_TURN_INDICATOR.COLORS[this.currentTeam];
    this.removeClasses(oldColorClass);

    const newColorClass = TEAM_TURN_INDICATOR.COLORS[team];
    this.setClasses(newColorClass);

    this.setContent(TeamTurnIndicator.getContent(team));

    this.currentTeam = team;
  }
}
