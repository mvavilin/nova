import { BaseComponent, type BaseComponentProperties } from '@ComponentsAPI';
import { Logo } from '@components';

type HeaderProperties = BaseComponentProperties;

const HEADER_CLASSES = `w-full grid gap-2 p-4 bg-white/25 text-white rounded place-items-center`;

export default class Header extends BaseComponent {
  constructor({ children = [], ...rest }: HeaderProperties) {
    const items = [new Logo(), ...children];
    const cols = items.length;

    super({
      tag: 'header',
      classes: HEADER_CLASSES,
      children: items,
      ...rest,
    });

    this.setStyle({ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` });
  }
}
