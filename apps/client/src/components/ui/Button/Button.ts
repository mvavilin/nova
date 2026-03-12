import { ButtonComponent, TextComponent, type ButtonComponentProperties } from '@ComponentsAPI';
import { Icon } from '@components/ui';

interface ButtonProperties extends ButtonComponentProperties {
  label?: string;
  iconUrl?: string;
  iconSize?: number;
  onClick?: () => void;
}

const BUTTON_CLASSES = `flex items-center justify-center gap-2 px-3 py-1 rounded bg-blue-600 text-white hover:bg-blue-700 transition cursor-pointer`;

export default class Button extends ButtonComponent {
  constructor({
    label,
    iconUrl,
    iconSize = 24,
    onClick,
    classes = '',
    content = '',
  }: ButtonProperties) {
    super({ classes: `${BUTTON_CLASSES} ${classes}`.trim(), content });

    if (iconUrl) {
      const icon = new Icon({ url: iconUrl, size: iconSize });
      this.appendChildren(icon);
    }

    if (label) this.appendChildren(new TextComponent({ content: label }));

    if (onClick) this.setListeners({ click: () => onClick() });
  }
}
