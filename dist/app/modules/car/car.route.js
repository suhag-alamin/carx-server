"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CarRoutes = void 0;
const express_1 = __importDefault(require("express"));
const authorization_1 = __importDefault(require("../../middlewares/authorization"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const car_controller_1 = require("./car.controller");
const user_1 = require("../../../enums/user");
const car_validation_1 = require("./car.validation");
const router = express_1.default.Router();
router.post('/', (0, authorization_1.default)(user_1.UserRoles.Admin, user_1.UserRoles.SuperAdmin), (0, validateRequest_1.default)(car_validation_1.CarValidation.createCarZodSchema), car_controller_1.CarController.createCarController);
router.get('/', car_controller_1.CarController.getAllCarsController);
router.get('/:id', car_controller_1.CarController.getSingleCarController);
router.patch('/:id', (0, authorization_1.default)(user_1.UserRoles.Admin, user_1.UserRoles.SuperAdmin), (0, validateRequest_1.default)(car_validation_1.CarValidation.updateCarZodSchema), car_controller_1.CarController.updateCarController);
router.delete('/:id', (0, authorization_1.default)(user_1.UserRoles.Admin, user_1.UserRoles.SuperAdmin), car_controller_1.CarController.deleteCarController);
exports.CarRoutes = router;
