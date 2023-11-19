import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { paginationFields } from '../../../constants/pagination';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { ReviewService } from './review.service';
import { IReview } from './review.interface';

const createReviewController = catchAsync(
  async (req: Request, res: Response) => {
    const user = req.user;
    const result = await ReviewService.createReview(user, req.body);

    sendResponse<IReview>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Thanks for your review.',
      data: result,
    });
  },
);

const getAllReviewsController = catchAsync(
  async (req: Request, res: Response) => {
    const paginationOptions = pick(req.query, paginationFields);

    const result = await ReviewService.getAllReviews(paginationOptions);

    sendResponse<IReview[]>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Reviews retrieved successfully',
      meta: result.meta,
      data: result.data,
    });
  },
);

const getSingleReviewController = catchAsync(
  async (req: Request, res: Response) => {
    const result = await ReviewService.getSingleReview(req.params.id);

    sendResponse<IReview>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Review retrieved successfully',
      data: result,
    });
  },
);

const updateReviewController = catchAsync(
  async (req: Request, res: Response) => {
    const result = await ReviewService.updateReview(req.params.id, req.body);

    sendResponse<IReview>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Review updated successfully',
      data: result,
    });
  },
);

const deleteReviewController = catchAsync(
  async (req: Request, res: Response) => {
    const result = await ReviewService.deleteReview(req.params.id);

    sendResponse<IReview | null>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Review deleted successfully',
      data: result,
    });
  },
);

export const ReviewController = {
  createReviewController,
  getAllReviewsController,
  getSingleReviewController,
  updateReviewController,
  deleteReviewController,
};
