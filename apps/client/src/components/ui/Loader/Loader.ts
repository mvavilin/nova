import { BaseComponent, ContainerComponent, TextComponent } from '@/api/ComponentsAPI';
import { Overlay } from '..';

const containerStyle = 'flex flex-col justify-center items-center gap-10';

const messageStyle = 'font text-4xl text-yellow-400';
const spinnerStyle =
  'w-16 h-16 animate-spin border-4 rounded-full border-yellow-400 border-t-transparent shadow-[0_0_10px_rgba(250,204,21,0.5)';

export default class Loader extends ContainerComponent {
  private overlay: Overlay;
  private message: TextComponent;
  private spinner: BaseComponent;

  constructor() {
    super({ classes: containerStyle });

    this.message = new TextComponent({
      classes: messageStyle,
      content: 'Trying to connect to server...',
    });

    this.spinner = new ContainerComponent({ classes: spinnerStyle });

    this.appendChildren([this.message, this.spinner]);

    this.overlay = new Overlay(this);
  }

  public override show(): this {
    this.overlay.show();
    return super.show();
  }

  public override hide(): this {
    this.overlay.hide();
    return super.destroy();
  }
}
