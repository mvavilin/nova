import { ContainerComponent } from '@/api/ComponentsAPI';
import LoginForm from './LoginForm/LoginForm';
import LoginHeader from './LoginHeader/LoginHeader';

export default class LoginPage extends ContainerComponent {
  constructor() {
    super({
      tag: 'section',
      classes:
        'relative w-full min-h-screen px-5 sm:px-15 py-5 flex flex-col gap-10 justify-center items-center bg-[url(/src/assets/backgrounds/bg-vehicle-1.webp)] bg-center bg-cover bg-no-repeat',
    });

    this.render();
  }

  private render(): void {
    const header = new LoginHeader();
    const form = new LoginForm();
    this.appendChildren([header, form]);
  }
}
