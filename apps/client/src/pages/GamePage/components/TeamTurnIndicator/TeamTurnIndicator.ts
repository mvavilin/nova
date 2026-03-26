import { Team } from '@__mocks__';
import { TextComponent } from '@ComponentsAPI';
import { t } from '@i18n';
import { TranslationKeys } from '@i18n/translationKeys';

type TeamTurnIndicatorProperties = {
  team: Team;
};

const TEAM_TURN_INDICATOR = {
  CONTAINER: `px-2 py-1 rounded-lg font-bold text-lg uppercase text-white`,
};

export default class TeamTurnIndicator extends TextComponent {
  constructor({ team }: TeamTurnIndicatorProperties) {
    const content = team === Team.RED ? t(TranslationKeys.RED_TURN) : t(TranslationKeys.BLUE_TURN);
    super({
      content,
      classes: `${TEAM_TURN_INDICATOR.CONTAINER} ${team === Team.RED ? `bg-red-400` : `bg-red-400`}`,
    });
  }
}
