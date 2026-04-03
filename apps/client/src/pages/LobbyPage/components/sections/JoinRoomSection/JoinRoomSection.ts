import { BaseComponent, HeadingComponent } from '@ComponentsAPI';
import { t } from '@i18n';
import { TranslationKeys } from '@i18n/translationKeys';
import { SectionHeading } from '@components';
import { SECTION_CLASSES } from '@constants/styles';
import { JoinRoomForm } from '@pages/LobbyPage/components/forms';
import type { State } from '@State';
import type { Action } from '@StateAPI';
import store from '@store';
import { AppActionTypes } from '@actions';

export default class JoinRoomSection extends BaseComponent {
  private heading: HeadingComponent;
  private joinRoomForm: JoinRoomForm;
  private unsubscribe: () => void;

  constructor() {
    super({ classes: SECTION_CLASSES.JOIN_ROOM_SECTION });

    this.heading = new SectionHeading({ title: t(TranslationKeys.JOIN_ROOM_SECTION_TITLE) });
    this.joinRoomForm = new JoinRoomForm();

    this.render();

    this.unsubscribe = store.subscribe((state, action) => this.switchLanguage(state, action));
  }

  private render(): void {
    this.appendChildren([this.heading, this.joinRoomForm]);
  }

  private switchLanguage(_state: State, action: Action): void {
    if (action.type === AppActionTypes.SWITCH_LANGUAGE) {
      this.heading.setContent(t(TranslationKeys.JOIN_ROOM_SECTION_TITLE));
      this.joinRoomForm.switchLanguage();
    }
  }

  public override destroy(): this {
    this.unsubscribe();
    super.destroy();
    return this;
  }
}
