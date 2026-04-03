import {
  ContainerComponent,
  ImageComponent,
  LinkComponent,
  ListComponent,
  TextComponent,
} from '@/api/ComponentsAPI';
import { t } from '@/i18n';
import { TranslationKeys } from '@/i18n/translationKeys';
type TranslationKey = (typeof TranslationKeys)[keyof typeof TranslationKeys];

export default class AboutUs extends ContainerComponent {
  constructor() {
    super({
      classes:
        'flex flex-col gap-6 max-w-3xl mx-auto p-8 rounded-lg bg-[var(--color-dark)] text-[var(--color-light)]',
    });

    this.render();
  }

  private render(): void {
    this.appendChildren([
      this.createTitle(),
      this.teamIntro(),
      this.teamHighlights(),

      this.createDeveloperCard({
        name: 'Mikhail Vavilin',
        username: 'mvavilin',
        titleKey: TranslationKeys.ABOUT_US_MIKHAIL_TITLE,
        listKey: TranslationKeys.ABOUT_US_MIKHAIL_LIST,
      }),

      this.createDeveloperCard({
        name: 'Sergey Elsukov',
        username: 'sergey-ado',
        titleKey: TranslationKeys.ABOUT_US_SERGEY_TITLE,
        listKey: TranslationKeys.ABOUT_US_SERGEY_LIST,
      }),

      this.createDeveloperCard({
        name: 'Elena Valiullina',
        username: 'Walle908',
        titleKey: TranslationKeys.ABOUT_US_ELENA_TITLE,
        listKey: TranslationKeys.ABOUT_US_ELENA_LIST,
      }),

      this.createDeveloperCard({
        name: 'Andrey Zharkikh',
        username: 'Peccopa',
        titleKey: TranslationKeys.ABOUT_US_ANDREY_TITLE,
        listKey: TranslationKeys.ABOUT_US_ANDREY_LIST,
      }),
    ]);
  }

  private createTitle(): TextComponent {
    return new TextComponent({
      tag: 'h2',
      content: t(TranslationKeys.ABOUT_US_TITLE),
      classes:
        'text-3xl text-center font-[var(--font-brand)] text-[var(--color-brand)] tracking-normal mt-6',
    });
  }

  private teamIntro(): ContainerComponent {
    return new ContainerComponent({
      children: [
        new TextComponent({
          tag: 'p',
          content: t(TranslationKeys.ABOUT_US_INTRO_P1),
          classes: 'font-[var(--font-text)] text-sm text-[var(--color-light)]/80',
        }),
        new TextComponent({
          tag: 'p',
          content: t(TranslationKeys.ABOUT_US_INTRO_P2),
          classes: 'font-[var(--font-text)] text-sm text-[var(--color-light)]/60',
        }),
      ],
      classes:
        'flex flex-col gap-3 p-4 border border-[var(--color-primary)] rounded-md bg-black/40',
    });
  }

  private teamHighlights(): ContainerComponent {
    return new ContainerComponent({
      children: [
        new TextComponent({
          tag: 'h3',
          content: `✨ ${t(TranslationKeys.ABOUT_US_HIGHLIGHTS_TITLE)}`,
          classes: 'text-lg font-semibold text-[var(--color-accent)] uppercase tracking-wide',
        }),
        new ListComponent({
          content: t(TranslationKeys.ABOUT_US_HIGHLIGHTS_LIST),
          classes:
            'whitespace-pre-line font-[var(--font-text)] text-sm text-[var(--color-light)]/80',
        }),
      ],
      classes:
        'flex flex-col gap-3 p-4 border border-[var(--color-accent)] rounded-md bg-green-950/20',
    });
  }

  private createDeveloperCard({
    name,
    username,
    titleKey,
    listKey,
  }: {
    name: string;
    username: string;
    titleKey: TranslationKey;
    listKey: TranslationKey;
  }): ContainerComponent {
    const avatarUrl = `https://github.com/${username}.png`;
    const profileUrl = `https://github.com/${username}`;

    return new ContainerComponent({
      children: [
        new ContainerComponent({
          children: [
            new ImageComponent({
              source: avatarUrl,
              alt: name,
              classes: 'w-10 h-10 rounded-full border border-[var(--color-primary)]',
            }),

            new LinkComponent({
              content: t(titleKey),
              href: profileUrl,
              target: '_blank',
              classes:
                'text-lg font-semibold text-[var(--color-brand)] uppercase tracking-wide hover:underline',
            }),
          ],
          classes: 'flex items-center gap-3',
        }),

        new ListComponent({
          content: t(listKey),
          classes:
            'whitespace-pre-line font-[var(--font-text)] text-sm text-[var(--color-light)]/80',
        }),
      ],
      classes:
        'flex flex-col gap-3 p-4 border border-[var(--color-primary)] rounded-md bg-black/40 hover:bg-black/60 transition',
    });
  }
}
