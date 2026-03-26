import { BaseComponent, HeadingComponent } from '@ComponentsAPI';
import { SECTION_CLASSES } from '@constants/styles';
import { SectionHeading } from '@components';
import { RoomsTable } from '@pages/LobbyPage/components';
import { SearchRoomForm } from '@pages/LobbyPage/components/forms';
import { t } from '@i18n';
import { TranslationKeys } from '@i18n/translationKeys';

export default class PublicRoomsSection extends BaseComponent {
  private heading: HeadingComponent;

  constructor() {
    super({ classes: SECTION_CLASSES.PUBLIC_ROOMS_SECTION });

    this.heading = new SectionHeading({ title: t(TranslationKeys.PUBLIC_ROOMS_SECTION_TITLE) });

    this.render();
  }

  private render(): void {
    const roomsTable = new RoomsTable();

    this.appendChildren([this.heading, new SearchRoomForm(roomsTable), roomsTable]);
  }
}
