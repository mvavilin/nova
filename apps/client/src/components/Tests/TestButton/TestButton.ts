import { ButtonComponent } from '../../../api/ComponentsAPI';
import type { TestButtonProperties } from './TestButton.types';
import appStore from '../appState/appStore';

export default class TestButton extends ButtonComponent {
  constructor({ ...rest }: TestButtonProperties = {}) {
    super({
      id: 'test-button',
      classes: 'test-button',
      ...rest,
    });

    this.render();
  }

  private render(): void {
    this.setContent('CHANGE COLOR');
    this.setStyle({ cursor: 'pointer' });
    this.setListeners({
      click: (): void => {
        appStore.dispatch({
          type: 'CLICK_ON_CHANGE_COLOR_BUTTON',
          payload: 'some info',
        });
      },
    });
  }
}
