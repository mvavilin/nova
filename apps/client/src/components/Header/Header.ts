import { BaseComponent, type BaseComponentProperties } from '@ComponentsAPI';
import { Logo } from '@components';

type HeaderProperties = BaseComponentProperties;

const HEADER_CLASSES =
  'w-full max-w-7xl grid grid-cols-1 min-w-[650px]:grid-cols-[1fr_1fr_2fr] md:grid-cols-[1fr_1fr_1fr] gap-4 p-4 items-center bg-white/25 text-white rounded place-items-center';

export default class Header extends BaseComponent {
  constructor({ children = [], ...rest }: HeaderProperties) {
    super({ tag: 'header', classes: HEADER_CLASSES, children: [new Logo(), ...children], ...rest });
  }
}
