import { ContainerComponent } from '@/api/ComponentsAPI';
import type { WelcomePageProperties } from './WelcomePage.types';
import LoginButton from '@/pages/WelcomePage/LoginButton/LoginButton';
import WelcomeHeading from './WelcomeHeading/WelcomeHeading';
import type { Action } from '@/api/StateAPI';
import store from '@store/store';
import RegistrationButton from './RegistrationButton/RegistrationButton';
import { WelcomeActions } from '@/store/actions/welcome.actions';
import type { State } from '@store/types/state';
import LangButton from './LangButton/LangButton';
import AboutButton from './AboutButton/AboutButton';
import GameDescription from './GameDescription/GameDescription';

export default class WelcomePage extends ContainerComponent {
  constructor({ ...rest }: WelcomePageProperties = {}) {
    super({
      id: 'welcome-page',
      classes:
        'flex flex-col justify-between items-center w-full min-h-screen py-10 px-20 bg-[url(/src/assets/welcome-page/welcome-page-background.webp)] bg-center bg-no-repeat bg-cover',
      ...rest,
    });

    this.addSubscriptions([store.subscribe((state, action) => this.showGameRules(state, action))]);

    this.render();
  }

  private render(): void {
    const header = new ContainerComponent({
      tag: 'header',
      classes: 'flex justify-end w-full max-w-[1440px]',
    });
    const nav = new ContainerComponent({ tag: 'nav', classes: 'flex' });
    header.appendChildren(nav);
    header.appendChildren([new AboutButton(), new LangButton()]);

    const content = new ContainerComponent({ classes: 'flex flex-col w-full max-w-[1024px]' });
    content.appendChildren([
      new WelcomeHeading(),
      new GameDescription(),
      new RegistrationButton(),
      new LoginButton(),
    ]);

    const footer = new ContainerComponent({ tag: 'footer', classes: 'w-full max-w-[1440px]' });

    this.appendChildren([header, content, footer]);
  }

  private showGameRules(_state: State, action: Action): void {
    if (action.type === WelcomeActions.SHOW_GAME_RULES) {
      alert('Modal Window with Game Rules');
    }
  }
}
