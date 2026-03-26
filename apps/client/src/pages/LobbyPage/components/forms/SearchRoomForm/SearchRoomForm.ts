import { FORM_CLASSES } from '@constants/styles';
import { ContainerComponent, FormComponent } from '@api/ComponentsAPI';
import { InputText, Button, FieldLabel } from '@components/ui';
import { RoomsTable } from '@pages/LobbyPage/components';
import { t } from '@i18n';
import { TranslationKeys } from '@i18n/translationKeys';

export default class SearchRoomForm extends FormComponent {
  private roomLabel: FieldLabel;
  private inputContainer: ContainerComponent;
  private roomInput: InputText;
  private searchRoomButton: Button;
  private roomsTable: RoomsTable;

  constructor(roomsTable: RoomsTable) {
    super({ classes: FORM_CLASSES.FORM });

    this.roomsTable = roomsTable;

    this.roomLabel = new FieldLabel({
      text: t(TranslationKeys.SEARCH_ROOM_FIELD_TITLE),
      htmlFor: 'searchRoom',
      classes: 'w-full',
    });

    this.roomInput = new InputText({
      id: 'searchRoom',
      name: 'searchRoom',
      placeholder: t(TranslationKeys.SEARCH_ROOM_FIELD_PLACEHOLDER),
      classes: FORM_CLASSES.INPUT,
      listeners: {
        input: (): void => this.onInputChange(),
      },
    });

    this.searchRoomButton = new Button({
      label: t(TranslationKeys.SEARCH_ROOM_FIELD_FIND_BUTTON_LABEL),
      classes: FORM_CLASSES.BUTTON,
      onClick: (): void => this.onSearch(),
    });

    this.inputContainer = new ContainerComponent({
      classes: FORM_CLASSES.INPUT_CONTAINER,
      children: [
        this.roomLabel,
        new ContainerComponent({
          classes: FORM_CLASSES.INPUT_ROW,
          children: [this.roomInput, this.searchRoomButton],
        }),
      ],
    });

    this.render();
  }

  private render(): void {
    this.appendChildren([this.inputContainer]);
  }

  private onSearch(): void {
    const query = this.roomInput.value.trim().toLowerCase();
    const allRows = this.roomsTable.getAllRows();

    if (!query) {
      for (const row of allRows) row.show();

      return;
    }

    for (const row of allRows) {
      const name = row.room.name.toLowerCase();

      if (name.includes(query)) row.show();
      else row.hide();
    }
  }

  private onInputChange(): void {
    const query = this.roomInput.value.trim();

    if (!query) {
      const allRows = this.roomsTable.getAllRows();
      for (const row of allRows) {
        row.show();
      }
    }
  }
}
