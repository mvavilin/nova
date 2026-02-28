import WelcomePage from '@/pages/WelcomePage/WelcomePage';
import { ContainerComponent } from '../../api/ComponentsAPI';
import type { AppProperties } from './App.types';
import RegPage from '@/pages/RegPage/RegPage';

export default class App extends ContainerComponent {
  constructor({ ...rest }: AppProperties = {}) {
    super({
      id: 'app',
      classes: 'flex items-center justify-center h-screen bg-gray-100',
      ...rest,
    });

    this.render();
  }

  private render(): void {
    console.log('Render - App');
    const welcome = new WelcomePage().hide(false);
    const reg = new RegPage().hide(false);

    const store = localStorage.getItem('store');

    if (store) {
      const { page } = JSON.parse(store);
      if (page === 'welcome') welcome.show();
      if (page === 'registration') reg.show();
    }

    this.appendChildren([welcome, reg]);
  }
}
