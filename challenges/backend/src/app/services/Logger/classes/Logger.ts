/* eslint-disable no-console */
import { ILogger } from "../interface/ILogger";
import { injectable } from "inversify";
import "reflect-metadata";
import env from "env-var";
@injectable()
export class Logger implements ILogger {
  public table(message: any[]): void {
    console.table(message);
  }
  public debug(message: string, params?: any): void {
    const msg =
      this.enableDetailLog() && params
        ? `[DEBUG]: ${message}, params ${params}`
        : `[DEBUG]: ${message}`;
    console.debug(`${msg}`);
  }
  public error(message: string, stackTrace: string): void {
    const msg =
      this.enableDetailLog() && stackTrace
        ? `[ERROR]: ${message}, stackTrace ${stackTrace}`
        : `[ERROR]: ${message}`;
    console.error(`${msg}`);
  }

  public log(message: string): void {
    console.log(`[LOG]: ${message}`);
  }

  private enableDetailLog() {
    return (
      env.get("APP_ENV").default("").asString() !== "prod" ||
      env.get("APP_DEBUG").asBool()
    );
  }
}
