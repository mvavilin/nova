import { ContainerComponent } from '../../api/ComponentsAPI';
import type { AppProperties } from './App.types';

export default class App extends ContainerComponent {
  constructor({ ...rest }: AppProperties = {}) {
    super({
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
    console.log(this.app);
  }
}
