import { BaseComponent, TextComponent } from '@ComponentsAPI';
import { Button } from '@components/ui';
// import { Icon } from '@components/ui';
// import ICON from '@assets/icons';
import { app } from '@app';
import { ANIMATION_DURATION } from '@constants/styles';
import MessageType from '@constants/messageType';
import { t } from '@i18n';
import { TranslationKeys } from '@i18n/translationKeys';

interface ToastProperties {
  type: MessageType;
  message: string;
  onUndo?: () => void;
}

const ICON = {
  CIRCLE_CHECK: '✅',
  INFO: 'ℹ️',
  CIRCLE_ALERT: '❌',
  TRIANGLE_ALERT: '⚠️',
};
const TOAST_CLASSES = {
  BASE: 'fixed z-100 bottom-3 right-3 p-3 rounded shadow-md flex items-center justify-between gap-3 opacity-0 translate-y-4 transition-all duration-300 border max-w-sm min-w-3xs',
  [MessageType.SUCCESS]: 'bg-green-50 border-green-600 text-green-600',
  [MessageType.INFO]: 'bg-blue-50 border-blue-600 text-blue-600',
  [MessageType.ERROR]: 'bg-red-50 border-red-600 text-red-600',
  [MessageType.WARNING]: 'bg-amber-50 border-amber-600 text-amber-600',
} as const;
const UNDO_BUTTON_CLASSES = {
  BASE: 'text-white text-sm px-2 py-1 rounded',
  [MessageType.SUCCESS]: 'bg-green-600 hover:bg-green-700',
  [MessageType.INFO]: 'bg-blue-600 hover:bg-blue-700',
  [MessageType.ERROR]: 'bg-red-600 hover:bg-red-700',
  [MessageType.WARNING]: '!bg-amber-600 !hover:bg-amber-700',
} as const;
const MESSAGE_CLASSES = `flex-1 text-wrap leading-none text-sm`;
const TOAST_ICON_URL: Record<MessageType, string> = {
  [MessageType.SUCCESS]: ICON.CIRCLE_CHECK,
  [MessageType.INFO]: ICON.INFO,
  [MessageType.ERROR]: ICON.CIRCLE_ALERT,
  [MessageType.WARNING]: ICON.TRIANGLE_ALERT,
};
const TOAST_DISPLAY_DURATION = ANIMATION_DURATION * 10;

export default class Toast extends BaseComponent {
  private timeoutId: ReturnType<typeof setTimeout>;

  constructor({ type, message, onUndo }: ToastProperties) {
    super({ classes: `${TOAST_CLASSES.BASE} ${TOAST_CLASSES[type]}` });

    // this.appendChildren(new Icon({ url: TOAST_ICON_URL[type] }));
    this.appendChildren(new TextComponent({ content: TOAST_ICON_URL[type] }));
    this.appendChildren(new TextComponent({ content: message, classes: MESSAGE_CLASSES }));
    this.appendChildren(
      new Button({
        label: t(TranslationKeys.UNDO_LABEL),
        classes: `${UNDO_BUTTON_CLASSES.BASE} ${UNDO_BUTTON_CLASSES[type]}`,
        listeners: {
          click: (): void => {
            if (onUndo) onUndo();
            this.hide();
          },
        },
      })
    );

    app.appendChildren(this);

    requestAnimationFrame(() => {
      this.toggleClasses('translate-y-4', false);
      this.toggleClasses('translate-y-0', true);
      this.toggleClasses('opacity-0', false);
    });

    this.timeoutId = globalThis.setTimeout(() => this.hide(), TOAST_DISPLAY_DURATION);
  }

  public override hide(): this {
    this.toggleClasses('translate-y-0', false);
    this.toggleClasses('translate-y-4', true);
    this.toggleClasses('opacity-0', true);

    if (this.timeoutId) clearTimeout(this.timeoutId);

    setTimeout(() => this.destroy(), ANIMATION_DURATION);
    return this;
  }
}
