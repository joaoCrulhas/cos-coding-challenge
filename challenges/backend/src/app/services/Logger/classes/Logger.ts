import { ILogger } from "../interface/ILogger";
import { injectable } from "inversify";
import "reflect-metadata";
import env from "env-var";
@injectable()
export class Logger implements ILogger {
  public constructor() {}
  private enableDetailLog() {
    return (
      env.get("APP_ENV").default("").asString() !== "prod" ||
      env.get("APP_DEBUG").asBool()
    );
  }
  debug(message: string, params?: any): void {
    const msg = this.enableDetailLog()
      ? `[DEBUG]: ${message}, params ${params}`
      : `[DEBUG]: ${message}`;
    console.debug(`[DEBUG]: ${msg}`);
  }
  error(message: string, stackTrace: string): void {
    const msg = this.enableDetailLog()
      ? `[ERROR]: ${message}, stackTrace ${stackTrace}`
      : `[ERROR]: ${message}`;
    console.debug(`[ERROR]: ${msg}`);
  }

  public log(message: string): void {
    console.log(`[LOG]: ${message}`);
  }
}
