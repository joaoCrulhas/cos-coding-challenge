export interface ILogger {
  error(message: string, stackTrace?: string): void;
  log(message: string): void;
  debug(message: string, params?: any): void;
}
