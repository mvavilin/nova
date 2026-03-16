import { BaseComponent } from '@ComponentsAPI';
import { Overlay, Button } from '@components/ui';
import ICONS from '@assets/icons';

const MODAL_CLASSES = `bg-white rounded m-6 px-6 py-12 max-w-lg w-full relative max-h-[80vh] overflow-y-auto overflow-x-hidden break-words select-text`;

const CLOSE_BUTTON_CLASSES = 'absolute top-2 right-2 hover:bg-gray-100 bg-transparent';

interface ModalProperties {
  children: BaseComponent[];
  isClosable?: boolean;
}

export default class Modal extends BaseComponent {
  public overlay: Overlay;

  constructor({ children, isClosable = true }: ModalProperties) {
    super({ classes: MODAL_CLASSES, children });

    if (isClosable) {
      this.appendChildren(
        new Button({
          classes: CLOSE_BUTTON_CLASSES,
          iconUrl: ICONS.X,
          listeners: {
            click: (): void => {
              this.hide();
            },
          },
        })
      );
    }

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
