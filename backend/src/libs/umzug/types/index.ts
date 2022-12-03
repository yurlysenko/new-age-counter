import { LogFn } from 'umzug';

export interface IUmzugLoggerAdapter {
  info: LogFn;
  warn: LogFn;
  error: LogFn;
  debug: LogFn;
}
