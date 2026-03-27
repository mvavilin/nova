import { BaseComponent, HeadingComponent } from '@ComponentsAPI';
import { SectionHeading } from '@components';
import { SECTION_CLASSES } from '@constants/styles';
import { JoinRoomForm } from '@pages/LobbyPage/components/forms';
import { t } from '@i18n';
import { TranslationKeys } from '@i18n/translationKeys';

export default class JoinRoomSection extends BaseComponent {
  private heading: HeadingComponent;

  constructor() {
    super({ classes: SECTION_CLASSES.JOIN_ROOM_SECTION });

    this.heading = new SectionHeading({ title: t(TranslationKeys.JOIN_ROOM_SECTION_TITLE) });

    this.render();
  }

  private render(): void {
    this.appendChildren([this.heading, new JoinRoomForm()]);
  }
}
