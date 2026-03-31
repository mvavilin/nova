import { ContainerComponent, TextComponent } from '@ComponentsAPI';
import Card from './Card';
import { TranslationKeys } from '@/i18n/translationKeys';
import { t } from '@/i18n';
import store from '@/store/store';
import type { State } from '@/store/types';
import type { Action } from '@/api/StateAPI';
import { AppActionTypes } from '@/store/actions';

const matches = [
  { result: 'win', score: '+5', role: 'agent' },
  { result: 'lose', score: '+2', role: 'spymaster' },
  { result: 'win', score: '+6', role: 'agent' },
];

export default class MatchHistoryCard extends Card {
  private results: TextComponent[] = [];
  private roles: TextComponent[] = [];

  constructor() {
    super(TranslationKeys.PROFILE_MATCH_HISTORY_TITLE);

    this.addSubscriptions([store.subscribe((state, action) => this.switchLanguage(state, action))]);

    this.renderMatches();
  }

  private renderMatches(): void {
    const items = matches.map((m, i) => {
      const resultNode = new TextComponent({
        tag: 'span',
        classes: 'min-w-[88px]',
        content: this.getResultLabel(m.result),
      });

      const scoreNode = new TextComponent({
        tag: 'span',
        content: m.score,
      });

      const roleNode = new TextComponent({
        tag: 'span',
        classes: 'min-w-[64px]',
        content: this.getRoleLabel(m.role),
      });

      this.results[i] = resultNode;
      this.roles[i] = roleNode;

      return new ContainerComponent({
        classes: 'flex justify-between text-sm text-gray-300',
        children: [resultNode, scoreNode, roleNode],
      });
    });

    this.appendChildren(items);
  }

  private getResultLabel(result: string): string {
    return result === 'win'
      ? `🟢 ${t(TranslationKeys.PROFILE_MATCH_WIN)}`
      : `🔴 ${t(TranslationKeys.PROFILE_MATCH_LOSE)}`;
  }

  private getRoleLabel(role: string): string {
    return role === 'agent'
      ? t(TranslationKeys.PROFILE_ROLE_AGENT)
      : t(TranslationKeys.PROFILE_ROLE_SPYMASTER);
  }

  private switchLanguage(_state: State, action: Action): void {
    if (action.type === AppActionTypes.SWITCH_LANGUAGE) {
      for (const [i, m] of matches.entries()) {
        this.results[i]?.setContent(this.getResultLabel(m.result));
        this.roles[i]?.setContent(this.getRoleLabel(m.role));
      }
    }
  }
}
