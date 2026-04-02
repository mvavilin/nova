// BaseModal.ts
import type { BaseComponent } from '@/api/ComponentsAPI';
import { LOBBY_PAGE_BACKGROUND } from '@/assets/backgrounds';
import { Modal, Button } from '@/components/ui';
import { t } from '@/i18n';
import { TranslationKeys } from '@/i18n/translationKeys';

export default class BaseModal extends Modal {
  constructor(children: BaseComponent[]) {
    super({
      children,
      isClosable: true,
    });

    this.setClasses(
      '!px-0 !py-0 rounded-lg !bg-[var(--color-dark)] border border-[var(--color-light)]'
    );

    this.setStyle({ backgroundImage: `url(${LOBBY_PAGE_BACKGROUND})` });
    this.setupCloseIcon();
    this.setupCloseButton();
  }

  private setupCloseIcon(): void {
    const close = this.children[1];
    if (close) {
      close.destroyChildren();
      close.setContent('📌');
    }
  }

  private setupCloseButton(): void {
    this.appendChildren(
      new Button({
        label: t(TranslationKeys.GAME_RULES_CLOSE_BTN),
        classes:
          'mb-6 mx-auto !bg-green-600 hover:!bg-green-700 !font-main !text-[var(--color-light)] !font-bold transition-colors duration-200 uppercase',
        onClick: (): Modal => this.hide(),
      })
    );
  }
}
