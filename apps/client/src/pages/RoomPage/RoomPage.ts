import { ContainerComponent } from '@/api/ComponentsAPI';
import RoomHeader from './RoomHeader/RoomHeader';
import RoomInfo from './RoomInfo/RoomInfo';
import RoomCommandSection from './RoomCommandSection/RoomCommandSection';

import RoomChoosingPlayers from './RoomChoosingPlayers/RoomChoosingPlayers';
import { red, blue, choosingUsers } from './roomMockData';

const styles = {
  pageContainer:
    'w-full min-h-screen px-20 py-10 flex flex-col gap-10 items-center bg-[url(/src/assets/backgrounds/lobby-page-background.jpg)] bg-center bg-cover bg-no-repeat',
  main: 'w-full max-w-7xl flex-1 flex flex-col justify-start items-center gap-10',
  commandContainer:
    'w-full h-full flex flex-col min-[950px]:flex-row justify-center min-[950px]:justify-between items-center min-[950px]:items-start gap-10',
};
export default class RoomPage extends ContainerComponent {
  constructor() {
    super({
      tag: 'div',
      classes: styles.pageContainer,
    });
    this.render();
  }

  private render(): void {
    const main = new ContainerComponent({ tag: 'main', classes: styles.main });

    const commandContainer = new ContainerComponent({
      classes: styles.commandContainer,
    });
    commandContainer.appendChildren([
      new RoomCommandSection({ commandName: 'red', players: red }),
      new RoomCommandSection({ commandName: 'blue', players: blue }),
    ]);

    main.appendChildren([
      new RoomInfo({ roomName: 'js-users-11', currentCount: 8, totalCount: 8 }),
      commandContainer,
      new RoomChoosingPlayers({ players: choosingUsers }),
    ]);

    this.appendChildren([new RoomHeader(), main]);
  }
}
