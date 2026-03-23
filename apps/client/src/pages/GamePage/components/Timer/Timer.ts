import { ContainerComponent, TextComponent } from '@api/ComponentsAPI';

const TIMER_CLASSES = `bg-white px-2 py-1 rounded-lg flex items-center justify-center select-none`;
const DIGIT_CLASSES = `font-brand font-black text-black font-main text-lg w-3 text-center`;
const TIMER_INTERVAL_MS = 1000;

export default class Timer extends ContainerComponent {
  private time: number;
  private intervalId?: ReturnType<typeof setInterval>;
  private digits: TextComponent[] = [];
  private countDown: boolean;

  constructor(startTime = 0, countDown = false) {
    super({ id: 'timer', classes: TIMER_CLASSES });
    this.time = startTime;
    this.countDown = countDown;

    this.digits = [
      new TextComponent({ content: '0', classes: DIGIT_CLASSES }),
      new TextComponent({ content: '0', classes: DIGIT_CLASSES }),
      new TextComponent({ content: ':', classes: DIGIT_CLASSES }),
      new TextComponent({ content: '0', classes: DIGIT_CLASSES }),
      new TextComponent({ content: '0', classes: DIGIT_CLASSES }),
    ];
    this.appendChildren(this.digits);
    this.start();
  }

  private start(): void {
    this.intervalId = globalThis.setInterval(() => {
      if (this.countDown) {
        if (this.time > 0) this.time -= 1;
        else this.stop();
      } else {
        this.time += 1;
      }
      this.updateDisplay();
    }, TIMER_INTERVAL_MS);
  }

  public stop(): number {
    if (this.intervalId) clearInterval(this.intervalId);
    return this.time;
  }

  public reset(newTime = 0, countDown = this.countDown): void {
    this.stop();
    this.time = newTime;
    this.countDown = countDown;
    this.updateDisplay();
    this.start();
  }

  private updateDisplay(): void {
    const minutes = Math.floor(this.time / 60)
      .toString()
      .padStart(2, '0');
    const seconds = (this.time % 60).toString().padStart(2, '0');

    this.digits[0]?.setContent(minutes[0] || '0');
    this.digits[1]?.setContent(minutes[1] || '0');
    this.digits[2]?.setContent(':');
    this.digits[3]?.setContent(seconds[0] || '0');
    this.digits[4]?.setContent(seconds[1] || '0');
  }

  public get currentTime(): number {
    return this.time;
  }
}
