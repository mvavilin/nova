import { ContainerComponent, TextComponent } from '@api/ComponentsAPI';
import { RadioItem, RadioGroup } from '@components/ui';
import { FORM_CLASSES } from '@constants/styles';
import { CREATE_ROOM_FORM_CONFIG as CONFIG } from '@constants/forms';

export default class PlayerCountField extends ContainerComponent {
  constructor(onChange: (value: string) => void) {
    const label = new TextComponent({
      content: CONFIG.PLAYERS.LABEL_TEXT,
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

    super({
      classes: FORM_CLASSES.INPUT_CONTAINER,
      children: [label, radioGroup],
    });
  }
}
