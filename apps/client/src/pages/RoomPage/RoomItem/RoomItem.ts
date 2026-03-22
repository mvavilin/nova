import { BaseComponent, TextComponent } from '@/api/ComponentsAPI';
import type { RoomItemProps } from './RoomItem.types';
import RoomUser from '../RoomUser/RoomUser';
import { TranslationKeys } from '@/i18n/translationKeys';
import { t } from '@/i18n';
import type { State } from '@/store/types/state';
import type { Action } from '@/api/StateAPI';
import store from '@/store/store';
import { AppActionTypes } from '@/store/actions';

const styles = {
  item: 'grid grid-cols-[1fr_3fr_2fr] items-center justify-center gap p-2 outline outline-white',
  indexNumber: 'text-center',
  role: 'text-center',
};

export default class RoomItem extends BaseComponent {
  private isHeader: boolean;
  private isAgent: boolean;
  private role: TextComponent;
  private user: RoomUser;

  constructor({ number, player }: RoomItemProps) {
    super({ tag: 'li' });

    this.isHeader = number === '№';
    const liStyles = this.isHeader ? `${styles.item} font-bold text-center` : styles.item;
    this.setClasses(liStyles);

    this.isAgent = player.role === 'agent';
    let roleText;

    if (this.isHeader) {
      roleText = player.role;
    } else {
      roleText = this.isAgent ? t(TranslationKeys.ROOM_AGENT) : t(TranslationKeys.ROOM_SPYMASTER);
    }

    const indexNumber = new TextComponent({
      tag: 'span',
      classes: styles.indexNumber,
      content: number,
    });

    this.user = player.userId
      ? new RoomUser({ username: player.username, userId: player.userId })
      : new RoomUser({ username: player.username });

    this.role = new TextComponent({ tag: 'span', classes: styles.role, content: roleText });

    this.appendChildren([indexNumber, this.user, this.role]);

    this.addSubscriptions([store.subscribe((state, action) => this.switchLanguage(state, action))]);
  }

  private switchLanguage(_state: State, action: Action): void {
    if (action.type === AppActionTypes.SWITCH_LANGUAGE) {
      if (this.isHeader) {
        this.role.setContent(t(TranslationKeys.ROOM_ROLE));
        this.user.setContent(t(TranslationKeys.ROOM_PLAYER));
      } else {
        if (this.isAgent) {
          this.role.setContent(t(TranslationKeys.ROOM_AGENT));
        } else {
          this.role.setContent(t(TranslationKeys.ROOM_SPYMASTER));
        }
      }
    }
  }
}
