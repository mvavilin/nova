import { BaseComponent, HeadingComponent } from '@ComponentsAPI';
import { SectionHeading } from '@components';
import { SECTION_CLASSES } from '@constants/styles';
import { SearchRoomForm } from '@components/forms';

export default class PublicRoomsSection extends BaseComponent {
  private heading: HeadingComponent;

  constructor() {
    super({ classes: SECTION_CLASSES.PUBLIC_ROOMS_SECTION });

    this.heading = new SectionHeading({ title: 'Публичные комнаты' });

    this.render();
  }

  private render(): void {
    this.appendChildren([this.heading, new SearchRoomForm()]);
  }
}
