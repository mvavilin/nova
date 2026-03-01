import { ButtonComponent } from '@/api/ComponentsAPI';
import type { RegButtonProperties } from './RegButton.types';
import store from '@/store/store';
import { WelcomePageActionType } from '@/store/actions/welcomePage';

export default class RegButton extends ButtonComponent {
  constructor({ ...rest }: RegButtonProperties = {}) {
    super({
      id: 'reg-button',
      classes:
        'px-6 py-2 rounded-lg bg-violet-100 text-black font-medium transition duration-200 ease-in-out hover:bg-purple-200 active:scale-95 cursor-pointer',
      ...rest,
    });

    this.render();
  }

  private render(): void {
    this.setContent('REGISTRATION');
    this.setListeners({
      click: (): void => {
        store.dispatch({
          type: WelcomePageActionType.GO_TO_REG_PAGE,
          payload: { empty: 'some payload' },
        });
      },
    });
  }
}
