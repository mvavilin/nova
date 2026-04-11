import { BaseComponent, TextComponent } from '@/api/ComponentsAPI';
import type { RoomItemProps } from './RoomItem.types';
import RoomUser from '../RoomUser/RoomUser';
import { TranslationKeys } from '@/i18n/translationKeys';
import { t } from '@/i18n';

const styles = {
  item: 'grid grid-cols-[2fr_2fr_2fr] items-center justify-center gap-2 p-2 outline outline-white text-sm min-[450px]:text-base',
  indexNumber: 'text-center',
  role: 'text-center',
};

export default class RoomItem extends BaseComponent {
  private isHeader: boolean;
  private isAgent: boolean;
  private role: TextComponent | null;
  private user: RoomUser | null;

  constructor({ number, player }: RoomItemProps) {
    super({ tag: 'li' });

    this.isHeader = number === '№';
    const liStyles = this.isHeader
      ? `${styles.item} justify-center font-bold text-center`
      : styles.item;
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

    this.user = player.id
      ? new RoomUser({ username: player.username, id: player.id })
      : new RoomUser({ username: player.username });

    this.role = new TextComponent({ tag: 'span', classes: styles.role, content: roleText });

    this.appendChildren([indexNumber, this.user, this.role]);
  }

  public switchLanguage(): void {
    if (!this.role || !this.user) return;

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
