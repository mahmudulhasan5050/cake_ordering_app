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
exports.signIn = exports.signUp = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const auth_1 = __importDefault(require("../services/auth"));
const Users_1 = __importDefault(require("../models/Users"));
const apiErrors_1 = require("../apiErrors/apiErrors");
//signUp
const signUp = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { userName, phone, password, retypePassword } = req.body;
    try {
        const existingUser = yield Users_1.default.findOne({ phone });
        if (existingUser)
            throw new apiErrors_1.AlreadyExistError();
        if (password !== retypePassword)
            throw new apiErrors_1.BadRequestError();
        const hashedPassword = yield bcryptjs_1.default.hash(password, 12);
        const newUser = new Users_1.default({
            userName: userName,
            phone: phone,
            password: hashedPassword,
        });
        const token = yield auth_1.default.signUp(newUser);
        res.status(200).json(token);
    }
    catch (err) {
        next(new apiErrors_1.BadRequestError('Something went wrong', err));
    }
});
exports.signUp = signUp;
//signIn
const signIn = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { phone, password } = req.body;
    try {
        const existingUser = yield Users_1.default.findOne({ phone });
        if (!existingUser)
            throw new apiErrors_1.DoesNotExist();
        const isPasswordCorrect = yield bcryptjs_1.default.compare(password, existingUser.password);
        if (!isPasswordCorrect)
            throw new apiErrors_1.BadRequestError();
        const token = yield auth_1.default.signIn(existingUser);
        res.status(200).json(token);
    }
    catch (err) {
        next(new apiErrors_1.BadRequestError('Something went wrong', err));
    }
});
exports.signIn = signIn;
