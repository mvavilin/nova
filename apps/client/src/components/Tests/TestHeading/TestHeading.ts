import { HeadingComponent } from '../../../api/ComponentsAPI';
import type { TestHeadingProperties } from './TestHeading.types';
import appStore from '../appState/appStore';
import type { Action } from '@/api/StateAPI';

export default class TestHeading extends HeadingComponent {
  constructor({ ...rest }: TestHeadingProperties = {}) {
    super({
      id: 'test-heading',
      classes: 'test-heading-purple',
      ...rest,
    });

    this.addSubscriptions([appStore.subscribe((action) => this.changeColor(action))]);

    this.render();
  }

  private render(): void {
    this.setContent('NOVA CODENAMES');
    this.setStyle({ color: 'purple' });
  }

  private changeColor(action: Action): void {
    if (action.type !== 'CHANGE_HEADER_COLOR') return;

    if (this.hasClasses('test-heading-purple')) {
      this.replaceClasses('test-heading-purple', 'test-heading-green');
      this.setStyle({ color: 'green' });
    } else {
      this.replaceClasses('test-heading-green', 'test-heading-purple');
      this.setStyle({ color: 'purple' });
    }
  }
}
