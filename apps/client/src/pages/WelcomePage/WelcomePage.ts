import { ButtonComponent, ContainerComponent } from '@/api/ComponentsAPI';
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
import LobbyButton from './LobbyButton/LobbyButton';

export default class WelcomePage extends ContainerComponent {
  constructor({ ...rest }: WelcomePageProperties = {}) {
    super({
      id: 'welcome-page',
      classes:
        'flex flex-col justify-between items-center w-full min-h-screen py-10 px-10 md:px-20 bg-[url(/src/assets/welcome-page/welcome-page-background.webp)] bg-center bg-no-repeat bg-cover',
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

    const content = new ContainerComponent({
      classes: 'grid grid-rows-[auto_1fr_auto] w-full h-full max-w-[1024px] gap-10',
    });
    const buttons = new ContainerComponent({
      id: 'buttons',
      classes: 'flex justify-center gap-10',
    });

    buttons.appendChildren(this.checkStatus());
    content.appendChildren([new WelcomeHeading(), new GameDescription(), buttons]);

    const footer = new ContainerComponent({ tag: 'footer', classes: 'w-full max-w-[1440px]' });

    this.appendChildren([header, content, footer]);
  }

  private showGameRules(_state: State, action: Action): void {
    if (action.type === WelcomeActions.SHOW_GAME_RULES) {
      alert('Modal Window with Game Rules');
    }
  }

  private checkStatus(): ButtonComponent[] {
    const isAuth = store.getState().authStatus;
    return isAuth ? [new LobbyButton()] : [new LoginButton(), new RegistrationButton()];
  }
}
