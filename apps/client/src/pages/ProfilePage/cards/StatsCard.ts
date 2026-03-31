import { ContainerComponent, TextComponent } from '@ComponentsAPI';
import Card from './Card';
import { TranslationKeys } from '@/i18n/translationKeys';
import { t } from '@/i18n';
import store from '@/store/store';
import type { State } from '@/store/types';
import type { Action } from '@/api/StateAPI';
import { AppActionTypes } from '@/store/actions';

const stats = {
  games: '42',
  wins: '28',
  losses: '14',
  winrate: '68',
};

export default class StatsCard extends Card {
  private games: ContainerComponent | null = null;
  private wins: ContainerComponent | null = null;
  private losses: ContainerComponent | null = null;
  private winrate: ContainerComponent | null = null;

  private gamesLabel: TextComponent | null = null;
  private winsLabel: TextComponent | null = null;
  private lossesLabel: TextComponent | null = null;
  private winrateLabel: TextComponent | null = null;

  constructor() {
    super(TranslationKeys.PROFILE_STATS_TITLE);

    this.addSubscriptions([
      store.subscribe((state, action) => this.switchStatsLanguage(state, action)),
    ]);

    this.renderStats();
  }

  private renderStats(): void {
    this.games = this.item(
      (this.gamesLabel = new TextComponent({ content: t(TranslationKeys.PROFILE_STATS_GAMES) })),
      stats.games
    );

    this.wins = this.item(
      (this.winsLabel = new TextComponent({ content: t(TranslationKeys.PROFILE_STATS_WINS) })),
      stats.wins
    );

    this.losses = this.item(
      (this.lossesLabel = new TextComponent({ content: t(TranslationKeys.PROFILE_STATS_LOSSES) })),
      stats.losses
    );

    this.winrate = this.item(
      (this.winrateLabel = new TextComponent({
        content: t(TranslationKeys.PROFILE_STATS_WINRATE),
      })),
      `${stats.winrate}%`
    );

    this.appendChildren([this.games, this.wins, this.losses, this.winrate]);
  }

  private item(labelNode: TextComponent, value: string): ContainerComponent {
    return new ContainerComponent({
      classes: 'flex justify-between text-sm text-gray-300',
      children: [labelNode, new TextComponent({ tag: 'span', content: value })],
    });
  }

  private switchStatsLanguage(_state: State, action: Action): void {
    if (action.type === AppActionTypes.SWITCH_LANGUAGE) {
      this.gamesLabel?.setContent(t(TranslationKeys.PROFILE_STATS_GAMES));
      this.winsLabel?.setContent(t(TranslationKeys.PROFILE_STATS_WINS));
      this.lossesLabel?.setContent(t(TranslationKeys.PROFILE_STATS_LOSSES));
      this.winrateLabel?.setContent(t(TranslationKeys.PROFILE_STATS_WINRATE));
    }
  }
}
