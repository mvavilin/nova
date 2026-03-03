import { ButtonComponent } from '@/api/ComponentsAPI';
import type { FetchButtonProperties } from './FetchButton.types';
import store from '@/store/store';
import { RegistrationActions } from '@/store/actions/registration.actions';

export default class FetchButton extends ButtonComponent {
  constructor({ ...rest }: FetchButtonProperties = {}) {
    super({
      id: 'fetch-button',
      classes:
        'px-6 py-2 rounded-lg bg-violet-100 text-black font-medium transition duration-200 ease-in-out hover:bg-purple-200 active:scale-95 cursor-pointer',
      ...rest,
    });

    this.render();
  }

  private render(): void {
    this.setContent('FETCH DATA');
    this.setListeners({
      click: (): void => this.fetchData(),
    });
  }

  private fetchData(): void {
    store.dispatch({
      type: RegistrationActions.FETCH_DATA,
    });
  }
}
