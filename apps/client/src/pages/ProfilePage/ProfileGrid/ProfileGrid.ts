import type { ProfileGridProperties } from './ProfileGrid.types';

import { ContainerComponent } from '@ComponentsAPI';
import StatsCard from '../cards/StatsCard';
import RolesCard from '../cards/RolesCard';
import MatchHistoryCard from '../cards/MatchHistoryCard';
import AchievementsCard from '../cards/AchievementsCard';
import LobbyButton from '@/pages/WelcomePage/LobbyButton/LobbyButton';
import LanguageButton from '@/components/LanguageButton/LanguageButton';

export default class ProfileGrid extends ContainerComponent {
  constructor({ ...rest }: ProfileGridProperties = {}) {
    super({
      tag: 'main',
      classes: 'grid grid-cols-1 md:grid-cols-2 gap-5',
      ...rest,
    });

    this.setChildren([this.createLeft(), this.createRight()]);
  }

  private createLeft(): ContainerComponent {
    return new ContainerComponent({
      tag: 'section',
      classes: 'flex flex-col gap-5',
      children: [new StatsCard(), new RolesCard()],
    });
  }

  private createRight(): ContainerComponent {
    return new ContainerComponent({
      tag: 'section',
      classes: 'flex flex-col gap-5',
      children: [
        new MatchHistoryCard(),
        new AchievementsCard(),
        new ContainerComponent({
          classes: 'flex gap-5',
          children: [
            new LobbyButton({
              classes:
                'font-text text-[var(--color-light)] px-2 py-1 rounded-lg bg-blue-600 font-medium transition duration-200 ease-in-out active:scale-99 cursor-pointer item-self-center text-xs md:text-base capitalize hover:bg-blue-700 w-full',
            }),
            new LanguageButton(),
          ],
        }),
      ],
    });
  }
}
