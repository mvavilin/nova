import { BaseComponent, HeadingComponent } from '@ComponentsAPI';
import { SectionHeading } from '@components';
import { Button } from '@components/ui';
import { SECTION_CLASSES } from '@constants/styles';

export default class CreateRoomSection extends BaseComponent {
  private heading: HeadingComponent;

  private createRoomButton: Button;

  constructor() {
    super({ classes: `${SECTION_CLASSES}` });

    this.heading = new SectionHeading({ title: 'Создать комнату' });

    this.createRoomButton = new Button({
      label: 'Создать',
      onClick: (): void => console.log('Create Room'),
    });

    this.render();
  }

  private render(): void {
    this.appendChildren([this.heading, this.createRoomButton]);
  }
}
