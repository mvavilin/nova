import type { ProfileHeroProperties } from './ProfileHero.types';

import { ContainerComponent, HeadingComponent, TextComponent } from '@ComponentsAPI';
import store from '@/store/store';
import { t } from '@/i18n';
import { TranslationKeys } from '@/i18n/translationKeys';
import type { State } from '@/store/types';
import type { Action } from '@/api/StateAPI';
import { AppActionTypes } from '@/store/actions';

const stats = {
  level: '12',
  winrate: '68',
  correct: '124',
};

export default class ProfileHero extends ContainerComponent {
  private userCard: ContainerComponent | null = null;
  private userAvatar: ContainerComponent | null = null;
  private userInfo: ContainerComponent | null = null;
  private userName: HeadingComponent | null = null;
  private userLanguage: TextComponent | null = null;
  private userOnline: TextComponent | null = null;

  private userStats: ContainerComponent | null = null;
  private userLevel: TextComponent | null = null;
  private userWinrate: TextComponent | null = null;
  private userCorrect: TextComponent | null = null;

  constructor({ ...rest }: ProfileHeroProperties = {}) {
    super({
      id: 'profile-hero',
      classes: `flex justify-between bg-white/25 text-white rounded p-4`,
      ...rest,
    });

    this.addSubscriptions([store.subscribe((state, action) => this.switchLanguage(state, action))]);

    this.render();
  }

  private render(): void {
    this.setChildren([this.createUserCard(), this.createStats()]);
  }

  private createUserCard(): ContainerComponent {
    this.userName = new HeadingComponent({
      level: 2,
      content: `${store.getState().username}`,
      classes: 'text-2xl font-bold',
    });

    this.userAvatar = new ContainerComponent({
      classes: 'w-16 h-16 rounded-full bg-gray-300',
    });

    this.userLanguage = new TextComponent({
      classes: 'text-sm font-main font-normal text-gray-300 capitalize',
      content: `${t(TranslationKeys.PROFILE_USER_LANGUAGE)}${store.getState().language.toLowerCase()}`,
    });

    this.userOnline = new TextComponent({
      content: t(TranslationKeys.PROFILE_USER_ONLINE),
      classes: 'text-sm font-main font-normal text-gray-300',
    });

    this.userInfo = new ContainerComponent({
      classes: 'flex flex-col self-start',
      children: [this.userName, this.userLanguage, this.userOnline],
    });

    this.userCard = new ContainerComponent({
      id: 'profile-user-card',
      classes: 'flex items-center gap-4',
      children: [this.userAvatar, this.userInfo],
    });

    return this.userCard;
  }

  private createStats(): ContainerComponent {
    this.userStats = new ContainerComponent({
      classes: 'flex flex-col mr-4',
      children: [
        (this.userLevel = this.stat(t(TranslationKeys.PROFILE_USER_LEVEL), stats.level)),
        (this.userWinrate = this.stat(
          t(TranslationKeys.PROFILE_USER_WINRATE),
          `${stats.winrate}%`
        )),
        (this.userCorrect = this.stat(t(TranslationKeys.PROFILE_USER_CORRECT), stats.correct)),
      ],
    });

    return this.userStats;
  }

  private stat(label: string, value: string): TextComponent {
    return new TextComponent({
      tag: 'span',
      content: `${label}: ${value}`,
    });
  }

  private switchLanguage(_state: State, action: Action): void {
    if (action.type === AppActionTypes.SWITCH_LANGUAGE) {
      this.userLanguage?.setContent(
        `${t(TranslationKeys.PROFILE_USER_LANGUAGE)}${store.getState().language.toLowerCase()}`
      );
      this.userOnline?.setContent(t(TranslationKeys.PROFILE_USER_ONLINE));
      this.userLevel?.setContent(`${t(TranslationKeys.PROFILE_USER_LEVEL)}: ${stats.level}`);
      this.userWinrate?.setContent(`${t(TranslationKeys.PROFILE_USER_WINRATE)}: ${stats.winrate}%`);
      this.userCorrect?.setContent(`${t(TranslationKeys.PROFILE_USER_CORRECT)}: ${stats.correct}`);
    }
  }
}
