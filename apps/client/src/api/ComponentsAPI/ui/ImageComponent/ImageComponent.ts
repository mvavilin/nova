import BaseComponent from '../../base/BaseComponent';
import type { ImageComponentProperties } from './ImageComponent.types';

export default class ImageComponent extends BaseComponent {
  constructor({ source = '', alt = '', width, height, ...rest }: ImageComponentProperties = {}) {
    super({
      tag: 'img',
      ...rest,
    });

    this.setSrc(source);
    this.setAlt(alt);
    if (width || height) this.setDimensions(width, height);
  }

  private get image(): HTMLImageElement {
    if (!(this.element instanceof HTMLImageElement)) {
      throw new TypeError('Element is not an image');
    }
    return this.element;
  }

  public setSrc(source: string): this {
    this.image.src = source;
    return this;
  }

  public setAlt(alt: string): this {
    this.image.alt = alt;
    return this;
  }

  public setDimensions(width?: number | string, height?: number | string): this {
    if (width !== undefined) this.image.width = Number(width);
    if (height !== undefined) this.image.height = Number(height);
    return this;
  }
}
