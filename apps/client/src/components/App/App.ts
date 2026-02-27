import { ContainerComponent } from '../../api/ComponentsAPI';
import Test from '../Test/Test';
import type { AppProperties } from './App.types';

export default class App extends ContainerComponent {
  constructor({ ...rest }: AppProperties = {}) {
    super({
      id: 'app',
      ...rest,
    });

    this.render();
  }

  private get app(): HTMLDivElement {
    if (!(this.element instanceof HTMLDivElement)) {
      throw new TypeError('Element is not a container');
    }
    return this.element;
  }

  private render(): void {
    this.setChildren(new Test());
    console.log('Render - App');
  }
}
