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
const firebase_admin_1 = require("firebase-admin");
const app_1 = require("firebase-admin/app");
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../../errors/ApiError"));
const getServiceAccount_1 = __importDefault(require("../../utils/getServiceAccount"));
const getUser_1 = __importDefault(require("../../utils/getUser"));
const serviceAccount = (0, getServiceAccount_1.default)();
(0, app_1.initializeApp)({
    credential: firebase_admin_1.credential.cert(serviceAccount),
});
const authorization = (...requireRoles) => (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
        if (!token) {
            throw new ApiError_1.default(http_status_1.default.UNAUTHORIZED, 'You are not authorized');
        }
        if (serviceAccount.private_key) {
            let verifiedUser = null;
            yield (0, firebase_admin_1.auth)()
                .verifyIdToken(token)
                .then(decodedToken => {
                verifiedUser = decodedToken;
            })
                .catch(error => {
                next(error);
            });
            if (!verifiedUser) {
                throw new ApiError_1.default(http_status_1.default.UNAUTHORIZED, 'You are not authorized');
            }
            // @ts-ignore
            const user = yield (0, getUser_1.default)(verifiedUser.email);
            if (!user) {
                throw new ApiError_1.default(http_status_1.default.UNAUTHORIZED, 'You are not authorized');
            }
            req.user = user;
            // role checking
            if ((requireRoles === null || requireRoles === void 0 ? void 0 : requireRoles.length) && !(requireRoles === null || requireRoles === void 0 ? void 0 : requireRoles.includes(user === null || user === void 0 ? void 0 : user.role))) {
                throw new ApiError_1.default(http_status_1.default.FORBIDDEN, 'Forbidden');
            }
        }
        next();
    }
    catch (err) {
        next(err);
    }
});
exports.default = authorization;
