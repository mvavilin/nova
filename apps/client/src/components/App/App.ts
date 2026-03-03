import { ContainerComponent } from '@ComponentsAPI';
import type { AppProperties } from '@components/App/App.types';

export default class App extends ContainerComponent {
  constructor({ ...rest }: AppProperties = {}) {
    super({
      id: 'app',
      classes: 'flex items-center justify-center h-screen bg-gray-100',
      ...rest,
    });
  }
}
