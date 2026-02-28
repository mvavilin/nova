import { HeadingComponent } from '../../../api/ComponentsAPI';
import type { TestHeadingProperties } from './TestHeading.types';
import appStore from '../appState/appStore';
import type { Action } from '@/api/StateAPI';
import type { AppState } from '../appState/AppState.types';

export default class TestHeading extends HeadingComponent {
  constructor({ ...rest }: TestHeadingProperties = {}) {
    super({
      id: 'test-heading',
      classes: 'test-heading-purple',
      ...rest,
    });

    this.addSubscriptions([appStore.subscribe((state, action) => this.changeColor(state, action))]);

    this.render();
  }

  private render(): void {
    this.setContent('NOVA CODENAMES');
    this.setStyle({ color: 'purple' });
  }

  private changeColor(_state: AppState, action: Action): void {
    if (action.type !== 'CLICK_ON_CHANGE_COLOR_BUTTON') return;

    if (this.hasClasses('test-heading-purple')) {
      this.replaceClasses('test-heading-purple', 'test-heading-green');
      this.setStyle({ color: 'green' });
    } else {
      this.replaceClasses('test-heading-green', 'test-heading-purple');
      this.setStyle({ color: 'purple' });
    }
  }
}
