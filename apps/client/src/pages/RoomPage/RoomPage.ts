import { ContainerComponent } from '@/api/ComponentsAPI';
import RoomHeader from './RoomHeader/RoomHeader';

export default class RoomPage extends ContainerComponent {
  constructor() {
    super({
      tag: 'section',
      classes:
        'relative w-screen h-screen px-20 py-5 flex flex-col items-center bg-[url(/src/assets/backgrounds/lobby-page-background.jpg)] bg-center bg-cover bg-no-repeat',
    });

    this.render();
  }

  private render(): void {
    this.appendChildren([new RoomHeader()]);
  }
}
