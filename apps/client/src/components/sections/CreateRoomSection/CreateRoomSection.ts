import { BaseComponent, HeadingComponent } from '@ComponentsAPI';
import { SectionHeading } from '@components';
import { SECTION_CLASSES } from '@constants/styles';
import { CreateRoomForm } from '@components/forms';

export default class CreateRoomSection extends BaseComponent {
  private heading: HeadingComponent;

  constructor() {
    super({ classes: SECTION_CLASSES.CREATE_ROOM_SECTION });

    this.heading = new SectionHeading({ title: 'Создать комнату' });

    this.render();
  }

  private render(): void {
    this.appendChildren([this.heading, new CreateRoomForm()]);
  }
}
