import { ContainerComponent } from '@/api/ComponentsAPI';
import RegistrationForm from './RegistrationForm.ts/RegistrationForm';
import RegistrationHeader from './RegistrationHeader/RegistrationHeader';

export default class RegistrationPage extends ContainerComponent {
  constructor() {
    super({
      tag: 'section',
      classes:
        'relative w-full min-h-screen px-5 sm:px-15 py-5 flex flex-col gap-10 justify-center items-center bg-[url(/src/assets/backgrounds/bg-vehicle-1.webp)] bg-center bg-cover bg-no-repeat',
    });

    this.render();
  }

  private render(): void {
    const header = new RegistrationHeader();
    const form = new RegistrationForm();
    this.appendChildren([header, form]);
  }
}
