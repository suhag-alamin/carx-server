"use strict";
/* eslint-disable no-unused-vars */
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderStatusEnum = void 0;
var orderStatusEnum;
(function (orderStatusEnum) {
    orderStatusEnum["pending"] = "pending";
    orderStatusEnum["shipped"] = "shipped";
    orderStatusEnum["delivered"] = "delivered";
    orderStatusEnum["cancelled"] = "cancelled";
})(orderStatusEnum || (exports.orderStatusEnum = orderStatusEnum = {}));
