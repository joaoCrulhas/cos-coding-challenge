import { IPrint } from "../interface/IPrint";
import { PrintFile } from "./PrintInFile";

const makeSut = (): {
  sut: IPrint;
} => {
  const sut = new PrintFile();
  return {
    sut,
  };
};
describe("PrintFile script", () => {
  it("Should call writeFile with correct arguments", () => {
    const { sut } = makeSut();
    sut.print("LogTest");
  });
});
