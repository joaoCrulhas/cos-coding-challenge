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
    console.debug(`[DEBUG]: ${message}`);
    if (this.enableDetailLog()) {
      console.debug(`[DEBUG]: ${params}`);
    }
  }
  error(message: string, stackTrace: string): void {
    console.error(`[ERROR]: ${message}`);
    if (this.enableDetailLog()) {
      console.error(console.log(`[ERROR-StackTrace]: ${stackTrace}`));
    }
  }

  public log(message: string): void {
    console.log(`[LOG]: ${message}`);
  }
}
