"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const Users_1 = __importDefault(require("../models/Users"));
const secrets_1 = require("../utils/secrets");
const signUp = (newUser) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield Users_1.default.create({
        userName: newUser.userName,
        phone: newUser.phone,
        password: newUser.password,
    });
    const token = jsonwebtoken_1.default.sign({ phone: result.phone, id: result._id }, secrets_1.secretAuth);
    const signInName = result.userName;
    const admin = result.isAdmin;
    const _id = result._id;
    return { signInName, admin, token, _id };
});
const signIn = (existingUser) => __awaiter(void 0, void 0, void 0, function* () {
    const token = jsonwebtoken_1.default.sign({ phone: existingUser.phone, id: existingUser._id }, secrets_1.secretAuth, {
        expiresIn: 86400,
    });
    const signInName = existingUser.userName;
    const admin = existingUser.isAdmin;
    const _id = existingUser._id;
    return { signInName, admin, token, _id };
});
exports.default = {
    signUp,
    signIn
};
