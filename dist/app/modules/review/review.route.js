"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReviewRoutes = void 0;
const express_1 = __importDefault(require("express"));
const authorization_1 = __importDefault(require("../../middlewares/authorization"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const review_controller_1 = require("./review.controller");
const user_1 = require("../../../enums/user");
const review_validation_1 = require("./review.validation");
const router = express_1.default.Router();
router.post('/', (0, authorization_1.default)(user_1.UserRoles.User), (0, validateRequest_1.default)(review_validation_1.ReviewValidation.createReviewZodSchema), review_controller_1.ReviewController.createReviewController);
router.get('/', review_controller_1.ReviewController.getAllReviewsController);
router.get('/:id', review_controller_1.ReviewController.getSingleReviewController);
router.patch('/:id', 
// authentication(UserRoles.Admin, UserRoles.SuperAdmin, UserRoles.User),
(0, validateRequest_1.default)(review_validation_1.ReviewValidation.updateReviewZodSchema), review_controller_1.ReviewController.updateReviewController);
router.delete('/:id', 
// authentication(UserRoles.Admin, UserRoles.SuperAdmin),
review_controller_1.ReviewController.deleteReviewController);
exports.ReviewRoutes = router;
