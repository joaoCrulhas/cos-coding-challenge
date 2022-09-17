export interface IPrint {
  print(executionLog: string): Promise<void>;
}
