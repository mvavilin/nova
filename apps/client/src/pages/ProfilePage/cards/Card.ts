import { ContainerComponent, HeadingComponent, TextComponent } from '@ComponentsAPI';

export default class Card extends ContainerComponent {
  constructor(title: string, children: ContainerComponent[] | TextComponent[]) {
    super({
      classes: `bg-white/25 backdrop-blur border border-white/20 text-white rounded p-4`,
      children: [
        new HeadingComponent({
          level: 2,
          content: title,
          classes: 'text-lg font-semibold mb-3',
        }),
        ...children,
      ],
    });
  }
}
