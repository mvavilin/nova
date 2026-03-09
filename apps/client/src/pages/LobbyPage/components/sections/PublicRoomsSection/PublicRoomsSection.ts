import { BaseComponent, HeadingComponent } from '@ComponentsAPI';
import { SectionHeading } from '@components';
import { Button } from '@components/ui';
import { SECTION_CLASSES } from '@constants/styles';

export default class PublicRoomsSection extends BaseComponent {
  private heading: HeadingComponent;

  private findRoomButton: Button;

  constructor() {
    super({ classes: `${SECTION_CLASSES} col-span-2` });

    this.heading = new SectionHeading({ title: 'Публичные комнаты' });

    this.findRoomButton = new Button({
      label: 'Найти',
      onClick: (): void => console.log('Find Room'),
    });

    this.render();
  }

  private render(): void {
    this.appendChildren([this.heading, this.findRoomButton]);
  }
}
