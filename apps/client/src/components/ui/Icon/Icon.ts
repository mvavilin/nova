import { BaseComponent } from '@ComponentsAPI';

interface IconProperties {
  url: string;
  size?: number;
}

const ICON_CLASSES = `bg-center bg-contain bg-no-repeat`;

export default class Icon extends BaseComponent {
  constructor({ url, size = 24 }: IconProperties) {
    super({ classes: ICON_CLASSES });

    this.setStyle({
      minWidth: `${size}px`,
      minHeight: `${size}px`,
      backgroundImage: `url(${url})`,
    });
  }
}
