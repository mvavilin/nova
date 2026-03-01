import { ButtonComponent } from '@/api/ComponentsAPI';
import type { BackButtonProperties } from './BackButton.types';
import store from '@/store/store';
import { RegPageActionType } from '@/store/actions/regPage';

export default class BackButton extends ButtonComponent {
  constructor({ ...rest }: BackButtonProperties = {}) {
    super({
      id: 'back-button',
      classes:
        'px-6 py-2 rounded-lg bg-violet-100 text-black font-medium transition duration-200 ease-in-out hover:bg-purple-200 active:scale-95 cursor-pointer',
      ...rest,
    });

    this.render();
  }

  private render(): void {
    this.setContent('BACK');
    this.setListeners({
      click: (): void => {
        store.dispatch({
          type: RegPageActionType.GO_TO_WELCOME_PAGE,
          payload: { empty: 'some payload' },
        });
      },
    });
  }
}
