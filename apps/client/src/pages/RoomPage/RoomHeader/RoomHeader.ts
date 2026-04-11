import store from '@store';
import { ContainerComponent, HeadingComponent } from '@ComponentsAPI';
import { Logo, ExitButton } from '@components';
import RoomUser from '../RoomUser/RoomUser';
import LanguageButton from '@/components/LanguageButton/LanguageButton';
import { TranslationKeys } from '@/i18n/translationKeys';
import { t } from '@/i18n';

const styles = {
  header:
    'min-w-[280px] w-full max-w-7xl flex flex-col md:flex-row gap-8 p-4 justify-between items-center bg-white/35 text-white rounded',
  title: 'text-xl min-[450px]:text-2xl text-center font-bold',
  container: 'flex justify-between items-center gap-2',
  userMenu: 'items-center',
};

export default class RoomHeader extends ContainerComponent {
  private user: RoomUser | null = null;
  private title: HeadingComponent | null = null;
  private logo: Logo | null = null;

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

    const username = store.getState().username;
    const userId = store.getState().id;
    if (!username || !userId) return;
    this.user = new RoomUser({ username, id: userId });
    this.user.removeClasses('justify-start');
    this.user.setClasses('justify-center');

    container.appendChildren([new LanguageButton(), this.user, new ExitButton()]);

    this.logo = new Logo();
    this.logo.setClasses('pointer-events-none');

    this.appendChildren([this.logo, this.title, container]);
  }

  public switchLanguage(): void {
    if (!this.title) return;
    this.title.setContent(t(TranslationKeys.ROOM_TITLE));
  }
}
