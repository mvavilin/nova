import { t } from '@i18n';
import { TranslationKeys } from '@i18n/translationKeys';
import { BaseComponent, HeadingComponent } from '@ComponentsAPI';
import { SECTION_CLASSES } from '@constants/styles';
import { SectionHeading } from '@components';
import { RoomsTable } from '@pages/LobbyPage/components';
import { SearchRoomForm } from '@pages/LobbyPage/components/forms';
import type { State } from '@State';
import type { Action } from '@StateAPI';
import store from '@store';
import { AppActionTypes } from '@actions';

export default class PublicRoomsSection extends BaseComponent {
  private heading: HeadingComponent;
  private searchRoomForm: SearchRoomForm | null = null;
  private roomsTable: RoomsTable | null = null;
  private unsubscribe: () => void;

  constructor() {
    super({ classes: SECTION_CLASSES.PUBLIC_ROOMS_SECTION });

    this.heading = new SectionHeading({ title: t(TranslationKeys.PUBLIC_ROOMS_SECTION_TITLE) });

    this.render();

    this.unsubscribe = store.subscribe((state, action) => this.switchLanguage(state, action));
  }

  private render(): void {
    this.roomsTable = new RoomsTable();
    this.searchRoomForm = new SearchRoomForm(this.roomsTable);

    this.appendChildren([this.heading, this.searchRoomForm, this.roomsTable]);
  }

  private switchLanguage(_state: State, action: Action): void {
    if (action.type === AppActionTypes.SWITCH_LANGUAGE) {
      if (!this.searchRoomForm || !this.roomsTable) return;
      this.heading.setContent(t(TranslationKeys.PUBLIC_ROOMS_SECTION_TITLE));
      this.searchRoomForm.switchLanguage();
      this.roomsTable.switchLanguage();
    }
  }

  public override destroy(): this {
    this.unsubscribe();
    super.destroy();
    return this;
  }
}
