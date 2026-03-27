import { ContainerComponent, TextComponent } from '@ComponentsAPI';
import Card from './Card';

export default class StatsCard extends Card {
  constructor() {
    super('Статистика', [
      item('Игр сыграно', '42'),
      item('Победы', '28'),
      item('Поражения', '14'),
      item('Winrate', '68%'),
    ]);
  }
}

function item(label: string, value: string): ContainerComponent {
  return new ContainerComponent({
    tag: 'div',
    classes: 'flex justify-between text-sm text-gray-300',
    children: [
      new TextComponent({ tag: 'span', content: label }),
      new TextComponent({ tag: 'span', content: value }),
    ],
  });
}
