import store from '@store';
import { BaseComponent, ContainerComponent, HeadingComponent } from '@ComponentsAPI';
import { Logo, ExitButton } from '@components';
import RoomUser from '../RoomUser/RoomUser';
import LanguageButton from '@/components/LanguageButton/LanguageButton';
import { TranslationKeys } from '@/i18n/translationKeys';
import { t } from '@/i18n';

const styles = {
  header:
    'w-full min-w-[350px] max-w-7xl grid grid-cols-1 min-w-[650px]:grid-cols-[1fr_1fr_2fr] md:grid-cols-[1fr_1fr_1fr] gap-4 p-4 items-center bg-white/25 text-white rounded place-items-center',
  title: 'text-2xl text-center font-bold',
  container: 'flex justify-between items-center',
  userMenu: 'flex items-center justify-end gap-4 justify-self-end',
};

export default class RoomHeader extends ContainerComponent {
  private userMenu: BaseComponent | null = null;
  private title: HeadingComponent | null = null;

  constructor() {
    super({ tag: 'header', classes: styles.header });

    this.render();
  }

  private render(): void {
    const container = new ContainerComponent({ classes: styles.container });

    this.title = new HeadingComponent({
      level: 1,
      content: t(TranslationKeys.ROOM_TITLE),
      classes: styles.title,
    });

    this.userMenu = new BaseComponent({ classes: styles.userMenu });

    const username = store.getState().username;
    const userId = store.getState().id;
    if (username && userId) {
      this.userMenu.appendChildren([new RoomUser({ username: username, id: userId })]);
    }

    container.appendChildren([new LanguageButton(), this.userMenu, new ExitButton()]);

    this.appendChildren([new Logo(), this.title, container]);
  }

  public switchLanguage(): void {
    if (!this.title) return;
    this.title.setContent(t(TranslationKeys.ROOM_TITLE));
  }

  public destroyComponent(): void {
    this.userMenu = null;
    this.title = null;

    this.destroyChildren();
    super.destroy();
  }
}
