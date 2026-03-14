import { BaseComponent } from '@ComponentsAPI';
import { app } from '@app';
import { ANIMATION_DURATION } from '@styles';

const OVERLAY_CLASSES =
  'fixed inset-0 bg-black/60 z-50 flex items-center justify-center pointer-events-auto select-none';

export default class Overlay extends BaseComponent {
  constructor(child?: BaseComponent) {
    super({
      id: 'overlay',
      classes: OVERLAY_CLASSES,
      listeners: { click: (event) => event.stopPropagation() },
    });

    if (child) this.appendChildren(child);
  }

  public override show(): this {
    app.appendChildren(this);
    super.show();
    return this;
  }

  public override hide(): this {
    super.hide();
    setTimeout(() => this.destroy(), ANIMATION_DURATION);
    return this;
  }
}
