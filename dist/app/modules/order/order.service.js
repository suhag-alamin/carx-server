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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const mongoose_1 = __importDefault(require("mongoose"));
const config_1 = __importDefault(require("../../../config"));
const order_1 = require("../../../enums/order");
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const paginationHelpers_1 = require("../../../helpers/paginationHelpers");
const payment_model_1 = require("../payment/payment.model");
const order_mode_1 = require("./order.mode");
const createOrder = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const { payment } = data, orderData = __rest(data, ["payment"]);
    const isExist = yield payment_model_1.Payment.findOne({
        transactionId: data.payment.transactionId,
    });
    if (isExist) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Payment already exist, please try again');
    }
    const session = yield mongoose_1.default.startSession();
    try {
        session.startTransaction();
        // add to payment collection
        const savedPayment = yield payment_model_1.Payment.create([payment], { session });
        if (!savedPayment) {
            throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Failed to place order, please try again');
        }
        // add to order collection
        const order = yield order_mode_1.Order.create([
            Object.assign(Object.assign({}, orderData), { payment: savedPayment[0]._id }),
        ], { session });
        if (!order) {
            throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Failed to place order, please try again');
        }
        yield session.commitTransaction();
        session.endSession();
        return order[0];
    }
    catch (err) {
        session.abortTransaction();
        // eslint-disable-next-line no-unused-expressions
        config_1.default.env === 'development' && console.log(err);
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Failed to place order, please try again');
    }
});
const getAllOrders = (filters, paginationOptions) => __awaiter(void 0, void 0, void 0, function* () {
    const filtersData = __rest(filters, []);
    const andConditions = [];
    if (Object.keys(filtersData).length) {
        andConditions.push({
            $and: Object.entries(filtersData).map(([field, value]) => ({
                [field]: value,
            })),
        });
    }
    const { page, limit, skip, sortBy, sortOrder } = paginationHelpers_1.paginationHelpers.calculatePagination(paginationOptions);
    const sortCondition = {};
    if (sortBy && sortOrder) {
        sortCondition[sortBy] = sortOrder;
    }
    const whereConditions = andConditions.length > 0 ? { $and: andConditions } : {};
    const result = yield order_mode_1.Order.find(whereConditions)
        .sort(sortCondition)
        .skip(skip)
        .limit(limit)
        .populate('user')
        .populate('cars')
        .populate('payment');
    const total = yield order_mode_1.Order.countDocuments(whereConditions);
    return {
        meta: {
            page,
            limit,
            total,
        },
        data: result,
    };
});
const getAllOrdersByUser = (filters, paginationOptions, user) => __awaiter(void 0, void 0, void 0, function* () {
    const filtersData = __rest(filters, []);
    const andConditions = [];
    andConditions.push({
        $and: [{ user: user._id }],
    });
    if (Object.keys(filtersData).length) {
        andConditions.push({
            $and: Object.entries(filtersData).map(([field, value]) => ({
                [field]: value,
            })),
        });
    }
    const { page, limit, skip, sortBy, sortOrder } = paginationHelpers_1.paginationHelpers.calculatePagination(paginationOptions);
    const sortCondition = {};
    if (sortBy && sortOrder) {
        sortCondition[sortBy] = sortOrder;
    }
    const whereConditions = andConditions.length > 0 ? { $and: andConditions } : {};
    const result = yield order_mode_1.Order.find(whereConditions)
        .sort(sortCondition)
        .skip(skip)
        .limit(limit)
        .populate('user')
        .populate('cars')
        .populate('payment');
    const total = yield order_mode_1.Order.countDocuments(whereConditions);
    return {
        meta: {
            page,
            limit,
            total,
        },
        data: result,
    };
});
const getSingleOrder = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield order_mode_1.Order.findById(id)
        .populate('user')
        .populate('cars')
        .populate('payment');
    return result;
});
const updateOrder = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield order_mode_1.Order.findById(id);
    if (!isExist) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'Order not found');
    }
    const result = yield order_mode_1.Order.findByIdAndUpdate(id, data, { new: true });
    return result;
});
const cancelOrder = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield order_mode_1.Order.findById(id);
    if (!isExist) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'Order not found');
    }
    const result = yield order_mode_1.Order.findByIdAndUpdate(id, {
        orderDetails: Object.assign(Object.assign({}, isExist.orderDetails), { status: order_1.orderStatusEnum.cancelled }),
    }, { new: true });
    return result;
});
const deleteOrder = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield order_mode_1.Order.findByIdAndDelete(id);
    return result;
});
exports.OrderService = {
    createOrder,
    getAllOrders,
    getAllOrdersByUser,
    getSingleOrder,
    updateOrder,
    cancelOrder,
    deleteOrder,
};
