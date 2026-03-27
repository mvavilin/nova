import { TextComponent } from '@ComponentsAPI';
import Card from './Card';

export default class MatchHistoryCard extends Card {
  constructor() {
    super('Последние игры', [
      match('🟢 Win', '+5', 'Operative'),
      match('🔴 Lose', '+2', 'Spymaster'),
      match('🟢 Win', '+6', 'Operative'),
    ]);
  }
}

function match(result: string, score: string, role: string): TextComponent {
  return new TextComponent({
    tag: 'div',
    classes: 'flex justify-between text-sm text-gray-300',
    children: [
      new TextComponent({ tag: 'span', content: result }),
      new TextComponent({ tag: 'span', content: score }),
      new TextComponent({ tag: 'span', content: role }),
    ],
  });
}
