import { ContainerComponent } from '@ComponentsAPI';
import type { AppProperties } from '@components/App/App.types';

export default class App extends ContainerComponent {
  constructor({ ...rest }: AppProperties = {}) {
    super({
      id: 'app',
      classes: 'flex items-center min-h-screen my-auto',
      ...rest,
    });
  }
}
