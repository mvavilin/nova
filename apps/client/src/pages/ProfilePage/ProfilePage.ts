import { ContainerComponent } from '@ComponentsAPI';

export default class ProfilePage extends ContainerComponent {
  constructor() {
    super({
      tag: 'div',
      classes: `min-h-screen p-6 bg-cover bg-center`,
    });
  }
}
