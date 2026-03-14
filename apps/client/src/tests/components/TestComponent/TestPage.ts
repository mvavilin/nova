import { ContainerComponent } from '@ComponentsAPI';
import type { TestPageProperties } from './TestPage.types';
import TestHeading from './TestHeading/TestHeading';
import TestButton from './TestButton/TestButton';
import TestText from './TestText/TestText';

export default class TestPage extends ContainerComponent {
  constructor({ ...rest }: TestPageProperties = {}) {
    super({
      id: 'test-page',
      classes: 'flex flex-col items-center gap-6 p-10 bg-white rounded-2xl shadow-xl',
      ...rest,
    });

    this.render();
  }

  private render(): void {
    this.appendChildren([new TestHeading(), new TestText(), new TestButton()]);
  }
}
