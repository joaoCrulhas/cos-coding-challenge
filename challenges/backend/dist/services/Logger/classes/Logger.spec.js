"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Logger_1 = require("./Logger");
const sinon_1 = __importDefault(require("sinon"));
const makeSut = () => {
    const sut = new Logger_1.Logger();
    return { sut };
};
describe("LoggerService", () => {
    it("Should call the console.debug() with correct message", () => {
        const spy = sinon_1.default.spy(console, "debug");
        const { sut } = makeSut();
        const message = "test";
        sut.debug(message);
        sinon_1.default.assert.calledOnce(spy);
        sinon_1.default.assert.calledWith(spy, `[DEBUG]: ${message}`);
    });
    it("Should call debug with params if params is provided", () => {
        const spy = sinon_1.default.spy(console, "debug");
        const { sut } = makeSut();
        const message = "test";
        const params = "paramsTEs";
        sut.debug(message, params);
        sinon_1.default.assert.calledWith(spy, "[DEBUG]: test, params paramsTEs");
    });
    it("Should call error with correct arguments", () => {
        const spy = sinon_1.default.spy(console, "error");
        const { sut } = makeSut();
        const message = "test";
        const params = "paramsTEs";
        sut.error(message, params);
        sinon_1.default.assert.calledOnce(spy);
        sinon_1.default.assert.calledWith(spy, "[ERROR]: test, stackTrace paramsTEs");
    });
    it("Should call error with correct arguments if stackTrace is not provided", () => {
        const spy = sinon_1.default.spy(console, "error");
        const { sut } = makeSut();
        const message = "test";
        sut.error(message);
        sinon_1.default.assert.calledOnce(spy);
        sinon_1.default.assert.calledWith(spy, "[ERROR]: test");
    });
    it("Should call log with correct message", () => {
        const spy = sinon_1.default.spy(console, "log");
        const { sut } = makeSut();
        const message = "test";
        sut.log(message);
        sinon_1.default.assert.calledOnce(spy);
        sinon_1.default.assert.calledWith(spy, "[LOG]: test");
    });
    it("Should call log with correct message", () => {
        process.env.APP_ENV = "prod";
        const { sut } = makeSut();
        const spy = sinon_1.default.spy(sut, "enableDetailLog");
        const message = "test";
        sut.error(message);
        sinon_1.default.assert.calledOnce(spy);
    });
    it("Should call log table with correct arguments", () => {
        const spy = sinon_1.default.spy(console, "table");
        const { sut } = makeSut();
        const message = ["test"];
        sut.table(message);
        sinon_1.default.assert.calledOnce(spy);
    });
    afterEach(() => {
        sinon_1.default.restore();
    });
});
