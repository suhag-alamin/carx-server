"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReviewService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const paginationHelpers_1 = require("../../../helpers/paginationHelpers");
const review_mode_1 = require("./review.mode");
const createReview = (user, data) => __awaiter(void 0, void 0, void 0, function* () {
    if (!user._id) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, `User not found`);
    }
    data.user = user === null || user === void 0 ? void 0 : user._id;
    const result = yield review_mode_1.Review.create(data);
    return result;
});
const getAllReviews = (paginationOptions) => __awaiter(void 0, void 0, void 0, function* () {
    const { page, limit, skip, sortBy, sortOrder } = paginationHelpers_1.paginationHelpers.calculatePagination(paginationOptions);
    const sortCondition = {};
    if (sortBy && sortOrder) {
        sortCondition[sortBy] = sortOrder;
    }
    const result = yield review_mode_1.Review.find()
        .sort(sortCondition)
        .skip(skip)
        .limit(limit)
        .populate('user');
    const total = yield review_mode_1.Review.countDocuments();
    return {
        meta: {
            page,
            limit,
            total,
        },
        data: result,
    };
});
const getSingleReview = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield review_mode_1.Review.findById(id).populate('user');
    return result;
});
const updateReview = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield review_mode_1.Review.findById(id);
    if (!isExist) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'Review not found');
    }
    const result = yield review_mode_1.Review.findByIdAndUpdate(id, data, { new: true });
    return result;
});
const deleteReview = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield review_mode_1.Review.findByIdAndDelete(id);
    return result;
});
exports.ReviewService = {
    createReview,
    getAllReviews,
    getSingleReview,
    updateReview,
    deleteReview,
};
