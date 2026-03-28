import { ContainerComponent, TextComponent } from '@api/ComponentsAPI';
import { RadioItem, RadioGroup } from '@components/ui';
import { FORM_CLASSES } from '@constants/styles';
import { CREATE_ROOM_FORM_CONFIG as CONFIG } from '@constants/forms';
import { TranslationKeys } from '@i18n/translationKeys';
import { t } from '@i18n';

export default class PlayerCountField extends ContainerComponent {
  private label: TextComponent;

  constructor(onChange: (value: string) => void) {
    super({
      classes: FORM_CLASSES.INPUT_CONTAINER,
    });

    this.label = new TextComponent({
      content: t(TranslationKeys.PLAYER_COUNT_FIELD_TITLE),
      classes: FORM_CLASSES.LABEL,
    });

    const radioGroup = new RadioGroup({
      id: CONFIG.PLAYERS.NAME,
      items: CONFIG.PLAYERS.ITEMS.map(
        (item) =>
          new RadioItem({
            id: item.ID,
            value: item.VALUE,
            label: item.LABEL,
          })
      ),
      name: CONFIG.PLAYERS.NAME,
      value: CONFIG.PLAYERS.DEFAULT,
      onChange,
    });

    this.appendChildren([this.label, radioGroup]);
  }

  public switchLanguage(): void {
    if (!this.label) return;
    this.label.setContent(t(TranslationKeys.PLAYER_COUNT_FIELD_TITLE));
  }
}
