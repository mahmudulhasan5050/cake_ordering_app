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
exports.findOrdersByUserId = exports.updateDeliveryStatus = exports.updateOrder = exports.deleteOrder = exports.createOrder = exports.findOrderById = exports.allOrders = void 0;
const orders_1 = __importDefault(require("../services/orders"));
const Orders_1 = __importDefault(require("../models/Orders"));
const apiErrors_1 = require("../apiErrors/apiErrors");
//Find all orders info
const allOrders = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const findAllOrders = yield orders_1.default.allOrders();
        res.status(200).json(findAllOrders);
    }
    catch (err) {
        next(new apiErrors_1.BadRequestError('Invalid Request', err));
    }
});
exports.allOrders = allOrders;
//Find order by Id
const findOrderById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const orderId = req.params.orderId;
        const foundOrderById = yield orders_1.default.findOrderById(orderId);
        res.status(200).json(foundOrderById);
    }
    catch (err) {
        next(new apiErrors_1.BadRequestError('Invalid Request', err));
    }
});
exports.findOrderById = findOrderById;
//Create order
const createOrder = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId, cakeId, amount, totalPrice, deliveryDate } = req.body;
        const order = new Orders_1.default({
            userId,
            cakeId,
            amount,
            totalPrice,
            deliveryDate,
        });
        yield orders_1.default.createOrder(order);
        res.status(200).json(order);
    }
    catch (err) {
        next(new apiErrors_1.BadRequestError('Can not create order', err));
    }
});
exports.createOrder = createOrder;
//Delete a order
const deleteOrder = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const orderId = req.params.orderId;
        yield orders_1.default.deleteOrder(orderId);
        res.status(204).end();
    }
    catch (err) {
        next(new apiErrors_1.BadRequestError('Can not delete.....', err));
    }
});
exports.deleteOrder = deleteOrder;
//Update order info by Id
const updateOrder = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updateOrderInfoFromBody = req.body;
        const orderId = req.params.orderId;
        const updatedOrderInfo = yield orders_1.default.updateOrder(orderId, updateOrderInfoFromBody);
        res.json(updatedOrderInfo);
    }
    catch (err) {
        next(new apiErrors_1.BadRequestError('Can not delete.....', err));
    }
});
exports.updateOrder = updateOrder;
//update delivery status true or false
const updateDeliveryStatus = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const orderId = req.params.orderId;
        const updatedOrderInfo = yield orders_1.default.updateDeliveryStatus(orderId);
        res.json(updatedOrderInfo);
    }
    catch (err) {
        next(new apiErrors_1.BadRequestError('Can not .....', err));
    }
});
exports.updateDeliveryStatus = updateDeliveryStatus;
//Find order by userId
const findOrdersByUserId = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.params.userId;
        const foundOrderByUserId = yield orders_1.default.findOrderByUserId(userId);
        res.status(200).json(foundOrderByUserId);
    }
    catch (err) {
        next(new apiErrors_1.BadRequestError('Invalid Request', err));
    }
});
exports.findOrdersByUserId = findOrdersByUserId;
