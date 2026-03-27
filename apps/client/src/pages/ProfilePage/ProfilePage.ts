import type { ProfilePageProperties } from './ProfilePage.types';
import { LOBBY_PAGE_BACKGROUND } from '@/assets/backgrounds';

import { ContainerComponent, HeadingComponent } from '@ComponentsAPI';
import ProfileGrid from './ProfileGrid/ProfileGrid';
import ProfileHero from './ProfileHero/ProfileHero';
import { Header } from '@/components';
import { UserMenu } from '../LobbyPage/components';
import { TITLE_CLASSES } from '@/constants/styles';

export default class ProfilePage extends ContainerComponent {
  constructor({ ...rest }: ProfilePageProperties = {}) {
    super({
      id: 'profile-page',
      classes: `flex flex-col gap-5 min-h-screen w-full py-[20px] px-[80px] bg-cover bg-center font-text`,
      ...rest,
    });

    this.setStyle({ backgroundImage: `url(${LOBBY_PAGE_BACKGROUND})` });

    this.render();
  }

  private render(): void {
    this.setChildren([this.createHeader(), new ProfileHero(), new ProfileGrid()]);
  }

  private createHeader(): Header {
    return new Header({
      id: 'profile-header',
      children: [
        new HeadingComponent({ level: 1, content: 'Profile', classes: TITLE_CLASSES }),
        new UserMenu(),
      ],
    });
  }
}
