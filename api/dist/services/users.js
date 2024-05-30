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
const apiErrors_1 = require("../apiErrors/apiErrors");
const Users_1 = __importDefault(require("../models/Users"));
const allUsers = () => {
    return Users_1.default.find();
};
const findUserById = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const foundUserById = yield Users_1.default.findById(userId);
    if (!foundUserById)
        throw new apiErrors_1.NotFoundError('User is not found!!');
    return foundUserById;
});
const createUser = (user) => __awaiter(void 0, void 0, void 0, function* () {
    const saveUser = yield user.save();
    return saveUser;
});
const deleteUser = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const deleteFromUserDatabase = yield Users_1.default.findByIdAndDelete(userId);
    if (!deleteFromUserDatabase) {
        throw new apiErrors_1.NotFoundError('User is not found!!');
    }
    return deleteFromUserDatabase;
});
const updateUser = (userId, updateUserInfoFromBody) => __awaiter(void 0, void 0, void 0, function* () {
    const findAndUpdateUser = yield Users_1.default.findByIdAndUpdate(userId, updateUserInfoFromBody, { new: true });
    if (!findAndUpdateUser)
        throw new apiErrors_1.NotFoundError('Can not update user info!!');
    return findAndUpdateUser;
});
exports.default = {
    allUsers,
    createUser,
    deleteUser,
    findUserById,
    updateUser,
};
