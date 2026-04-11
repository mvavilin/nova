import { ContainerComponent, TextComponent } from '@/api/ComponentsAPI';
import type { RoomUserProps } from './RoomUser.types';
import { Avatar } from '@/components';

const styles = {
  container: 'w-full flex items-center justify-start gap-4',
  userName: 'truncate',
};

export default class RoomUser extends ContainerComponent {
  constructor({ username, id }: RoomUserProps) {
    super({ classes: styles.container });

    if (id) {
      const avatar = new Avatar({ seed: id });
      this.appendChildren([avatar]);
    }

    const name = new TextComponent({
      tag: 'span',
      classes: styles.userName,
      content: username,
    });

    this.appendChildren([name]);
  }
}
