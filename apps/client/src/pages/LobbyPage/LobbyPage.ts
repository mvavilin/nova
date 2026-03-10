import { ContainerComponent } from '@api/ComponentsAPI';
import { Header } from '@components';
import { LOBBY_PAGE_BACKGROUND } from '@assets/backgrounds';
import {
  SoloSection,
  CreateRoomSection,
  JoinRoomSection,
  PublicRoomsSection,
} from '@components/sections';

const LOBBY_PAGE_CLASSES = `w-full h-full flex flex-col items-center justify-start gap-5 px-20 py-5 bg-cover bg-center font-text`;
const MAIN_CLASSES = `w-full h-full grid grid-cols-2 grid-rows-[auto_1fr] gap-5 text-white rounded`;

export default class LobbyPage extends ContainerComponent {
  private main: ContainerComponent;

  constructor() {
    super({ id: 'lobby-page', classes: LOBBY_PAGE_CLASSES });

    this.setStyle({ backgroundImage: `url(${LOBBY_PAGE_BACKGROUND})` });

    this.main = new ContainerComponent({ tag: 'main', classes: MAIN_CLASSES });

    this.render();
  }

  private render(): void {
    this.main.appendChildren([
      new SoloSection(),
      new JoinRoomSection(),
      new CreateRoomSection(),
      new PublicRoomsSection(),
    ]);

    this.appendChildren([new Header(), this.main]);
  }
}
