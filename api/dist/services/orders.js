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
const Orders_1 = __importDefault(require("../models/Orders"));
const allOrders = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield Orders_1.default.find().populate('cakeId').populate('userId');
});
const findOrderById = (orderId) => __awaiter(void 0, void 0, void 0, function* () {
    const foundOrderById = yield Orders_1.default.findById(orderId);
    if (!foundOrderById)
        throw new apiErrors_1.NotFoundError('Order is not found!!');
    return foundOrderById;
});
const createOrder = (order) => __awaiter(void 0, void 0, void 0, function* () {
    const saveOrder = yield order.save();
    return saveOrder;
});
const deleteOrder = (orderId) => __awaiter(void 0, void 0, void 0, function* () {
    const deleteFromOrderDatabase = yield Orders_1.default.findByIdAndDelete(orderId);
    if (!deleteFromOrderDatabase) {
        throw new apiErrors_1.NotFoundError('Order is not found!!');
    }
    return deleteFromOrderDatabase;
});
const updateOrder = (orderId, updateOrderInfoFromBody) => __awaiter(void 0, void 0, void 0, function* () {
    const findAndUpdateOrder = yield Orders_1.default.findByIdAndUpdate(orderId, updateOrderInfoFromBody, { new: true });
    if (!findAndUpdateOrder)
        throw new apiErrors_1.NotFoundError('Can not update order info!!');
    return findAndUpdateOrder;
});
const updateDeliveryStatus = (orderId) => __awaiter(void 0, void 0, void 0, function* () {
    const findAndUpdateOrder = yield Orders_1.default.findByIdAndUpdate(orderId, [{ $set: { deliveryStatus: { $not: '$deliveryStatus' } } }], { new: true })
        .populate('cakeId')
        .populate('userId');
    if (!findAndUpdateOrder)
        throw new apiErrors_1.NotFoundError('Can not update order info!!');
    return findAndUpdateOrder;
});
const findOrderByUserId = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const foundOrderByUserId = yield Orders_1.default.find({ userId })
        .populate('userId')
        .populate('cakeId');
    if (!foundOrderByUserId)
        throw new apiErrors_1.NotFoundError('Order is not found!!');
    return foundOrderByUserId;
});
exports.default = {
    allOrders,
    createOrder,
    deleteOrder,
    findOrderById,
    updateOrder,
    updateDeliveryStatus,
    findOrderByUserId,
};
