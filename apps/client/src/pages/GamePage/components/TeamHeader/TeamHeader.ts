import { type Player, TeamsEnum, RolesEnum } from '@repo/shared/src/types/room';
import { Avatar } from '@components';
import {
  BaseComponent,
  ContainerComponent,
  HeadingComponent,
  type ContainerComponentProperties,
} from '@ComponentsAPI';
import { t } from '@i18n';
import { TranslationKeys } from '@i18n/translationKeys';
import { type Teams } from '@shared/types/room';

type TeamHeaderProperties = {
  team: Teams;
  players: Player[];
} & ContainerComponentProperties;

const AVATAR_SIZE = { width: 35, height: 35 };
const AVATAR_BORDER_BASE_CLASSES =
  'rounded-full w-10 h-10 object-cover shrink-0 hover:cursor-pointer';

export const TEAM_HEADER_CLASSES = {
  CONTAINER: 'flex flex-col gap-2 w-max',
  HEADER: 'uppercase font-bold',
  HEADER_COLOR: {
    [TeamsEnum.RED]: 'text-red-400 text-right',
    [TeamsEnum.BLUE]: 'text-blue-400 text-left',
    [TeamsEnum.CHOOSING]: '',
  },
  PLAYERS: 'p-2 rounded bg-white flex gap-2 w-fit',
  DIVIDER: 'min-h-full w-px bg-slate-900',
  AVATAR_BORDER: {
    [TeamsEnum.RED]: {
      [RolesEnum.SPYMASTER]: `${AVATAR_BORDER_BASE_CLASSES} border-2 border-red-600`,
      [RolesEnum.AGENT]: `${AVATAR_BORDER_BASE_CLASSES} border-2 border-red-400`,
      [RolesEnum.CHOOSING]: '',
    },
    [TeamsEnum.BLUE]: {
      [RolesEnum.SPYMASTER]: `${AVATAR_BORDER_BASE_CLASSES} border-2 border-blue-600`,
      [RolesEnum.AGENT]: `${AVATAR_BORDER_BASE_CLASSES} border-2 border-blue-400`,
      [RolesEnum.CHOOSING]: '',
    },
    [TeamsEnum.CHOOSING]: {
      [RolesEnum.SPYMASTER]: '',
      [RolesEnum.AGENT]: '',
      [RolesEnum.CHOOSING]: '',
    },
  },
};

export default class TeamHeader extends ContainerComponent {
  private team: Teams;
  private players: Player[];

  constructor({ team, players, classes, ...properties }: TeamHeaderProperties) {
    super({ classes: `${TEAM_HEADER_CLASSES.CONTAINER} ${classes}`, ...properties });
    this.team = team;
    this.players = players;
    this.render();
  }

  private render(): void {
    const header = new HeadingComponent({
      level: 2,
      content:
        this.team === TeamsEnum.BLUE ? t(TranslationKeys.BLUE_TEAM) : t(TranslationKeys.RED_TEAM),
      classes:
        `${TEAM_HEADER_CLASSES.HEADER} ${TEAM_HEADER_CLASSES.HEADER_COLOR[this.team]}`.trim(),
    });

    const operatives = this.players.filter((player) => player.role === RolesEnum.AGENT);
    const spymaster = this.players.filter((player) => player.role === RolesEnum.SPYMASTER);
    const sortedPlayers =
      this.team === TeamsEnum.BLUE ? [...operatives, ...spymaster] : [...spymaster, ...operatives];

    const players = new ContainerComponent({ classes: TEAM_HEADER_CLASSES.PLAYERS });

    for (const player of sortedPlayers) {
      const avatar = new Avatar({
        ...AVATAR_SIZE,
        classes: `${TEAM_HEADER_CLASSES.AVATAR_BORDER[player.team][player.role]}`.trim(),
        seed: player.id,
      });

      avatar.setAttributes({
        title: `${player.role.charAt(0).toUpperCase() + player.role.slice(1)}: ${player.username}`,
      });

      if (this.team === TeamsEnum.BLUE && player.role === RolesEnum.SPYMASTER) {
        players.appendChildren(new BaseComponent({ classes: TEAM_HEADER_CLASSES.DIVIDER }));
        players.appendChildren(avatar);
      } else if (this.team === TeamsEnum.RED && player.role === RolesEnum.SPYMASTER) {
        players.appendChildren(avatar);
        players.appendChildren(new BaseComponent({ classes: TEAM_HEADER_CLASSES.DIVIDER }));
      } else {
        players.appendChildren(avatar);
      }
    }

    this.appendChildren([header, players]);
  }
}
