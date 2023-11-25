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
exports.CarService = void 0;
const paginationHelpers_1 = require("../../../helpers/paginationHelpers");
const car_constant_1 = require("./car.constant");
const car_mode_1 = require("./car.mode");
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const http_status_1 = __importDefault(require("http-status"));
const createCar = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield car_mode_1.Car.create(data);
    return result;
});
const getAllCars = (filters, paginationOptions) => __awaiter(void 0, void 0, void 0, function* () {
    const { query, minPrice, maxPrice } = filters, filtersData = __rest(filters, ["query", "minPrice", "maxPrice"]);
    const andConditions = [];
    if (query) {
        andConditions.push({
            $or: car_constant_1.carSearchableFields.map(field => ({
                [field]: {
                    $regex: query,
                    $options: 'i',
                },
            })),
        });
    }
    if (minPrice && maxPrice) {
        andConditions.push({
            price: {
                $gte: minPrice,
                $lte: maxPrice,
            },
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
    const result = yield car_mode_1.Car.find(whereConditions)
        .sort(sortCondition)
        .skip(skip)
        .limit(limit);
    const total = yield car_mode_1.Car.countDocuments(whereConditions);
    return {
        meta: {
            page,
            limit,
            total,
        },
        data: result,
    };
});
const getSingleCar = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield car_mode_1.Car.findById(id);
    return result;
});
const updateCar = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield car_mode_1.Car.findById(id);
    if (!isExist) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'Car not found');
    }
    const result = yield car_mode_1.Car.findByIdAndUpdate(id, data, { new: true });
    return result;
});
const deleteCar = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield car_mode_1.Car.findByIdAndDelete(id);
    return result;
});
exports.CarService = {
    createCar,
    getAllCars,
    getSingleCar,
    updateCar,
    deleteCar,
};
