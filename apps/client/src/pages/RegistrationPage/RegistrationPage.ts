import { ContainerComponent } from '@/api/ComponentsAPI';
import RegistrationForm from './RegistrationForm.ts/RegistrationForm';

export default class RegistrationPage extends ContainerComponent {
  constructor() {
    super({
      tag: 'section',
      classes:
        'relative w-screen h-screen bg-[url("src/assets/bg-1.png")] bg-center bg-cover bg-no-repeat',
    });

    this.render();
  }

  private render(): void {
    const form = new RegistrationForm();
    this.appendChildren([form]);
  }
}
