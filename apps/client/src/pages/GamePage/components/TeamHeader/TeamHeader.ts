import { Team, Role, type Player } from '@__mocks__';
import { Avatar } from '@components';
import {
  BaseComponent,
  ContainerComponent,
  HeadingComponent,
  type ContainerComponentProperties,
} from '@ComponentsAPI';

type TeamHeaderProperties = {
  title: string;
  team: Team;
  players: Player[];
} & ContainerComponentProperties;

const AVATAR_SIZE = { width: 35, height: 35 };

export const TEAM_HEADER_CLASSES = {
  CONTAINER: 'flex flex-col gap-2 w-max',
  HEADER: 'uppercase font-bold',
  HEADER_COLOR: {
    [Team.RED]: 'text-red-400 text-right',
    [Team.BLUE]: 'text-blue-400 text-left',
  },
  PLAYERS: 'p-2 rounded bg-white flex gap-2',
  DIVIDER: 'min-h-full w-px bg-slate-900',
  AVATAR_BORDER: {
    [Team.RED]: {
      [Role.SPYMASTER]: 'border-red-600',
      [Role.OPERATIVE]: 'border-red-400',
    },
    [Team.BLUE]: {
      [Role.SPYMASTER]: 'border-blue-600',
      [Role.OPERATIVE]: 'border-blue-400',
    },
  },
};

export default class TeamHeader extends ContainerComponent {
  private title: string;
  private team: Team;
  private players: Player[];

  constructor({ title, team, players, classes, ...properties }: TeamHeaderProperties) {
    super({ classes: `${TEAM_HEADER_CLASSES.CONTAINER} ${classes}`, ...properties });
    this.title = title;
    this.team = team;
    this.players = players;
    this.render();
  }

  private render(): void {
    const header = new HeadingComponent({
      level: 2,
      content: this.title,
      classes: `${TEAM_HEADER_CLASSES.HEADER} ${TEAM_HEADER_CLASSES.HEADER_COLOR[this.team]}`,
    });

    const operatives = this.players.filter((player) => player.role === Role.OPERATIVE);
    const spymaster = this.players.filter((player) => player.role === Role.SPYMASTER);
    const sortedPlayers =
      this.team === Team.BLUE ? [...operatives, ...spymaster] : [...spymaster, ...operatives];

    const players = new ContainerComponent({ classes: TEAM_HEADER_CLASSES.PLAYERS });

    for (const player of sortedPlayers) {
      // feat: pass avatar URL
      const avatar = new Avatar({
        ...AVATAR_SIZE,
        classes: TEAM_HEADER_CLASSES.AVATAR_BORDER[player.team][player.role],
      });

      if (this.team === Team.BLUE && player.role === Role.SPYMASTER) {
        players.appendChildren(new BaseComponent({ classes: TEAM_HEADER_CLASSES.DIVIDER }));
        players.appendChildren(avatar);
      } else if (this.team === Team.RED && player.role === Role.SPYMASTER) {
        players.appendChildren(avatar);
        players.appendChildren(new BaseComponent({ classes: TEAM_HEADER_CLASSES.DIVIDER }));
      } else {
        players.appendChildren(avatar);
      }
    }

    this.appendChildren([header, players]);
  }
}
