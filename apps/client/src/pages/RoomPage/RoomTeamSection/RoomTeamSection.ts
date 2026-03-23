import { ContainerComponent, HeadingComponent, ListComponent } from '@/api/ComponentsAPI';
import type { TeamSectionProps } from './RoomTeamSection.types';
import RoomItem from '../RoomItem/RoomItem';
import RoomTeamButtons from '../RoomTeamButtons/RoomTeamButtons';
import { TranslationKeys } from '@/i18n/translationKeys';
import { t } from '@/i18n';
import type { State } from '@/store/types/state';
import type { Action } from '@/api/StateAPI';
import store from '@/store/store';
import { AppActionTypes, RoomPageActionTypes } from '@/store/actions';
import type { Player, Teams } from '@shared/types/room';

const styles = {
  container:
    'w-[45%] min-[950px]:w-[40%] min-w-[350px] shrink-0 flex flex-col flex-wrap gap-8 justify-between items-center text-white text-lg p-5 rounded',
  containerRed: 'bg-gradient-to-br from-red-600/25 to-white/25',
  containerBlue: 'bg-gradient-to-br from-cyan-600/25 to-white/25',
  titleRed: 'text-2xl text-red-500 font-bold',
  titleBlue: 'text-2xl text-cyan-500 font-bold',
  list: 'w-full flex flex-col items-stretch',
};

export default class RoomTeamSection extends ContainerComponent {
  private teamName: Teams;
  private isRedTeam: boolean = false;
  private title: HeadingComponent | null = null;
  private listContainer: ListComponent | null = null;
  private buttons: RoomTeamButtons | null = null;

  constructor({ teamName, players }: TeamSectionProps) {
    super({ tag: 'section' });

    this.teamName = teamName;
    this.render({ teamName, players });

    this.addSubscriptions([store.subscribe((state, action) => this.switchLanguage(state, action))]);

    this.addSubscriptions([
      store.subscribe((state, action) => this.handleStateChange(state, action)),
    ]);
  }

  private render({ teamName, players }: TeamSectionProps): void {
    this.isRedTeam = teamName === 'red';

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

    this.buttons = new RoomTeamButtons({ teamName });
    this.appendChildren([this.title, this.listContainer, this.buttons]);

    this.updatePlayersList(players);
  }

  private switchLanguage(_state: State, action: Action): void {
    const text = this.isRedTeam
      ? t(TranslationKeys.ROOM_RED_TITLE)
      : t(TranslationKeys.ROOM_BLUE_TITLE);

    if (action.type === AppActionTypes.SWITCH_LANGUAGE) {
      this.title?.setContent(text);
    }
  }

  // private getCurrentRole(): Roles | undefined {
  //   const room = store.getState().currentRoom;
  //   const myId = store.getState().id;

  //   if (!room || !myId) return;
  //   if (!room) return;
  //   const allPlayers = [...room.redPlayers, ...room.bluePlayers, ...room.choosingPlayers];
  //   const me = allPlayers.find((player) => player.userId === myId);
  //   return me ? me.role : undefined;
  // }

  private handleStateChange(_state: State, action: Action): void {
    if (action.type === RoomPageActionTypes.SET_ROOM_DATA) {
      const room = store.getState().currentRoom;
      const myId = store.getState().id;

      if (!room || !myId) return;

      const currentPlayers = this.teamName === 'red' ? room.redPlayers : room.bluePlayers;
      this.updatePlayersList(currentPlayers);

      const allPlayers = [...room.redPlayers, ...room.bluePlayers, ...room.choosingPlayers];
      const me = allPlayers.find((player) => player.userId === myId);

      const myTeam = me ? me.team : null;
      this.buttons?.update(myTeam, this.teamName);
    }
  }

  private updatePlayersList(players: Player[]): void {
    if (!this.listContainer) return;
    this.listContainer.destroyChildren();
    const playersList = [];
    const header = {
      number: '№',
      player: { username: t(TranslationKeys.ROOM_PLAYER), role: t(TranslationKeys.ROOM_ROLE) },
    };

    for (const [index, player] of players.entries()) {
      const options = { number: `${index + 1}.`, player };
      const item = new RoomItem(options);
      playersList.push(item);
    }

    this.listContainer.appendChildren([new RoomItem(header), ...playersList]);
  }
}
