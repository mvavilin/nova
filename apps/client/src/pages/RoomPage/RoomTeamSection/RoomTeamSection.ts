import { ContainerComponent, HeadingComponent, ListComponent } from '@/api/ComponentsAPI';
import type { TeamSectionProps } from './RoomTeamSection.types';
import RoomItem from '../RoomItem/RoomItem';
import RoomTeamButtons from '../RoomTeamButtons/RoomTeamButtons';
import { TranslationKeys } from '@/i18n/translationKeys';
import { t } from '@/i18n';
import type { Player, RoomInfo, Teams } from '@shared/types/room';

const styles = {
  container:
    'min-[950px]:w-[45%] min-w-[280px] shrink-0 flex flex-col flex-wrap gap-8 justify-between items-center text-white text-lg p-5 rounded',
  containerRed: 'bg-gradient-to-br from-red-600/25 to-white/25',
  containerBlue: 'bg-gradient-to-br from-blue-600/25 to-white/25',
  titleRed: 'text-xl min-[450px]:text-2xl text-red-500 font-bold',
  titleBlue: 'text-xl min-[450px]:text-2xl text-blue-500 font-bold',
  list: 'w-full flex flex-col items-stretch',
};

export default class RoomTeamSection extends ContainerComponent {
  private teamName: Teams;
  private isRedTeam: boolean = false;
  private title: HeadingComponent | null = null;
  private listContainer: ListComponent | null = null;
  private buttons: RoomTeamButtons | null = null;
  private items: RoomItem[] = [];

  constructor({ teamName, players }: TeamSectionProps) {
    super({ tag: 'section' });

    this.isRedTeam = teamName === 'red';
    this.teamName = teamName;
    this.render(players);
  }

  private render(players: Player[]): void {
    const containerStyle = this.isRedTeam ? styles.containerRed : styles.containerBlue;
    this.setClasses(`${styles.container} ${containerStyle}`);

    const titleStyle = this.isRedTeam ? styles.titleRed : styles.titleBlue;

    this.title = new HeadingComponent({
      level: 3,
      classes: titleStyle,
      content: this.isRedTeam
        ? t(TranslationKeys.ROOM_RED_TITLE)
        : t(TranslationKeys.ROOM_BLUE_TITLE),
    });

    this.listContainer = new ListComponent({ type: 'ol', classes: styles.list });

    this.buttons = new RoomTeamButtons({ teamName: this.teamName });
    this.appendChildren([this.title, this.listContainer, this.buttons]);

    this.updatePlayersList(players);
  }

  private updatePlayersList(players: Player[]): void {
    if (!this.listContainer) return;
    this.items = [];
    this.listContainer.destroyChildren();

    const header = {
      number: '№',
      player: { username: t(TranslationKeys.ROOM_PLAYER), role: t(TranslationKeys.ROOM_ROLE) },
    };

    this.items.push(new RoomItem(header));

    for (const [index, player] of players.entries()) {
      const options = { number: `${index + 1}.`, player };
      const item = new RoomItem(options);
      this.items.push(item);
    }

    this.listContainer.appendChildren([...this.items]);
  }

  public handleStateChange(room: RoomInfo): void {
    const currentPlayers = this.teamName === 'red' ? room.redPlayers : room.bluePlayers;

    this.updatePlayersList(currentPlayers);
    this.buttons?.update();
  }

  public switchLanguage(): void {
    if (!this.title || !this.buttons) return;

    const text = this.isRedTeam
      ? t(TranslationKeys.ROOM_RED_TITLE)
      : t(TranslationKeys.ROOM_BLUE_TITLE);
    this.title.setContent(text);

    this.buttons.switchLanguage();

    for (const item of this.items) {
      item.switchLanguage();
    }
  }
}
