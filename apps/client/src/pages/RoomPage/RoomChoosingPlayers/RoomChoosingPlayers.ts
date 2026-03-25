import { ListComponent, ContainerComponent, HeadingComponent } from '@/api/ComponentsAPI';
import RoomUser from '../RoomUser/RoomUser';
import type { RoomChoosingUsersProps } from './RoomChoosingPlayers.types';
import type { Player } from '@shared/types/room';
import { TranslationKeys } from '@/i18n/translationKeys';
import { t } from '@/i18n';
import type { State } from '@/store/types/state';
import type { Action } from '@/api/StateAPI';
import store from '@/store/store';
import { AppActionTypes, RoomPageActionTypes } from '@/store/actions';

const styles = {
  container:
    'w-[40%] min-w-[250px] flex flex-col items-center justify-center gap-5 p-4 bg-white/25 text-white text-lg rounded',
  title: 'text-2xl text-center font-bold',
  list: 'w-full grid grid-cols-[repeat(auto-fill,150px)] justify-center items-center gap-5',
};

export default class RoomChoosingPlayers extends ContainerComponent {
  private listContainer: ListComponent | null = null;
  private title: HeadingComponent | null = null;

  constructor({ players }: RoomChoosingUsersProps) {
    super({ classes: styles.container });

    this.render(players);

    this.addSubscriptions([store.subscribe((state, action) => this.switchLanguage(state, action))]);
    this.addSubscriptions([
      store.subscribe((state, action) => this.handleStateChange(state, action)),
    ]);
  }

  private render(players: Player[]): void {
    this.title = new HeadingComponent({
      level: 3,
      classes: styles.title,
      content: t(TranslationKeys.ROOM_PLAYERS_CHOOSING),
    });

    this.listContainer = new ListComponent({ type: 'ul', classes: styles.list });
    this.updatePlayersList(players);

    this.appendChildren([this.title, this.listContainer]);
  }

  private updatePlayersList(players: Player[]): void {
    if (!this.listContainer) return;
    this.listContainer.destroyChildren();
    const playersList = [];

    for (const player of players) {
      const item = new RoomUser({
        username: player.username,
        id: player.id,
      });
      playersList.push(item);
    }
    this.listContainer.appendChildren(playersList);
  }

  private handleStateChange(_state: State, action: Action): void {
    if (action.type === RoomPageActionTypes.SET_ROOM_DATA) {
      const room = store.getState().currentRoom;
      if (!room) return;
      const currentPlayers = room?.choosingPlayers;
      if (!currentPlayers) return;

      this.updatePlayersList(currentPlayers);
    }
  }

  private switchLanguage(_state: State, action: Action): void {
    if (action.type === AppActionTypes.SWITCH_LANGUAGE) {
      this.title?.setContent(t(TranslationKeys.ROOM_PLAYERS_CHOOSING));
    }
  }
}
