import { ContainerComponent } from '@/api/ComponentsAPI';
import type { WelcomePageProperties } from './WelcomePage.types';
import LoginButton from '@/pages/WelcomePage/LoginButton/LoginButton';
import WelcomeHeading from './WelcomeHeading/WelcomeHeading';
// import type { Action } from '@/api/StateAPI';
// import appStore from '@/store/store';
import RegButton from './RegButton/RegButton';

export default class WelcomePage extends ContainerComponent {
  constructor({ ...rest }: WelcomePageProperties = {}) {
    super({
      id: 'welcome-page',
      classes: 'welcome-page',
      ...rest,
    });

    // this.addSubscriptions([appStore.subscribe((action) => this.showInfo(action))]);

    this.render();
  }

  private render(): void {
    this.appendChildren([new WelcomeHeading(), new LoginButton(), new RegButton()]);
  }

  // private showInfo(action: Action): void {
  //   if (action.type !== 'CLICK_ON_CHANGE_COLOR_BUTTON') return;
  //   console.log(action);
  //   console.log(appStore.getState());
  // }
}
