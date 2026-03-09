import { ContainerComponent } from '@/api/ComponentsAPI';
import RegistrationForm from './RegistrationForm.ts/RegistrationForm';
import store from '@/store/store';
import type { State } from '@/store/types/state.types';
import type { Action } from '@/api/StateAPI';
import { FormActions } from '@/store/actions/form.actions';
import { WelcomeActions } from '@/store/actions/welcome.actions';

export default class RegistrationPage extends ContainerComponent {
  constructor() {
    super({
      tag: 'section',
      classes:
        'relative w-screen h-screen bg-[url("src/assets/bg-sky.png")] bg-center bg-cover bg-no-repeat',
    });

    this.addSubscriptions([
      store.subscribe((state, action) => this.showPage(state, action)),
      store.subscribe((state, action) => this.hidePage(state, action)),
    ]);

    this.render();
  }

  private render(): void {
    const form = new RegistrationForm();
    this.appendChildren([form]);
  }

  private hidePage(_state: State, action: Action): void {
    if (action.type === FormActions.GO_TO_LOBBY_PAGE) {
      this.hide(true, 500);
    }
  }

  private showPage(_state: State, action: Action): void {
    if (action.type === WelcomeActions.GO_TO_REGISTRATION_PAGE) {
      setTimeout(() => {
        this.show(true, 500);
      }, 500);
    }
  }
}
