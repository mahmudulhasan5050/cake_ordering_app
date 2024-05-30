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
const adminCheck = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.tokenData;
    const checkUserAdmin = yield Users_1.default.findById(user.id);
    if (checkUserAdmin === null || checkUserAdmin === void 0 ? void 0 : checkUserAdmin.isAdmin) {
        next();
    }
    else {
        throw new apiErrors_1.ForbiddenError();
    }
});
exports.default = adminCheck;
