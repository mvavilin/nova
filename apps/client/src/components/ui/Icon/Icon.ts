import { BaseComponent } from '@ComponentsAPI';

interface IconProperties {
  url: string;
  size?: number;
}

const ICON_CLASSES = `inline-block bg-center bg-contain bg-no-repeat z-10`;

export default class Icon extends BaseComponent {
  constructor({ url, size = 24 }: IconProperties) {
    super({ tag: 'p', classes: ICON_CLASSES });

    this.setStyle({
      width: `${size}px`,
      height: `${size}px`,
      backgroundImage: `url('${url}')`,
    });
  }
}
