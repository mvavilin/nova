import { ContainerComponent } from '@/api/ComponentsAPI';
import type { WelcomePageProperties } from './WelcomePage.types';
import LoginButton from '@/pages/WelcomePage/LoginButton/LoginButton';
import WelcomeHeading from './WelcomeHeading/WelcomeHeading';
import type { Action } from '@/api/StateAPI';
import store from '@store/store';
import RegButton from './RegButton/RegButton';
import { WelcomeActions } from '@/store/actions/welcome.actions';
import type { State } from '@store/types/state';
import { TestActions } from '@/store/actions/test.actions';
import LangButton from './LangButton/LangButton';

export default class WelcomePage extends ContainerComponent {
  constructor({ ...rest }: WelcomePageProperties = {}) {
    super({
      id: 'welcome-page',
      classes:
        'flex flex-col justify-between items-center w-full min-h-screen py-10 px-20 bg-[url(/src/assets/welcome-page/welcome-page-background.webp)] bg-center bg-no-repeat bg-cover',
      ...rest,
    });

    this.addSubscriptions([
      store.subscribe((state, action) => this.showPage(state, action)),
      store.subscribe((state, action) => this.hidePage(state, action)),
    ]);

    this.render();
  }

  private render(): void {
    const header = new ContainerComponent({
      tag: 'header',
      classes: 'flex justify-end w-full max-w-[1440px]',
    });
    const nav = new ContainerComponent({ tag: 'nav', classes: 'flex' });
    header.appendChildren(nav);
    header.appendChildren(new LangButton());

    const container = new ContainerComponent({ classes: 'flex flex-col w-full max-w-[1440px]' });
    container.appendChildren([new WelcomeHeading(), new RegButton(), new LoginButton()]);

    const footer = new ContainerComponent({ tag: 'footer', classes: 'w-full max-w-[1440px]' });

    this.appendChildren([header, container, footer]);
  }

  private hidePage(_state: State, action: Action): void {
    if (action.type === WelcomeActions.GO_TO_TEST_PAGE) {
      this.hide(true, 500);
    }
  }

  private showPage(_state: State, action: Action): void {
    if (action.type === TestActions.GO_TO_WELCOME_PAGE) {
      setTimeout(() => {
        this.show(true, 500);
      }, 500);
    }
  }
}
