import { ContainerComponent, HeadingComponent } from '@api/ComponentsAPI';
import { Header } from '@components';
import { UserMenu } from '@pages/LobbyPage/components';

import { LOBBY_PAGE_BACKGROUND } from '@assets/backgrounds';
import {
  // SoloSection,
  CreateRoomSection,
  JoinRoomSection,
  PublicRoomsSection,
} from '@pages/LobbyPage/components/sections';
import { TITLE_CLASSES } from '@constants/styles';
import { t } from '@i18n';
import { TranslationKeys } from '@i18n/translationKeys';
import type { State } from '@/store/types/state';
import type { Action } from '@/api/StateAPI';
import store from '@/store/store';
import { AppActionTypes } from '@/store/actions';

// const LOBBY_PAGE_CLASSES = `w-full min-h-screen flex flex-col items-center justify-start gap-5 px-20 py-5 bg-cover bg-center font-text`;
// const MAIN_CLASSES = `w-full h-full grid grid-cols-2 grid-rows-2 gap-5 text-white rounded`;

const LOBBY_PAGE_CLASSES = `w-full min-h-screen flex flex-col items-center justify-start gap-5 px-5 sm:px-15 py-5 bg-cover bg-center font-text`;
const MAIN_CLASSES = `w-full max-w-7xl h-full grid grid-cols-1 lg:grid-cols-2 gap-5 text-white rounded`;

type LobbyChild = CreateRoomSection | JoinRoomSection | PublicRoomsSection;

export default class LobbyPage extends ContainerComponent {
  private main: ContainerComponent;
  private pageTitle: HeadingComponent;
  private unsubscribe: () => void;
  private childComponents: LobbyChild[] = [];

  constructor() {
    super({ id: 'lobby-page', classes: LOBBY_PAGE_CLASSES });

    this.setStyle({ backgroundImage: `url(${LOBBY_PAGE_BACKGROUND})` });

    this.main = new ContainerComponent({ tag: 'main', classes: MAIN_CLASSES });
    this.pageTitle = new HeadingComponent({
      level: 1,
      content: t(TranslationKeys.LOBBY_TITLE),
      classes: TITLE_CLASSES,
    });

    this.render();

    this.unsubscribe = store.subscribe((state, action) => this.switchLanguage(state, action));
  }

  private render(): void {
    // new SoloSection(),
    const createRoom = new CreateRoomSection();
    const joinRoom = new JoinRoomSection();
    const publicRooms = new PublicRoomsSection();
    this.childComponents.push(createRoom, joinRoom, publicRooms);
    this.main.appendChildren([createRoom, joinRoom, publicRooms]);

    this.appendChildren([
      new Header({
        children: [this.pageTitle, new UserMenu()],
      }),
      this.main,
    ]);
  }

  private switchLanguage(_state: State, action: Action): void {
    if (action.type === AppActionTypes.SWITCH_LANGUAGE) {
      this.pageTitle.setContent(t(TranslationKeys.LOBBY_TITLE));
    }
  }

  public override destroy(): this {
    this.unsubscribe();
    for (const child of this.childComponents) {
      child.destroy();
    }
    this.childComponents = [];
    super.destroy();
    return this;
  }
}
