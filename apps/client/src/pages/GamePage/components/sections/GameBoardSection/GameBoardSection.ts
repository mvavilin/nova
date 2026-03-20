import { blueTeam, redTeam } from '@__mocks__';

import { BaseComponent, ContainerComponent } from '@ComponentsAPI';
import { SECTION_CLASSES } from '@constants/styles';
import { TeamHeader } from '@pages/GamePage/components';

const HEADER_CLASSES = {
  CONTAINER: 'grid grid-cols-3 items-center w-full',
  LEFT: 'justify-self-start',
  CENTER: 'justify-self-center',
  RIGHT: 'justify-self-end',
};

const MAIN_CLASSES = `flex-1 flex items-center justify-center`;

export default class GameBoardSection extends BaseComponent {
  private header: ContainerComponent;
  private main: ContainerComponent;

  constructor() {
    super({ classes: SECTION_CLASSES.SECTION });

    this.header = new ContainerComponent({ classes: HEADER_CLASSES.CONTAINER });
    this.main = new ContainerComponent({ classes: MAIN_CLASSES });

    this.render();
  }

  private render(): void {
    const leftColumn = new TeamHeader({ ...blueTeam, classes: HEADER_CLASSES.LEFT });
    const centerColumn = new ContainerComponent({
      content: 'Счет',
      classes: HEADER_CLASSES.CENTER,
    });
    const rightColumn = new TeamHeader({ ...redTeam, classes: HEADER_CLASSES.RIGHT });

    this.header.appendChildren([leftColumn, centerColumn, rightColumn]);
    this.main.appendChildren([]);

    this.appendChildren([this.header, this.main]);
  }
}
