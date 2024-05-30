"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.secretAuth = exports.MongoUri = exports.Port = void 0;
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
exports.Port = process.env['PORT'];
exports.MongoUri = process.env['MONGODB_URI'];
exports.secretAuth = process.env['SECRET'];
