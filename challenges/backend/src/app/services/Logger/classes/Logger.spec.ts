import { ILogger } from "../interface/ILogger";
import { Logger } from "./Logger";
import Sinon from "sinon";
const makeSut = (): {
  sut: ILogger;
} => {
  const sut = new Logger();
  return { sut };
};
describe("LoggerService", () => {
  it("Should call the console.debug() with correct message", () => {
    const spy = Sinon.spy(console, "debug");
    const { sut } = makeSut();
    const message = "test";
    sut.debug(message);
    Sinon.assert.calledOnce(spy);
    Sinon.assert.calledWith(spy, `[DEBUG]: ${message}`);
  });
  it("Should call debug with params if params is provided", () => {
    const spy = Sinon.spy(console, "debug");
    const { sut } = makeSut();
    const message = "test";
    const params = "paramsTEs";
    sut.debug(message, params);
    Sinon.assert.calledWith(spy, "[DEBUG]: test, params paramsTEs");
  });
  it("Should call error with correct arguments", () => {
    const spy = Sinon.spy(console, "error");
    const { sut } = makeSut();
    const message = "test";
    const params = "paramsTEs";
    sut.error(message, params);
    Sinon.assert.calledOnce(spy);
    Sinon.assert.calledWith(spy, "[ERROR]: test, stackTrace paramsTEs");
  });
  it("Should call error with correct arguments if stackTrace is not provided", () => {
    const spy = Sinon.spy(console, "error");
    const { sut } = makeSut();
    const message = "test";
    sut.error(message);
    Sinon.assert.calledOnce(spy);
    Sinon.assert.calledWith(spy, "[ERROR]: test");
  });

  it("Should call log with correct message", () => {
    const spy = Sinon.spy(console, "log");
    const { sut } = makeSut();
    const message = "test";
    sut.log(message);
    Sinon.assert.calledOnce(spy);
    Sinon.assert.calledWith(spy, "[LOG]: test");
  });

  it("Should call log with correct message", () => {
    process.env.APP_ENV = "prod";
    const { sut } = makeSut();
    const spy = Sinon.spy(sut, "enableDetailLog" as any);
    const message = "test";
    sut.error(message);
    Sinon.assert.calledOnce(spy);
  });

  it("Should call log table with correct arguments", () => {
    const spy = Sinon.spy(console, "table");
    const { sut } = makeSut();
    const message = ["test"];
    sut.table(message);
    Sinon.assert.calledOnce(spy);
  });
  afterEach(() => {
    Sinon.restore();
  });
});
