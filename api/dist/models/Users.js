"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const userSchema = new mongoose_1.default.Schema({
    userName: {
        type: String,
        required: true,
        index: true,
    },
    phone: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        reqired: true
    },
    isAdmin: {
        type: Boolean,
        default: false
    }
});
exports.default = mongoose_1.default.model('Users', userSchema);
