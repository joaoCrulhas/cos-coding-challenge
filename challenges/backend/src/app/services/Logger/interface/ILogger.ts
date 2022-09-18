export interface ILogger {
  error(message: string, stackTrace?: string): void;
  log(message: string): void;
  debug(message: string, params?: object | string): void;
  table(message: any[]): void;
}
