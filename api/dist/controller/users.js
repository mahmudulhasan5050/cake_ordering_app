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
exports.updateUser = exports.deleteUser = exports.createUser = exports.findUserById = exports.allUsers = void 0;
const users_1 = __importDefault(require("../services/users"));
const Users_1 = __importDefault(require("../models/Users"));
const apiErrors_1 = require("../apiErrors/apiErrors");
//Find all user info
const allUsers = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const findAllUsers = yield users_1.default.allUsers();
        res.status(200).json(findAllUsers);
    }
    catch (err) {
        next(new apiErrors_1.BadRequestError('Invalid Request', err));
    }
});
exports.allUsers = allUsers;
//Find user by Id
const findUserById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.params.userId;
        const foundUserById = yield users_1.default.findUserById(userId);
        res.status(200).json(foundUserById);
    }
    catch (err) {
        next(new apiErrors_1.BadRequestError('Invalid Request', err));
    }
});
exports.findUserById = findUserById;
//Create user
const createUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userName, phone } = req.body;
        const existingUser = yield Users_1.default.findOne({ phone });
        if (existingUser)
            throw new apiErrors_1.AlreadyExistError();
        const user = new Users_1.default({
            userName,
            phone,
        });
        yield users_1.default.createUser(user);
        res.status(200).json(user);
    }
    catch (err) {
        next(new apiErrors_1.BadRequestError('Can not create user', err));
    }
});
exports.createUser = createUser;
//Delete a user
const deleteUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.params.userId;
        yield users_1.default.deleteUser(userId);
        res.status(204).end();
    }
    catch (err) {
        next(new apiErrors_1.BadRequestError('Can not delete user.....', err));
    }
});
exports.deleteUser = deleteUser;
//Update user info by Id
const updateUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updateUserInfoFromBody = req.body;
        const userId = req.params.userId;
        const updatedUserInfo = yield users_1.default.updateUser(userId, updateUserInfoFromBody);
        res.json(updatedUserInfo);
    }
    catch (err) {
        next(new apiErrors_1.BadRequestError('Can not delete user.....', err));
    }
});
exports.updateUser = updateUser;
