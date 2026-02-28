import { BaseComponent } from '@/api/ComponentsAPI';
import RegistrationPage from '@/pages/RegistrationPage/RegistrationPage';

export default class App extends BaseComponent {
  constructor() {
    super({ tag: 'div' });
    this.render();
  }

  private render(): void {
    const registrationPage = new RegistrationPage();
    this.appendChildren(registrationPage);
  }
}
