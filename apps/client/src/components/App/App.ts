import { ContainerComponent } from '../../api/ComponentsAPI';
import TestContainer from '../Tests/TestContainer/TestContainer';
import type { AppProperties } from './App.types';

export default class App extends ContainerComponent {
  constructor({ ...rest }: AppProperties = {}) {
    super({
      id: 'app',
      ...rest,
    });

    this.render();
  }

  private render(): void {
    this.setChildren(new TestContainer());
    console.log('Render - App');
  }
}
