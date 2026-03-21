import store from '@store';
import { BaseComponent, ContainerComponent, HeadingComponent } from '@ComponentsAPI';
import { Logo, ExitButton } from '@components';
import RoomUser from '../RoomUser/RoomUser';

const styles = {
  header: 'w-full max-w-7xl grid grid-cols-3 items-center p-4 bg-white/25 text-white rounded',
  userMenu: 'flex items-center justify-end gap-4 justify-self-end',
  title: 'text-2xl text-center font-bold uppercase',
};

export default class RoomHeader extends ContainerComponent {
  private userMenu = new BaseComponent({ classes: styles.userMenu });

  constructor() {
    super({ tag: 'header', classes: styles.header });

    this.render();
  }

  private render(): void {
    const username = store.getState().username;
    const userId = store.getState().id;
    if (username && userId) {
      this.userMenu.appendChildren([new RoomUser({ username: username, userId: userId })]);
    }
    this.userMenu.appendChildren([new ExitButton()]);

    this.appendChildren([
      new Logo(),
      new HeadingComponent({ level: 1, content: 'Room', classes: styles.title }),
      this.userMenu,
    ]);
  }
}
