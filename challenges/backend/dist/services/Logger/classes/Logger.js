"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Logger = void 0;
const inversify_1 = require("inversify");
require("reflect-metadata");
const env_var_1 = __importDefault(require("env-var"));
let Logger = class Logger {
    table(message) {
        console.table(message);
    }
    debug(message, params) {
        const msg = this.enableDetailLog() && params
            ? `[DEBUG]: ${message}, params ${params}`
            : `[DEBUG]: ${message}`;
        console.debug(`${msg}`);
    }
    error(message, stackTrace) {
        const msg = this.enableDetailLog() && stackTrace
            ? `[ERROR]: ${message}, stackTrace ${stackTrace}`
            : `[ERROR]: ${message}`;
        console.error(`${msg}`);
    }
    log(message) {
        console.log(`[LOG]: ${message}`);
    }
    enableDetailLog() {
        return (env_var_1.default.get("APP_ENV").default("").asString() !== "prod" ||
            env_var_1.default.get("APP_DEBUG").asBool());
    }
};
Logger = __decorate([
    inversify_1.injectable()
], Logger);
exports.Logger = Logger;
