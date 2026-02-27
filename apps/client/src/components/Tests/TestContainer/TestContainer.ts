import { ContainerComponent } from '../../../api/ComponentsAPI';
import type { TestContainerProperties } from './TestContainer.types';
import TestButton from '../TestButton/TestButton';
import TestHeading from '../TestHeading/TestHeading';

export default class TestContainer extends ContainerComponent {
  constructor({ ...rest }: TestContainerProperties = {}) {
    super({
      id: 'test-container',
      classes: 'test-container',
      ...rest,
    });

    this.render();
  }

  private render(): void {
    this.appendChildren([new TestHeading(), new TestButton()]);
  }
}
