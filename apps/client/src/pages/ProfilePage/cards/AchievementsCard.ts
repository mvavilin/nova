import { ContainerComponent } from '@ComponentsAPI';
import Card from './Card';

export default class AchievementsCard extends Card {
  constructor() {
    super('Достижения', [
      ach('🧠 10 правильных подряд'),
      ach('🎯 100 ответов'),
      ach('🏆 Первая победа'),
    ]);
  }
}

function ach(text: string): ContainerComponent {
  return new ContainerComponent({
    content: text,
    classes: 'text-sm text-gray-300',
  });
}
