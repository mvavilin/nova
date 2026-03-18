import store from '@store';
import { BaseComponent, HeadingComponent } from '@ComponentsAPI';
import { Logo, ProfileSection, ExitButton, Avatar } from '@components';

const USER_MENU_CLASSES = `flex items-center justify-end gap-4 justify-self-end`;
const HEADER_CLASSES = `w-full grid grid-cols-3 items-center p-4 bg-white/25 text-white rounded`;
const TITLE_CLASSES = `text-2xl text-center font-bold uppercase`;

export default class RoomHeader extends BaseComponent {
  private userMenu = new BaseComponent({ classes: USER_MENU_CLASSES });

  constructor() {
    super({ tag: 'header', classes: HEADER_CLASSES });

    this.render();
  }

  private render(): void {
    this.userMenu.appendChildren([
      new Avatar({ seed: store.getState().id }),
      new ProfileSection({ name: store.getState().username }),
      new ExitButton(),
    ]);

    this.appendChildren([
      new Logo(),
      new HeadingComponent({ level: 1, content: 'Room', classes: TITLE_CLASSES }),
      this.userMenu,
    ]);
  }
}
