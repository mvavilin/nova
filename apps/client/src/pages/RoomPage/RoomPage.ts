import { ContainerComponent } from '@/api/ComponentsAPI';
import RoomHeader from './RoomHeader/RoomHeader';
import RoomInfoBlock from './RoomInfoBlock/RoomInfoBlock';
import RoomTeamSection from './RoomTeamSection/RoomTeamSection';
import RoomChoosingPlayers from './RoomChoosingPlayers/RoomChoosingPlayers';
import store from '@/store/store';
import type { RoomInfo } from '@shared/types/room';
import { socketClient } from '@/api/SocketClientAPI';
import { AppActionTypes, RoomPageActionTypes } from '@/store/actions';
import type { State } from '@/store/types/state';
import type { Action } from '@/api/StateAPI';

const START_GAME_TIMER = 15;
const styles = {
  pageContainer:
    'w-full min-h-screen px-5 sm:px-15 py-5 flex flex-col gap-10 items-center bg-[url(/src/assets/backgrounds/lobby-page-background.jpg)] bg-center bg-cover bg-no-repeat',
  main: 'w-full max-w-7xl flex-1 flex flex-col justify-start items-center gap-8',
  teamContainer:
    'w-full h-full flex flex-col min-[950px]:flex-row justify-center min-[950px]:justify-between items-center min-[950px]:items-start gap-8',
};

export default class RoomPage extends ContainerComponent {
  private static unsubscribe: (() => void) | null = null;

  private redTeamSection: RoomTeamSection | null = null;
  private blueTeamSection: RoomTeamSection | null = null;
  private choosingSection: RoomChoosingPlayers | null = null;
  private roomInfoBlock: RoomInfoBlock | null = null;

  constructor() {
    if (RoomPage.unsubscribe) {
      RoomPage.unsubscribe();
      RoomPage.unsubscribe = null;
    }

    super({
      tag: 'div',
      classes: styles.pageContainer,
    });

    RoomPage.unsubscribe = store.subscribe((state, action) => this.refreshFromStore(state, action));

    this.subscribeToSocket();

    this.render();
  }

  private refreshFromStore(_state: State, action: Action): void {
    if (action.type === RoomPageActionTypes.SET_ROOM_DATA) {
      const roomInfo = store.getState().currentRoom;
      if (!roomInfo) return;

      this.redTeamSection?.handleStateChange(roomInfo);
      this.blueTeamSection?.handleStateChange(roomInfo);
      this.choosingSection?.updatePlayersList(roomInfo.choosingPlayers);
      this.roomInfoBlock?.handlePlayerCounts(roomInfo);
    }

    if (action.type === AppActionTypes.SWITCH_LANGUAGE) {
      this.redTeamSection?.switchLanguage();
      this.blueTeamSection?.switchLanguage();
      this.choosingSection?.switchLanguage();
      this.roomInfoBlock?.switchLanguage();
    }
  }

  private handleRoomUpdate = (payload: { roomInfo: RoomInfo }): void => {
    store.dispatch({
      type: RoomPageActionTypes.SET_ROOM_DATA,
      payload: { roomInfo: payload.roomInfo },
    });
  };

  private subscribeToSocket(): void {
    socketClient.onRoomState(this.handleRoomUpdate);
    socketClient.onPlayerJoined(this.handleRoomUpdate);
    socketClient.onPlayerLeft(this.handleRoomUpdate);
    socketClient.onTeamChanged(this.handleRoomUpdate);
    socketClient.onGameStartTimer(this.boundShowTimer);
  }

  private unsubscribeFromSocket(): void {
    socketClient.offRoomState(this.handleRoomUpdate);
    socketClient.offPlayerJoined(this.handleRoomUpdate);
    socketClient.offPlayerLeft(this.handleRoomUpdate);
    socketClient.offTeamChanged(this.handleRoomUpdate);
    socketClient.offGameStartTimer(this.boundShowTimer);
  }

  private boundShowTimer = this.showTimer.bind(this);

  private showTimer(): void {
    if (!this.roomInfoBlock) return;
    this.roomInfoBlock.showTimer(START_GAME_TIMER);
  }

  // private hideTimer(): void {
  //  if (!this.roomInfoBlock) return;
  //   this.roomInfoBlock.hideTimer();
  // }

  private render(): void {
    const roomInfo = store.getState().currentRoom;
    if (!roomInfo) return;

    const main = new ContainerComponent({ tag: 'main', classes: styles.main });

    const teamContainer = new ContainerComponent({
      classes: styles.teamContainer,
    });

    this.redTeamSection = new RoomTeamSection({ teamName: 'red', players: roomInfo.redPlayers });

    this.blueTeamSection = new RoomTeamSection({
      teamName: 'blue',
      players: roomInfo.bluePlayers,
    });

    teamContainer.appendChildren([this.redTeamSection, this.blueTeamSection]);

    this.choosingSection = new RoomChoosingPlayers({ players: roomInfo.choosingPlayers });

    this.roomInfoBlock = new RoomInfoBlock({
      roomName: roomInfo.name,
      roomId: roomInfo.id,
      currentCount: roomInfo.playerCount,
      totalCount: roomInfo.maxPlayers,
    });

    main.appendChildren([this.roomInfoBlock, teamContainer, this.choosingSection]);

    this.appendChildren([new RoomHeader(), main]);
  }

  public override destroy(): this {
    if (RoomPage.unsubscribe) {
      RoomPage.unsubscribe();
      RoomPage.unsubscribe = null;
    }

    this.unsubscribeFromSocket();
    super.destroy();

    return this;
  }
}
