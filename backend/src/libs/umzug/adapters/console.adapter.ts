import { IUmzugLoggerAdapter } from '../types';

export class ConsoleAdapter implements IUmzugLoggerAdapter {
  private readonly prefix: string = '[Migration] ';

  debug(msg: Record<string, unknown>): void {
    console.debug(this.prefix, msg);
  }

  error(msg: Record<string, unknown>): void {
    console.error(this.prefix, msg);
  }

  info(msg: Record<string, unknown>): void {
    console.info(this.prefix, msg);
  }

  warn(msg: Record<string, unknown>): void {
    console.warn(this.prefix, msg);
  }
}
