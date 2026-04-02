import { ContainerComponent, ListComponent, TextComponent } from '@/api/ComponentsAPI';
import { t } from '@/i18n';
import { TranslationKeys } from '@/i18n/translationKeys';

export default class GameRules extends ContainerComponent {
  constructor() {
    super({
      classes: 'flex flex-col gap-6 max-w-3xl mx-auto p-8 rounded-lg text-[var(--color-light)]',
      // 'bg-white/25 backdrop-blur border border-white/20 text-white rounded p-4',
    });

    this.render();
  }

  private render(): void {
    this.appendChildren([
      this.createTitle(),
      this.preparation(),
      this.cardTypes(),
      this.turn(),
      this.agentActions(),
      this.answerCheck(),
      this.mistakes(),
      this.victory(),
    ]);
  }

  private createTitle(): TextComponent {
    return new TextComponent({
      tag: 'h2',
      content: t(TranslationKeys.GAME_RULES_TITLE),
      classes:
        'text-3xl text-center font-[var(--font-brand)] text-[var(--color-brand)] tracking-widest uppercase mt-6',
    });
  }

  private preparation(): ContainerComponent {
    return new ContainerComponent({
      children: [
        new TextComponent({
          tag: 'h3',
          content: `🎮 ${t(TranslationKeys.GAME_RULES_PREPARATION_TITLE)}`,
          classes: 'text-lg font-semibold text-[var(--color-brand)] uppercase tracking-wide',
        }),
        new TextComponent({
          tag: 'p',
          content: t(TranslationKeys.GAME_RULES_PREPARATION_P1),
          classes: 'font-[var(--font-text)] text-sm text-[var(--color-light)]/80',
        }),
        new TextComponent({
          tag: 'p',
          content: t(TranslationKeys.GAME_RULES_PREPARATION_P2),
          classes: 'font-[var(--font-text)] text-sm text-[var(--color-light)]/80',
        }),
        new TextComponent({
          tag: 'p',
          content: t(TranslationKeys.GAME_RULES_PREPARATION_P3),
          classes: 'font-[var(--font-text)] text-sm text-[var(--color-light)]/80',
        }),
      ],
      classes:
        'flex flex-col gap-3 p-4 border border-[var(--color-primary)] rounded-md bg-black/40',
    });
  }

  private cardTypes(): ContainerComponent {
    return new ContainerComponent({
      children: [
        new TextComponent({
          tag: 'h3',
          content: `🃏 ${t(TranslationKeys.GAME_RULES_CARD_TYPES_TITLE)}`,
          classes: 'text-lg font-semibold text-[var(--color-brand)] uppercase tracking-wide',
        }),
        new ListComponent({
          content: `${t(TranslationKeys.GAME_RULES_CARD_TYPES_RED)}
                    ${t(TranslationKeys.GAME_RULES_CARD_TYPES_BLUE)}
                    ${t(TranslationKeys.GAME_RULES_CARD_TYPES_CIVIL)}
                    ${t(TranslationKeys.GAME_RULES_CARD_TYPES_KILLER)}`,
          classes:
            'whitespace-pre-line font-[var(--font-text)] text-sm text-[var(--color-light)]/80',
        }),
        new TextComponent({
          tag: 'p',
          content: t(TranslationKeys.GAME_RULES_CARD_TYPES_DESC),
          classes: 'font-[var(--font-text)] text-xs text-[var(--color-light)]/60',
        }),
      ],
      classes:
        'flex flex-col gap-3 p-4 border border-[var(--color-primary)] rounded-md bg-black/40',
    });
  }

  private turn(): ContainerComponent {
    return new ContainerComponent({
      children: [
        new TextComponent({
          tag: 'h3',
          content: `🔎 ${t(TranslationKeys.GAME_RULES_TURN_TITLE)}`,
          classes: 'text-lg font-semibold text-[var(--color-brand)] uppercase tracking-wide',
        }),
        new TextComponent({
          tag: 'p',
          content: t(TranslationKeys.GAME_RULES_TURN_P1),
          classes: 'font-[var(--font-text)] text-sm text-[var(--color-light)]/80',
        }),
        new TextComponent({
          tag: 'p',
          content: t(TranslationKeys.GAME_RULES_TURN_P2),
          classes: 'font-[var(--font-text)] text-sm text-[var(--color-light)]/80',
        }),
      ],
      classes:
        'flex flex-col gap-3 p-4 border border-[var(--color-primary)] rounded-md bg-black/40',
    });
  }

  private agentActions(): ContainerComponent {
    return new ContainerComponent({
      children: [
        new TextComponent({
          tag: 'h3',
          content: `🧠 ${t(TranslationKeys.GAME_RULES_AGENT_TITLE)}`,
          classes: 'text-lg font-semibold text-[var(--color-brand)] uppercase tracking-wide',
        }),
        new TextComponent({
          tag: 'p',
          content: t(TranslationKeys.GAME_RULES_AGENT_P1),
          classes: 'font-[var(--font-text)] text-sm text-[var(--color-light)]/80',
        }),
        new TextComponent({
          tag: 'p',
          content: t(TranslationKeys.GAME_RULES_AGENT_P2),
          classes: 'font-[var(--font-text)] text-sm text-[var(--color-light)]/80',
        }),
        new TextComponent({
          tag: 'p',
          content: t(TranslationKeys.GAME_RULES_AGENT_P3),
          classes: 'font-[var(--font-text)] text-sm text-[var(--color-light)]/80',
        }),
      ],
      classes:
        'flex flex-col gap-3 p-4 border border-[var(--color-primary)] rounded-md bg-black/40',
    });
  }

  private answerCheck(): ContainerComponent {
    return new ContainerComponent({
      children: [
        new TextComponent({
          tag: 'h3',
          content: `⚖ ${t(TranslationKeys.GAME_RULES_CHECK_TITLE)}`,
          classes: 'text-lg font-semibold text-[var(--color-brand)] uppercase tracking-wide',
        }),
        new TextComponent({
          tag: 'p',
          content: t(TranslationKeys.GAME_RULES_CHECK_P1),
          classes: 'font-[var(--font-text)] text-sm text-[var(--color-light)]/80',
        }),
        new TextComponent({
          tag: 'p',
          content: t(TranslationKeys.GAME_RULES_CHECK_P2),
          classes: 'font-[var(--font-text)] text-sm text-[var(--color-light)]/80',
        }),
        new TextComponent({
          tag: 'p',
          content: t(TranslationKeys.GAME_RULES_CHECK_P3),
          classes: 'font-[var(--font-text)] text-sm text-[var(--color-light)]/80',
        }),
      ],
      classes:
        'flex flex-col gap-3 p-4 border border-[var(--color-primary)] rounded-md bg-black/40',
    });
  }

  private mistakes(): ContainerComponent {
    return new ContainerComponent({
      children: [
        new TextComponent({
          tag: 'h3',
          content: `💀 ${t(TranslationKeys.GAME_RULES_MISTAKES_TITLE)}`,
          classes: 'text-lg font-semibold text-red-500 uppercase',
        }),
        new TextComponent({
          tag: 'p',
          content: t(TranslationKeys.GAME_RULES_MISTAKES_P1),
          classes: 'font-[var(--font-text)] text-sm text-[var(--color-light)]/80',
        }),
        new TextComponent({
          tag: 'p',
          content: t(TranslationKeys.GAME_RULES_MISTAKES_P2),
          classes: 'font-[var(--font-text)] text-sm text-[var(--color-light)]/80',
        }),
      ],
      classes: 'flex flex-col gap-3 p-4 border border-red-500 rounded-md bg-red-950/20',
    });
  }

  private victory(): ContainerComponent {
    return new ContainerComponent({
      children: [
        new TextComponent({
          tag: 'h3',
          content: `🏆 ${t(TranslationKeys.GAME_RULES_VICTORY_TITLE)}`,
          classes: 'text-lg font-semibold text-[var(--color-accent)] uppercase',
        }),
        new TextComponent({
          tag: 'p',
          content: t(TranslationKeys.GAME_RULES_VICTORY_P1),
          classes: 'font-[var(--font-text)] text-sm text-[var(--color-light)]/80',
        }),
        new TextComponent({
          tag: 'p',
          content: t(TranslationKeys.GAME_RULES_VICTORY_P2),
          classes: 'font-[var(--font-text)] text-sm text-[var(--color-light)]/80',
        }),
      ],
      classes:
        'flex flex-col gap-3 p-4 border border-[var(--color-accent)] rounded-md bg-green-950/20',
    });
  }
}
