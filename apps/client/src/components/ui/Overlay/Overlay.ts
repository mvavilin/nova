import { BaseComponent } from '@ComponentsAPI';
import { app } from '@app';
import { ANIMATION_DURATION } from '@styles';

const OVERLAY_CLASSES = `fixed inset-0 bg-black/60 z-50 flex items-center justify-center pointer-events-auto select-none`;

export default class Overlay extends BaseComponent {
  constructor() {
    super({
      id: 'overlay',
      classes: OVERLAY_CLASSES,
      listeners: { click: (event) => event.stopPropagation() },
    });

    this.show = (): this => {
      app.appendChildren(this);
      super.show();
      return this;
    };

    this.hide = (): this => {
      setTimeout(() => this.destroy(), ANIMATION_DURATION);
      super.hide();
      return this;
    };
  }
}
