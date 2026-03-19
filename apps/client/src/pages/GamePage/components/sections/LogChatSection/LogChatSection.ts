import { BaseComponent, HeadingComponent } from '@ComponentsAPI';
import { SectionHeading } from '@components';
import { SECTION_CLASSES } from '@constants/styles';
import { LogChatForm } from '@pages/GamePage/components/forms';

export default class LogChatSection extends BaseComponent {
  private heading: HeadingComponent;

  constructor() {
    super({ classes: SECTION_CLASSES.LOG_CHAT_SECTION });

    this.heading = new SectionHeading({ title: 'Лог чат' });

    this.render();
  }

  private render(): void {
    this.appendChildren([this.heading, new LogChatForm()]);
  }
}
