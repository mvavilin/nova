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
import { Button, Modal } from '@/components/ui';
import GameRules from './GameRules/GameRules';
import { TranslationKeys } from '@/i18n/translationKeys';
import { t } from '@/i18n';

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
      const modal = new Modal({
        children: [new GameRules()],
        isClosable: true,
      });

      modal.setClasses(
        '!px-0 !py-0 rounded-lg !bg-[var(--color-dark)] border border-[var(--color-brand)]'
      );

      const close = modal.children[1];
      if (close) {
        close.destroyChildren();
        close.setContent('📌');
      }

      modal.appendChildren(
        new Button({
          label: t(TranslationKeys.GAME_RULES_CLOSE_BTN),
          classes:
            'mb-6 mx-auto !bg-[var(--color-brand)] hover:!bg-[var(--color-accent)] !font-brand !text-[var(--color-dark)] transition-colors duration-200',
          onClick: (): Modal => modal.hide(),
        })
      );

      modal.show();
    }
  }

  private checkStatus(): ButtonComponent[] {
    const isAuth = store.getState().authStatus;
    return isAuth ? [new LobbyButton()] : [new LoginButton(), new RegistrationButton()];
  }
}
