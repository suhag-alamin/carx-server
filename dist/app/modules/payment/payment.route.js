"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentRoutes = void 0;
const express_1 = __importDefault(require("express"));
const authorization_1 = __importDefault(require("../../middlewares/authorization"));
const user_1 = require("../../../enums/user");
const payment_controller_1 = require("./payment.controller");
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const payment_validation_1 = require("./payment.validation");
const router = express_1.default.Router();
router.post('/create-payment-intent', (0, authorization_1.default)(user_1.UserRoles.User), (0, validateRequest_1.default)(payment_validation_1.PaymentValidation.createPaymentIntentsZodSchema), payment_controller_1.PaymentController.createPaymentIntentController);
exports.PaymentRoutes = router;
