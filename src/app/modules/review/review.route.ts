import express from 'express';
import authentication from '../../middlewares/authorization';
import validateRequest from '../../middlewares/validateRequest';
import { ReviewController } from './review.controller';
import { UserRoles } from '../../../enums/user';
import { ReviewValidation } from './review.validation';

const router = express.Router();

router.post(
  '/',
  authentication(UserRoles.User),
  validateRequest(ReviewValidation.createReviewZodSchema),
  ReviewController.createReviewController,
);

router.get('/', ReviewController.getAllReviewsController);
router.get('/:id', ReviewController.getSingleReviewController);

router.patch(
  '/:id',
  authentication(UserRoles.Admin, UserRoles.SuperAdmin, UserRoles.User),
  validateRequest(ReviewValidation.updateReviewZodSchema),
  ReviewController.updateReviewController,
);

router.delete(
  '/:id',
  authentication(UserRoles.Admin, UserRoles.SuperAdmin),
  ReviewController.deleteReviewController,
);

export const ReviewRoutes = router;
