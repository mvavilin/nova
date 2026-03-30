import LanguageButton from '@/components/LanguageButton/LanguageButton';
import type { ProfileHeroProperties } from './ProfileHero.types';

import { ContainerComponent, HeadingComponent, TextComponent } from '@ComponentsAPI';
import store from '@/store/store';

export default class ProfileHero extends ContainerComponent {
  constructor({ ...rest }: ProfileHeroProperties = {}) {
    super({
      id: 'profile-hero',
      classes: `flex justify-between bg-white/25 text-white rounded p-4`,
      ...rest,
    });

    this.setChildren([this.createUser(), this.createStats()]);
  }

  private createUser(): ContainerComponent {
    return new ContainerComponent({
      id: 'profile-user',
      classes: 'flex items-center gap-4',
      children: [
        new ContainerComponent({
          classes: 'w-16 h-16 rounded-full bg-gray-300',
        }),
        new ContainerComponent({
          classes: 'flex flex-col self-start',
          children: [
            new HeadingComponent({
              level: 2,
              content: `${store.getState().username}`,
              classes: 'text-2xl font-bold',
            }),
            new ContainerComponent({
              classes: 'flex',
              children: [
                new TextComponent({
                  classes: 'text-sm font-main font-normal text-gray-300',
                  content: '🌐 Language:',
                }),
                new LanguageButton(),
                // new LangButton({
                //   classes:
                //     'font-main font-normal text-sm md:text-sm leading-[0.83] text-center text-[var(--color-light)] cursor-pointer transition-colors duration-200 hover:text-[var(--color-brand)] p-0 min-h-0 w-fit text-gray-300',
                // }),
              ],
            }),
            new TextComponent({
              content: '🟢 Online',
              classes: 'text-sm font-main font-normal text-gray-300',
            }),
          ],
        }),
      ],
    });
  }

  private createStats(): ContainerComponent {
    return new ContainerComponent({
      classes: 'flex flex-col mr-4',
      children: [
        this.stat('🏆 Level', '12'),
        this.stat('📊 Winrate', '68%'),
        this.stat('🎯 Correct', '124'),
      ],
    });
  }

  private stat(label: string, value: string): TextComponent {
    return new TextComponent({
      tag: 'span',
      content: `${label}: ${value}`,
    });
  }
}
