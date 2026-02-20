import StyleManager from './StyleManager';
import AttributeManager from './AttributeManager';

export default class VisibilityManager {
  private style: StyleManager | null;
  private attributes: AttributeManager | null;

  constructor(style: StyleManager | null, attributes: AttributeManager | null) {
    this.style = style;
    this.attributes = attributes;
  }

  show(animated = true, duration = 500): this {
    if (animated) {
      this.style?.set({
        transition: `opacity ${duration}ms`,
        opacity: '0',
      });

      this.attributes?.toggle('hidden', false);

      requestAnimationFrame(() => {
        this.style?.set({ opacity: '1' });
      });
    } else {
      this.attributes?.toggle('hidden', false);
      this.style?.set({ opacity: '1', transition: '' });
    }

    return this;
  }

  hide(animated = true, duration = 500): this {
    if (animated) {
      this.style?.set({
        transition: `opacity ${duration}ms`,
        opacity: '0',
      });

      setTimeout(() => {
        this.attributes?.toggle('hidden', true);
      }, duration);
    } else {
      this.attributes?.toggle('hidden', true);
      this.style?.set({ opacity: '1', transition: '' });
    }

    return this;
  }
}
