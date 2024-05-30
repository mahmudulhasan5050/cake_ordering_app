"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authMiddleware_1 = __importDefault(require("../middleware/authMiddleware"));
const adminMiddleware_1 = __importDefault(require("../middleware/adminMiddleware"));
const orders_1 = require("../controller/orders");
const router = express_1.default.Router();
router.get('/userorders/:userId', authMiddleware_1.default, orders_1.findOrdersByUserId);
router.post('/', authMiddleware_1.default, orders_1.createOrder);
router.get('/:orderId', authMiddleware_1.default, orders_1.findOrderById); // not in use
//admin
router.get('/', authMiddleware_1.default, adminMiddleware_1.default, orders_1.allOrders);
router.delete('/:orderId', authMiddleware_1.default, adminMiddleware_1.default, orders_1.deleteOrder);
router.post('/:orderId', authMiddleware_1.default, adminMiddleware_1.default, orders_1.updateOrder); //not in use
router.post('/deliverystatus/:orderId', authMiddleware_1.default, adminMiddleware_1.default, orders_1.updateDeliveryStatus);
exports.default = router;
