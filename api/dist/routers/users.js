"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authMiddleware_1 = __importDefault(require("../middleware/authMiddleware"));
const adminMiddleware_1 = __importDefault(require("../middleware/adminMiddleware"));
const users_1 = require("../controller/users");
const router = express_1.default.Router();
router.post('/', users_1.createUser); // not in use
router.get('/:userId', users_1.findUserById); // not in use
// admin
router.get('/', authMiddleware_1.default, adminMiddleware_1.default, users_1.allUsers);
router.delete('/:userId', authMiddleware_1.default, adminMiddleware_1.default, users_1.deleteUser);
router.post('/:userId', authMiddleware_1.default, adminMiddleware_1.default, users_1.updateUser);
exports.default = router;
