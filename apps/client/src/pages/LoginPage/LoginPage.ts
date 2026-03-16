import { ContainerComponent } from '@/api/ComponentsAPI';
import LoginForm from './LoginForm/LoginForm';
import LoginLangButton from './LoginLangButton/LoginLangButton';

export default class LoginPage extends ContainerComponent {
  constructor() {
    super({
      tag: 'section',
      classes:
        'relative w-screen h-screen px-10 py-5 flex flex-col justify-beetween items-center bg-[url(/src/assets/backgrounds/bg-vehicle-1.webp)] bg-center bg-cover bg-no-repeat',
    });

    this.render();
  }

  private render(): void {
    const languageButton = new LoginLangButton();
    const form = new LoginForm();
    this.appendChildren([languageButton, form]);
  }
}
