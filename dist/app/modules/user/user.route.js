"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRoutes = void 0;
const express_1 = __importDefault(require("express"));
const user_1 = require("../../../enums/user");
const authorization_1 = __importDefault(require("../../middlewares/authorization"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const user_controller_1 = require("./user.controller");
const user_validation_1 = require("./user.validation");
const router = express_1.default.Router();
router.post('/', (0, validateRequest_1.default)(user_validation_1.UserValidation.saveUserZodSchema), user_controller_1.UserController.saveUserController);
router.patch('/make-admin', (0, authorization_1.default)(user_1.UserRoles.Admin, user_1.UserRoles.SuperAdmin), user_controller_1.UserController.makeAdminController);
router.get('/', (0, authorization_1.default)(user_1.UserRoles.Admin, user_1.UserRoles.SuperAdmin), user_controller_1.UserController.getAllUsersController);
exports.UserRoutes = router;
