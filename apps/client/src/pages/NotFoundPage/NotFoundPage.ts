import { Button } from '@components/ui';
import { router } from '@router';
import { BaseComponent, ContainerComponent, TextComponent } from '@ComponentsAPI';
import { NOT_FOUND_PAGE_BACKGROUND } from '@assets/backgrounds';

const NOT_FOUND_PAGE_CLASSES = {
  PAGE: `w-full h-full bg-cover bg-center flex items-center justify-end`,
  CONTAINER: `flex flex-col items-center gap-6 mx-36 rounded-4xl border-2 p-16 bg-white`,
  MESSAGE: `text-black text-3xl font-bold`,
  BUTTON: `bg-yellow-800 hover:bg-yellow-700 transition-all duration-300 px-4 py-2 rounded font-brand`,
};

export default class NotFoundPage extends BaseComponent {
  constructor() {
    super({ classes: NOT_FOUND_PAGE_CLASSES.PAGE });
    this.setStyle({ backgroundImage: `url(${NOT_FOUND_PAGE_BACKGROUND})` });
    this.render();
  }

  private render(): void {
    const container = new ContainerComponent({
      classes: NOT_FOUND_PAGE_CLASSES.CONTAINER,
    });

    const message = new TextComponent({
      content: '404 – Страница не найдена',
      classes: NOT_FOUND_PAGE_CLASSES.MESSAGE,
    });

    const homeButton = new Button({
      content: 'На главную',
      classes: NOT_FOUND_PAGE_CLASSES.BUTTON,
      listeners: {
        click: (): void => router.navigate(),
      },
    });

    container.appendChildren([message, homeButton]);
    this.appendChildren(container);
  }
}
