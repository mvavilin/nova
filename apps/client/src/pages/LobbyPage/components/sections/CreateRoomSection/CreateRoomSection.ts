import { t } from '@i18n';
import { TranslationKeys } from '@i18n/translationKeys';
import { BaseComponent, HeadingComponent } from '@ComponentsAPI';
import { SectionHeading } from '@components';
import { SECTION_CLASSES } from '@constants/styles';
import { CreateRoomForm } from '@pages/LobbyPage/components/forms';

export default class CreateRoomSection extends BaseComponent {
  private heading: HeadingComponent;

  constructor() {
    super({ classes: SECTION_CLASSES.CREATE_ROOM_SECTION });

    this.heading = new SectionHeading({ title: t(TranslationKeys.CREATE_ROOM_SECTION_TITLE) });

    this.render();
  }

  private render(): void {
    this.appendChildren([this.heading, new CreateRoomForm()]);
  }
}
