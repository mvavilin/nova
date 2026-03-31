import { ContainerComponent, TextComponent } from '@ComponentsAPI';
import Card from './Card';
import { TranslationKeys } from '@/i18n/translationKeys';
import { t } from '@/i18n';
import store from '@/store/store';
import type { State } from '@/store/types';
import type { Action } from '@/api/StateAPI';
import { AppActionTypes } from '@/store/actions';

const roles = {
  spymaster: {
    winrate: '55%',
  },
  operative: {
    correct: '124',
    accuracy: '72%',
  },
};

export default class RolesCard extends Card {
  private spymasterTitle: TextComponent | null = null;
  private spymasterWinrate: TextComponent | null = null;

  private operativeTitle: TextComponent | null = null;
  private operativeCorrect: TextComponent | null = null;
  private operativeAccuracy: TextComponent | null = null;

  constructor() {
    super(TranslationKeys.PROFILE_ROLES_TITLE);

    this.addSubscriptions([
      store.subscribe((state, action) => this.switchRolesLanguage(state, action)),
    ]);

    this.renderRoles();
  }

  private renderRoles(): void {
    const spymaster = this.role(
      (this.spymasterTitle = new TextComponent({
        content: `👑 ${t(TranslationKeys.PROFILE_ROLE_SPYMASTER)}`,
        classes: 'font-medium',
      })),
      [
        (this.spymasterWinrate = new TextComponent({
          content: `${t(TranslationKeys.PROFILE_ROLE_WINRATE)}: ${roles.spymaster.winrate}`,
          classes: 'text-sm text-gray-300',
        })),
      ]
    );

    const operative = this.role(
      (this.operativeTitle = new TextComponent({
        content: `🕵️ ${t(TranslationKeys.PROFILE_ROLE_AGENT)}`,
        classes: 'font-medium',
      })),
      [
        (this.operativeCorrect = new TextComponent({
          content: `${t(TranslationKeys.PROFILE_ROLE_CORRECT)}: ${roles.operative.correct}`,
          classes: 'text-sm text-gray-300',
        })),
        (this.operativeAccuracy = new TextComponent({
          content: `${t(TranslationKeys.PROFILE_ROLE_ACCURACY)}: ${roles.operative.accuracy}`,
          classes: 'text-sm text-gray-300',
        })),
      ]
    );

    this.appendChildren([spymaster, operative]);
  }

  private role(titleNode: TextComponent, statsNodes: TextComponent[]): ContainerComponent {
    return new ContainerComponent({
      classes: 'mb-3',
      children: [titleNode, ...statsNodes],
    });
  }

  private switchRolesLanguage(_state: State, action: Action): void {
    if (action.type === AppActionTypes.SWITCH_LANGUAGE) {
      this.spymasterTitle?.setContent(`👑 ${t(TranslationKeys.PROFILE_ROLE_SPYMASTER)}`);
      this.spymasterWinrate?.setContent(
        `${t(TranslationKeys.PROFILE_ROLE_WINRATE)}: ${roles.spymaster.winrate}`
      );

      this.operativeTitle?.setContent(`🕵️ ${t(TranslationKeys.PROFILE_ROLE_AGENT)}`);
      this.operativeCorrect?.setContent(
        `${t(TranslationKeys.PROFILE_ROLE_CORRECT)}: ${roles.operative.correct}`
      );
      this.operativeAccuracy?.setContent(
        `${t(TranslationKeys.PROFILE_ROLE_ACCURACY)}: ${roles.operative.accuracy}`
      );
    }
  }
}
