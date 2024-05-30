"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const orderSchema = new mongoose_1.default.Schema({
    cakeId: { type: mongoose_1.default.Types.ObjectId, ref: 'Cakes' },
    userId: { type: mongoose_1.default.Types.ObjectId, ref: 'Users' },
    amount: {
        type: Number,
        default: 1,
    },
    totalPrice: {
        type: Number,
    },
    orderDate: {
        type: Date,
        default: new Date(),
    },
    deliveryDate: {
        type: Date
    },
    deliveryStatus: {
        type: Boolean,
        default: false,
    },
});
exports.default = mongoose_1.default.model('Orders', orderSchema);
