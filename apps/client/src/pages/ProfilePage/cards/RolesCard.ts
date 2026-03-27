import { ContainerComponent } from '@ComponentsAPI';
import Card from './Card';

export default class RolesCard extends Card {
  constructor() {
    super('Роли', [
      role('👑 Spymaster', ['Winrate: 55%']),
      role('🕵️ Operative', ['Correct: 124', 'Accuracy: 72%']),
    ]);
  }
}

function role(title: string, stats: string[]): ContainerComponent {
  return new ContainerComponent({
    tag: 'div',
    classes: 'mb-3',
    children: [
      new ContainerComponent({
        tag: 'div',
        content: title,
        classes: 'font-medium',
      }),
      ...stats.map(
        (s) =>
          new ContainerComponent({
            tag: 'div',
            content: s,
            classes: 'text-sm text-gray-300',
          })
      ),
    ],
  });
}
