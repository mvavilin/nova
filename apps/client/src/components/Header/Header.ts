import { BaseComponent, HeadingComponent } from '@api/ComponentsAPI';
import { Logo, ProfileSection, ExitButton } from '@components';
import { TITLE_CLASSES } from '@constants/styles';

const USER_MENU_CLASSES = `flex items-center justify-end gap-5 justify-self-end`;
const HEADER_CLASSES = `w-full grid grid-cols-3 items-center p-5 bg-white/25 text-white rounded`;

export default class Header extends BaseComponent {
  private userMenu = new BaseComponent({ classes: USER_MENU_CLASSES });

  constructor() {
    super({ tag: 'header', classes: HEADER_CLASSES });

    this.render();
  }

  private render(): void {
    this.userMenu.appendChildren([new ProfileSection(), new ExitButton()]);

    this.appendChildren([
      new Logo(),
      new HeadingComponent({ level: 1, content: 'ЛОББИ', classes: TITLE_CLASSES }),
      this.userMenu,
    ]);
  }
}
