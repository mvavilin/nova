import { ButtonComponent, ContainerComponent } from '@/api/ComponentsAPI';
import type { WelcomePageProperties } from './WelcomePage.types';
import LoginButton from '@/pages/WelcomePage/LoginButton/LoginButton';
import WelcomeHeading from './WelcomeHeading/WelcomeHeading';
import store from '@store/store';
import RegistrationButton from './RegistrationButton/RegistrationButton';
import { WelcomeActions } from '@/store/actions/welcome.actions';
import RulesButton from './RulesButton/RulesButton';
import GameDescription from './GameDescription/GameDescription';
import LobbyButton from './LobbyButton/LobbyButton';
import AboutButton from './AboutButton/AboutButton';
import LanguageButton from '@/components/LanguageButton/LanguageButton';
import GameRulesModal from '@/components/GameRulesModal/GameRulesModal';
import AboutUsModal from '@/components/AboutUsModal/AboutUsModal';

export default class WelcomePage extends ContainerComponent {
  constructor({ ...rest }: WelcomePageProperties = {}) {
    super({
      id: 'welcome-page',
      classes:
        'flex flex-col justify-between items-center w-full min-h-screen py-10 px-10 md:px-20 bg-[url(/src/assets/welcome-page/welcome-page-background.webp)] bg-center bg-no-repeat bg-cover',
      ...rest,
    });

    this.addSubscriptions([
      store.subscribe((_state, action) => {
        if (action.type === WelcomeActions.SHOW_GAME_RULES) {
          new GameRulesModal().open();
        }

        if (action.type === WelcomeActions.SHOW_ABOUT_US) {
          new AboutUsModal().open();
        }
      }),
    ]);

    this.render();
  }

  private render(): void {
    const header = new ContainerComponent({
      tag: 'header',
      classes: 'flex justify-end items-center w-full max-w-[1440px] gap-[20px]',
    });
    const nav = new ContainerComponent({ tag: 'nav', classes: 'flex' });
    header.appendChildren(nav);
    header.appendChildren([new RulesButton(), new AboutButton(), new LanguageButton()]);

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

  private checkStatus(): ButtonComponent[] {
    const isAuth = store.getState().authStatus;
    return isAuth ? [new LobbyButton()] : [new LoginButton(), new RegistrationButton()];
  }
}
