import WelcomePage from '@/pages/WelcomePage/WelcomePage';
import { ContainerComponent } from '../../api/ComponentsAPI';
import type { AppProperties } from './App.types';

export default class App extends ContainerComponent {
  constructor({ ...rest }: AppProperties = {}) {
    super({
      id: 'app',
      // classes: 'flex items-center justify-center h-screen',
      ...rest,
    });

    this.render();
  }

  private render(): void {
    console.log('Render - App');
    this.appendChildren(new WelcomePage());
  }
}
