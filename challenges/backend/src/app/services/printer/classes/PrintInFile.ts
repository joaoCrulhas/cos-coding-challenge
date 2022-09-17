/* eslint-disable no-console */
import { IPrint } from "../interface/IPrint";
import { writeFile } from "fs/promises";
import { injectable } from "inversify";
import path from "path";
@injectable()
class PrintFile implements IPrint {
  private fileName: string;
  constructor() {
    this.fileName = new Date().toISOString();
  }
  public async print(executionLog: string): Promise<void> {
    const pathFile = path.join(__dirname, "..", "..", "..", "history");
    await writeFile(`${pathFile}/${this.fileName}.txt`, executionLog);
  }
}

export { PrintFile };
