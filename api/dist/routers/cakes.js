"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authMiddleware_1 = __importDefault(require("../middleware/authMiddleware"));
const adminMiddleware_1 = __importDefault(require("../middleware/adminMiddleware"));
const cakes_1 = require("../controller/cakes");
const router = express_1.default.Router();
// without login
router.get('/', cakes_1.allCakes);
// login required
router.get('/:cakeId', authMiddleware_1.default, cakes_1.findCakeById);
// for Admin
router.delete('/:cakeId', authMiddleware_1.default, adminMiddleware_1.default, cakes_1.deleteCake);
router.post('/', authMiddleware_1.default, adminMiddleware_1.default, cakes_1.createCake);
router.post('/:cakeId', authMiddleware_1.default, adminMiddleware_1.default, cakes_1.updateCake);
exports.default = router;
