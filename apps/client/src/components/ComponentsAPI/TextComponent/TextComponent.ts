import BaseComponent from '../BaseComponent/BaseComponent';
import type { TextComponentProperties } from './TextComponent.types';

export default class TextComponent extends BaseComponent {
  constructor({ tag = 'p', ...rest }: TextComponentProperties = {}) {
    super({
      tag,
      ...rest,
    });
  }

  public appendText(text: string | number): this {
    const current = this.content ?? '';
    this.setContent(`${current}${text}`);
    return this;
  }

  public prependText(text: string | number): this {
    const current = this.content ?? '';
    this.setContent(`${text}${current}`);
    return this;
  }

  public uppercase(): this {
    const current = this.content ?? '';
    this.setContent(current.toString().toUpperCase());
    return this;
  }

  public lowercase(): this {
    const current = this.content ?? '';
    this.setContent(current.toString().toLowerCase());
    return this;
  }

  public capitalize(): this {
    const current = this.content ?? '';
    this.setContent(current.toString().replaceAll(/\b\w/g, (char) => char.toUpperCase()));
    return this;
  }
}
