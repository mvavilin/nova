import { BaseComponent, TextComponent } from '@api/ComponentsAPI';
import { Avatar } from '@components';

const PROFILE_SECTION_CLASSES = `flex items-center gap-5 justify-end cursor-pointer`;
const USER_NAME_CLASSES = `text-xl font-bold`;

type ProfileSectionProperties = {
  name?: string;
};

const DEFAULT_PROFILE_NAME = 'Пользователь';

export default class ProfileSection extends BaseComponent {
  constructor({ name }: ProfileSectionProperties = {}) {
    super({
      tag: 'section',
      classes: PROFILE_SECTION_CLASSES,
    });

    this.render(name || DEFAULT_PROFILE_NAME);
  }

  private render(userName: string): void {
    this.appendChildren([
      new TextComponent({ content: userName, classes: USER_NAME_CLASSES }),
      new Avatar(),
    ]);
  }
}
