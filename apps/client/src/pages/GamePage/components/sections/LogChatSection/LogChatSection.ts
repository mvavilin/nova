import { BaseComponent, HeadingComponent } from '@ComponentsAPI';
import { SectionHeading } from '@components';
import { SECTION_CLASSES } from '@constants/styles';
import { LogChatForm } from '@pages/GamePage/components/forms';
import { t } from '@i18n';
import { TranslationKeys } from '@i18n/translationKeys';

export default class LogChatSection extends BaseComponent {
  private heading: HeadingComponent;

  constructor() {
    super({ classes: SECTION_CLASSES.LOG_CHAT_SECTION });

    this.heading = new SectionHeading({ title: t(TranslationKeys.CHAT_LOG_TITLE) });

    this.render();
  }

  private render(): void {
    this.appendChildren([this.heading, new LogChatForm()]);
  }
}
