import { BaseComponent, HeadingComponent } from '@ComponentsAPI';
import { SectionHeading } from '@components';
import { Button } from '@components/ui';
import { SECTION_CLASSES } from '@constants/styles';

export default class SoloSection extends BaseComponent {
  private heading: HeadingComponent;
  private playButton: Button;

  constructor() {
    super({ classes: SECTION_CLASSES.SOLO_SECTION });

    this.heading = new SectionHeading({ title: 'Тренировка с AI-капитаном' });

    this.playButton = new Button({
      label: 'Играть с AI',
      onClick: (): void => console.log('Play AI'),
    });

    this.render();
  }

  private render(): void {
    this.appendChildren([this.heading, this.playButton]);
  }
}
