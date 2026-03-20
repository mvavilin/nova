import { ContainerComponent, TextComponent } from '@api/ComponentsAPI';

const TABLO_CLASSES = `bg-white px-2 py-1 rounded-lg flex items-center justify-center select-none m-auto w-30`;
const DIGIT_CLASSES = `font-brand font-black text-black font-main text-3xl text-center`;

export default class Tablo extends ContainerComponent {
  private score: { left: number; right: number };
  private digits: TextComponent[] = [];

  constructor(left = 0, right = 0) {
    super({ id: 'tablo', classes: TABLO_CLASSES });
    this.score = { left, right };

    this.digits = [
      new TextComponent({ content: '0', classes: `${DIGIT_CLASSES} w-10` }),
      new TextComponent({ content: ':', classes: `${DIGIT_CLASSES} w-5` }),
      new TextComponent({ content: '0', classes: `${DIGIT_CLASSES} w-10` }),
    ];
    this.appendChildren(this.digits);
    this.updateDisplay();
  }

  private updateDisplay(): void {
    this.digits[0]?.setContent(this.score.left.toString());
    this.digits[2]?.setContent(this.score.right.toString());
  }

  public setScore(newScore: { left?: number; right?: number }): void {
    if (newScore.left !== undefined) this.score.left = newScore.left;
    if (newScore.right !== undefined) this.score.right = newScore.right;
    this.updateDisplay();
  }

  public get currentScore(): { left: number; right: number } {
    return { ...this.score };
  }
}
