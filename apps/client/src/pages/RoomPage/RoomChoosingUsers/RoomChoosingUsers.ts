import { BaseComponent, ContainerComponent, HeadingComponent } from '@/api/ComponentsAPI';
import RoomUser from '../RoomUser/RoomUser';
import type { RoomChoosingUsersProps } from './RoomChoosingUsers.types';

const styles = {
  container:
    'w-[40%] min-w-[250px] flex flex-col items-center justify-center gap-5 p-4 bg-white/25 text-white text-lg rounded',
  title: 'text-2xl text-center font-bold',
  list: 'w-full grid grid-cols-[repeat(auto-fill,150px)] justify-center items-center gap-5',
};
export default class RoomChoosingUsers extends ContainerComponent {
  private usersList: RoomUser[] = [];

  constructor({ players }: RoomChoosingUsersProps) {
    super({ classes: styles.container });

    const title = new HeadingComponent({
      level: 3,
      classes: styles.title,
      content: 'Users choosing command',
    });

    const list = new BaseComponent({ tag: 'ul', classes: styles.list });

    for (const player of players) {
      const item = new RoomUser({
        username: player.username,
        userId: player.userId,
      });
      this.usersList.push(item);
    }
    list.appendChildren(this.usersList);

    this.appendChildren([title, list]);
  }
}
