import { ContainerComponent } from '@/api/ComponentsAPI';
import RegistrationForm from './RegistrationForm.ts/RegistrationForm';

import RegistrationLangButton from './RegistrationLangButton/RegistrationLangButton';

export default class RegistrationPage extends ContainerComponent {
  constructor() {
    super({
      tag: 'section',
      classes:
        'relative w-screen h-screen px-10 py-5 flex flex-col justify-center items-center bg-[url(/src/assets/backgrounds/bg-vehicle-1.webp)] bg-center bg-cover bg-no-repeat',
    });

    this.render();
  }

  private render(): void {
    const languageButton = new RegistrationLangButton();
    const form = new RegistrationForm();
    this.appendChildren([languageButton, form]);
  }
}
