import { ContainerComponent, TextComponent } from '@ComponentsAPI';
import Card from './Card';
import { TranslationKeys } from '@/i18n/translationKeys';
import { t } from '@/i18n';
import store from '@/store/store';
import type { State } from '@/store/types';
import type { Action } from '@/api/StateAPI';
import { AppActionTypes } from '@/store/actions';

const achievements = [
  { key: TranslationKeys.PROFILE_ACHIEVEMENT_STREAK, icon: '🧠' },
  { key: TranslationKeys.PROFILE_ACHIEVEMENT_ANSWERS, icon: '🎯' },
  { key: TranslationKeys.PROFILE_ACHIEVEMENT_FIRST_WIN, icon: '🏆' },
];

export default class AchievementsCard extends Card {
  private items: TextComponent[] = [];

  constructor() {
    super(TranslationKeys.PROFILE_ACHIEVEMENTS_TITLE);

    this.addSubscriptions([store.subscribe((state, action) => this.switchLanguage(state, action))]);

    this.renderAchievements();
  }

  private renderAchievements(): void {
    const nodes = achievements.map((a, i) => {
      const node = new TextComponent({
        content: `${a.icon} ${t(a.key)}`,
        classes: 'text-sm text-gray-300',
      });

      this.items[i] = node;

      return new ContainerComponent({
        children: [node],
      });
    });

    this.appendChildren(nodes);
  }

  private switchLanguage(_state: State, action: Action): void {
    if (action.type === AppActionTypes.SWITCH_LANGUAGE) {
      for (const [i, a] of achievements.entries()) {
        this.items[i]?.setContent(`${a.icon} ${t(a.key)}`);
      }
    }
  }
}
