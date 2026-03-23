import { Team } from '@__mocks__';
import { TextComponent } from '@ComponentsAPI';

type TeamTurnIndicatorProperties = {
  team: Team;
};

const TEAM_TURN_INDICATOR = {
  CONTAINER: `px-2 py-1 rounded-lg font-bold text-lg uppercase text-white`,
};

export default class TeamTurnIndicator extends TextComponent {
  constructor({ team }: TeamTurnIndicatorProperties) {
    const content = team === Team.RED ? 'Ход красной команды' : 'Ход синей команды';
    super({
      content,
      classes: `${TEAM_TURN_INDICATOR.CONTAINER} ${team === Team.RED ? `bg-red-400` : `bg-red-400`}`,
    });
  }
}
