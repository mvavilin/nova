import { BaseComponent, HeadingComponent } from '@ComponentsAPI';
import { SectionHeading } from '@components';
import { SECTION_CLASSES } from '@constants/styles';
import { JoinRoomForm } from '@components/forms';

export default class JoinRoomSection extends BaseComponent {
  private heading: HeadingComponent;

  constructor() {
    super({ classes: SECTION_CLASSES.JOIN_ROOM_SECTION });

    this.heading = new SectionHeading({ title: 'Присоединиться к комнате' });

    this.render();
  }

  private render(): void {
    this.appendChildren([this.heading, new JoinRoomForm()]);
  }
}
