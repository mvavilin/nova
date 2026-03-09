import { BaseComponent, HeadingComponent } from '@ComponentsAPI';
import { SectionHeading } from '@components';
import { Button } from '@components/ui';
import { SECTION_CLASSES } from '@constants/styles';

export default class JoinRoomSection extends BaseComponent {
  private heading: HeadingComponent;

  private joinRoomButton: Button;

  constructor() {
    super({ classes: `${SECTION_CLASSES}` });

    this.heading = new SectionHeading({ title: 'Присоединиться к комнате' });

    this.joinRoomButton = new Button({
      label: 'Присоединиться',
      onClick: (): void => console.log('Join Room'),
    });

    this.render();
  }

  private render(): void {
    this.appendChildren([this.heading, this.joinRoomButton]);
  }
}
