import { VALUE_OF_KEY_FOR_SHOW_LOG, type LogEmit, type LogOn } from '../../types/types.ts';
import colors from 'colors';

export class Logger {
  private isShow: boolean;

  constructor() {
    this.isShow = (process.env.SHOW_LOG || '') === VALUE_OF_KEY_FOR_SHOW_LOG;
  }

  public emit<T extends keyof LogEmit>(recipient: string, event: T, payload?: LogEmit[T]): void {
    if (this.isShow) {
      if (event === 'error') {
        console.log(colors.red(event), colors.green('TO:'), recipient);
      } else {
        console.log(colors.yellow(event), colors.green('TO:'), recipient);
      }
      if (payload) {
        console.log('payload:', payload);
      }
    }
  }

  public on<T extends keyof LogOn>(userId: string, event: T, payload?: LogOn[T]): void {
    if (this.isShow) {
      console.log(colors.magenta(event), colors.green('FROM:'), userId);
      if (payload) {
        console.log('payload:', payload);
      }
    }
  }

  public info(...messages: string[]): void {
    if (this.isShow) {
      console.log(...messages.map((message) => colors.blue(message)));
    }
  }
}

export const logger = new Logger();
