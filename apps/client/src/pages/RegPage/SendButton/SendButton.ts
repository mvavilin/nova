import { ButtonComponent } from '@/api/ComponentsAPI';
import type { SendButtonProperties } from './SendButton.types';
import store from '@/store/store';
import { RegistrationActions } from '@/store/actions/registration.actions';

export default class SendButton extends ButtonComponent {
  constructor({ ...rest }: SendButtonProperties = {}) {
    super({
      id: 'send-button',
      classes:
        'px-6 py-2 rounded-lg bg-violet-100 text-black font-medium transition duration-200 ease-in-out hover:bg-purple-200 active:scale-95 cursor-pointer',
      ...rest,
    });

    this.render();
  }

  private render(): void {
    this.setContent('SEND DATA');
    this.setListeners({
      click: (): void => this.sendData(),
    });
  }

  private sendData(): void {
    const raw = localStorage.getItem('store');
    let count;

    if (raw) {
      const state = JSON.parse(raw);
      count = state.count;
    }

    const formData = { username: 'user', email: 'email@email.email', password: '******', count };

    store.dispatch({
      type: RegistrationActions.SEND_DATA,
      payload: formData,
    });
  }
}
