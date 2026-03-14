import { ContainerComponent, type ContainerComponentProperties } from '@api/ComponentsAPI';
import type { RadioItem } from '@components/ui';

interface RadioGroupProperties extends ContainerComponentProperties {
  items: RadioItem[];
  name: string;
  value?: string;
  onChange?: (value: string) => void;
}

const RADIO_GROUP_CLASSES = 'inline-flex gap-1 bg-white rounded p-1 w-max';

export default class RadioGroup extends ContainerComponent {
  private items: RadioItem[];
  private name: string;

  constructor({ items, name, value, onChange, ...properties }: RadioGroupProperties) {
    super({
      classes: RADIO_GROUP_CLASSES,
      listeners: {
        change: (event: Event) => {
          const target = event.target;
          if (target instanceof HTMLInputElement && target.type === 'radio' && onChange) {
            const item = this.items.find((item) => item.radioInput.element === target);
            if (item) {
              onChange(item.value);
            }
          }
        },
      },
      ...properties,
    });

    this.items = items;
    this.name = name;

    for (const item of this.items) item.radioInput.setName(this.name);

    if (value) {
      const selected = this.items.find((item) => item.value === value);
      if (selected) selected.radioInput.setChecked(true);
    }

    this.render();
  }

  private render(): void {
    this.appendChildren(this.items);
  }

  public get value(): string | undefined {
    const selected = this.items.find((item) => item.checked);
    return selected?.value;
  }
}
