import { ButtonComponent } from '@/api/ComponentsAPI';
import type { RegButtonProperties } from './RegButton.types';
import store from '@/store/store';
import { WelcomePageActionType } from '@/store/actions/welcomePage';

export default class RegButton extends ButtonComponent {
  constructor({ ...rest }: RegButtonProperties = {}) {
    super({
      id: 'reg-button',
      classes: 'reg-button',
      ...rest,
    });

    this.render();
  }

  private render(): void {
    this.setContent('REGISTRATION');
    this.setStyle({ cursor: 'pointer' });
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
