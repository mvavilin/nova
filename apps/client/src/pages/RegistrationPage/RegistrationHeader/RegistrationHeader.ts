import store from '@store';
import { ContainerComponent, TextComponent } from '@ComponentsAPI';
import { Logo } from '@components';
import LanguageButton from '@/components/LanguageButton/LanguageButton';
import { TranslationKeys } from '@/i18n/translationKeys';
import { t } from '@/i18n';
import { AppActionTypes, FormActionTypes } from '@/store/actions';
import type { State } from '@/store/types/state';
import type { Action } from '@/api/StateAPI';

const styles = {
  header:
    'min-w-[280px] w-full max-w-7xl flex flex-col md:flex-row gap-8 p-4 justify-between items-center bg-white/35 text-white rounded',
  container: 'flex justify-between items-center gap-5',
  title: 'text-2xl text-center font-bold',
  link: 'text-xl md:text-2xl text-center hover:cursor-pointer hover:text-brand',
};

export default class RegistrationHeader extends ContainerComponent {
  private logo: TextComponent | null = null;
  private loginLink: TextComponent | null = null;
  private unsubscribe: () => void;

  constructor() {
    super({ tag: 'header', classes: styles.header });

    this.render();

    this.unsubscribe = store.subscribe((state, action) => this.switchLanguage(state, action));
  }

  private render(): void {
    this.logo = new Logo();

    const container = new ContainerComponent({ classes: styles.container });
    this.loginLink = new TextComponent({
      classes: styles.link,
      content: t(TranslationKeys.LOGIN_TITLE),
    });
    this.loginLink.setListeners({
      click: (): void => {
        store.dispatch({
          type: FormActionTypes.GO_TO_LOGIN_PAGE,
        });
      },
    });

    container.appendChildren([this.loginLink, new LanguageButton()]);
    this.appendChildren([this.logo, container]);
  }

  private switchLanguage(_state: State, action: Action): void {
    if (action.type === AppActionTypes.SWITCH_LANGUAGE) {
      this.loginLink?.setContent(t(TranslationKeys.LOGIN_TITLE));
    }
  }

  public override destroy(): this {
    this.unsubscribe();
    super.destroy();
    return this;
  }
}
