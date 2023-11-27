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
exports.UserService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const paginationHelpers_1 = require("../../../helpers/paginationHelpers");
const user_constant_1 = require("./user.constant");
const user_model_1 = require("./user.model");
const user_1 = require("../../../enums/user");
const saveUser = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const user = new user_model_1.User();
    const isUserExist = yield user.isUserExist(data.email);
    if (!isUserExist.isExist) {
        const result = yield user_model_1.User.create(Object.assign(Object.assign({}, data), { role: (data === null || data === void 0 ? void 0 : data.role) || user_1.UserRoles.User }));
        return result;
    }
    return null;
    // if (isUserExist.isExist) {
    //   const result = await User.findByIdAndUpdate(
    //     isUserExist?.user._id,
    //     {
    //       role: data?.role || UserRoles.User,
    //     },
    //     {
    //       new: true,
    //     },
    //   );
    //   return result;
    // }
    // return null;
    // else {
    //   const result = await User.create({
    //     ...data,
    //     role: data?.role || UserRoles.User,
    //   });
    //   return result;
    // }
});
const getAllUsers = (filters, paginationOptions) => __awaiter(void 0, void 0, void 0, function* () {
    const { query } = filters, filtersData = __rest(filters, ["query"]);
    const andConditions = [];
    if (query) {
        andConditions.push({
            $or: user_constant_1.userSearchableFields.map(field => ({
                [field]: {
                    $regex: query,
                    $options: 'i',
                },
            })),
        });
    }
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
    const result = yield user_model_1.User.find(whereConditions)
        .sort(sortCondition)
        .skip(skip)
        .limit(limit);
    const total = yield user_model_1.User.countDocuments(whereConditions);
    return {
        meta: {
            page,
            limit,
            total,
        },
        data: result,
    };
});
const getUserDetails = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const user = new user_model_1.User();
    const isUserExist = yield user.isUserExist(email);
    if (!isUserExist.isExist) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'User not found');
    }
    return isUserExist.user;
});
const makeAdmin = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const user = new user_model_1.User();
    const isUserExist = yield user.isUserExist(data.email);
    if (!isUserExist.isExist) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'User not found');
    }
    const result = yield user_model_1.User.findByIdAndUpdate(isUserExist.user._id, {
        role: user_1.UserRoles.Admin,
    }, {
        new: true,
    });
    return result;
});
exports.UserService = {
    saveUser,
    getAllUsers,
    getUserDetails,
    makeAdmin,
};
