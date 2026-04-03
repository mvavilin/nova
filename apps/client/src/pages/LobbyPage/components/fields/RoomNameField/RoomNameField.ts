import { ContainerComponent } from '@api/ComponentsAPI';
import { FieldLabel, InputText, Button } from '@components/ui';
import { FORM_CLASSES } from '@constants/styles';
import { CREATE_ROOM_FORM_CONFIG as CONFIG } from '@constants/forms';
import { t } from '@i18n';
import { TranslationKeys } from '@i18n/translationKeys';

export default class RoomNameField extends ContainerComponent {
  private onInput: (value: string) => void;
  private onSubmit: () => void;
  private label: FieldLabel | null = null;
  private input: InputText | null = null;
  private button: Button | null = null;

  constructor(onInput: (value: string) => void, onSubmit: () => void) {
    super({ classes: FORM_CLASSES.INPUT_CONTAINER });

    this.onInput = onInput;
    this.onSubmit = onSubmit;

    this.render();
  }

  private handleCreateRoom(): void {
    if (!this.input || this.input.isEmpty()) return;
    this.onSubmit();
  }

  private render(): void {
    this.label = new FieldLabel({
      text: t(TranslationKeys.ROOM_NAME_FIELD_TITLE),
      htmlFor: CONFIG.ROOM.INPUT_ID,
      classes: FORM_CLASSES.LABEL,
    });

    this.input = new InputText({
      id: CONFIG.ROOM.INPUT_ID,
      name: CONFIG.ROOM.INPUT_NAME,
      placeholder: t(TranslationKeys.ROOM_NAME_FIELD_PLACEHOLDER),
      classes: FORM_CLASSES.INPUT,
      listeners: {
        input: (): void => {
          if (!this.input) return;
          this.input.isEmpty();
          this.onInput(this.input.value);
        },
        keydown: (event: Event): void => {
          if (event instanceof KeyboardEvent && event.key === 'Enter') this.handleCreateRoom();
        },
      },
    });

    this.button = new Button({
      label: t(TranslationKeys.ROOM_NAME_FIELD_CREATE_BUTTON_LABEL),
      classes: FORM_CLASSES.BUTTON,
      listeners: { click: (): void => this.handleCreateRoom() },
    });

    const inputRow = new ContainerComponent({
      classes: FORM_CLASSES.INPUT_ROW,
      children: [this.input, this.button],
    });

    this.appendChildren([this.label, inputRow]);
  }

  public switchLanguage(): void {
    if (!this.label || !this.input || !this.button) return;
    this.label.setContent(t(TranslationKeys.ROOM_NAME_FIELD_TITLE));
    this.input.setPlaceholder(t(TranslationKeys.ROOM_NAME_FIELD_PLACEHOLDER));
    this.button.setLabel(t(TranslationKeys.ROOM_NAME_FIELD_CREATE_BUTTON_LABEL));
  }
}
