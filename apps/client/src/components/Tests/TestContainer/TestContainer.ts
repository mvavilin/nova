import { ContainerComponent } from '../../../api/ComponentsAPI';
import type { TestContainerProperties } from './TestContainer.types';
import TestButton from '../TestButton/TestButton';
import TestHeading from '../TestHeading/TestHeading';
import type { Action } from '@/api/StateAPI';
import appStore from '../appState/appStore';

export default class TestContainer extends ContainerComponent {
  constructor({ ...rest }: TestContainerProperties = {}) {
    super({
      id: 'test-container',
      classes: 'test-container',
      ...rest,
    });

    this.addSubscriptions([appStore.subscribe((action) => this.showInfo(action))]);

    this.render();
  }

  private render(): void {
    this.appendChildren([new TestHeading(), new TestButton()]);
  }

  private showInfo(action: Action): void {
    if (action.type !== 'CLICK_ON_CHANGE_COLOR_BUTTON') return;
    console.log(action);
    console.log(appStore.getState());
  }
}
