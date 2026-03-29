import { ButtonComponent, TextComponent, type ButtonComponentProperties } from '@ComponentsAPI';
import { Icon } from '@components/ui';

interface ButtonProperties extends ButtonComponentProperties {
  label?: string;
  iconUrl?: string;
  iconSize?: number;
  onClick?: () => void;
}

const BUTTON_CLASSES = `flex items-center justify-center gap-2 rounded bg-blue-600 text-white hover:bg-blue-700 transition cursor-pointer p-1 disabled:bg-gray-400 disabled:cursor-not-allowed`;

export default class Button extends ButtonComponent {
  private textComponent?: TextComponent;

  constructor({ label, iconUrl, iconSize = 24, onClick, classes = '', ...rest }: ButtonProperties) {
    super({ classes: `${BUTTON_CLASSES} ${classes}`.trim(), content: '', ...rest });

    if (iconUrl) this.appendChildren(new Icon({ url: iconUrl, size: iconSize }));
    if (label) {
      this.textComponent = new TextComponent({ content: label });
      this.appendChildren(this.textComponent);
      this.setClasses('px-3 py-1');
    }

    if (onClick) this.setListeners({ click: onClick });
  }

  public setLabel(label: string): this {
    if (this.textComponent) {
      this.textComponent.setContent(label);
    } else {
      this.textComponent = new TextComponent({ content: label });
      this.appendChildren(this.textComponent);
    }
    return this;
  }
}
