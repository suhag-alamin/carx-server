"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderRoutes = void 0;
const express_1 = __importDefault(require("express"));
const user_1 = require("../../../enums/user");
const authorization_1 = __importDefault(require("../../middlewares/authorization"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const order_controller_1 = require("./order.controller");
const order_validation_1 = require("./order.validation");
const router = express_1.default.Router();
router.post('/', (0, authorization_1.default)(user_1.UserRoles.User), (0, validateRequest_1.default)(order_validation_1.OrderValidation.createOrderZodSchema), order_controller_1.OrderController.createOrderController);
router.get('/', (0, authorization_1.default)(user_1.UserRoles.Admin, user_1.UserRoles.SuperAdmin), order_controller_1.OrderController.getAllOrdersController);
router.get('/user', (0, authorization_1.default)(user_1.UserRoles.User), order_controller_1.OrderController.getAllOrdersByUserController);
router.get('/:id', (0, authorization_1.default)(user_1.UserRoles.Admin, user_1.UserRoles.SuperAdmin, user_1.UserRoles.User), order_controller_1.OrderController.getSingleOrderController);
router.patch('/:id', (0, authorization_1.default)(user_1.UserRoles.Admin, user_1.UserRoles.SuperAdmin, user_1.UserRoles.User), (0, validateRequest_1.default)(order_validation_1.OrderValidation.updateOrderZodSchema), order_controller_1.OrderController.updateOrderController);
router.delete('/:id', (0, authorization_1.default)(user_1.UserRoles.Admin, user_1.UserRoles.SuperAdmin), order_controller_1.OrderController.deleteOrderController);
exports.OrderRoutes = router;