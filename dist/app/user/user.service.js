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
Object.defineProperty(exports, "__esModule", { value: true });
exports.userService = void 0;
const user_model_1 = require("./user.model");
const createUserIntoDB = (user) => __awaiter(void 0, void 0, void 0, function* () {
    const newUser = yield user_model_1.userModel.create(user);
    return newUser;
});
const getAllUsersFromDb = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.userModel.find().select({
        _id: 0,
        username: 1,
        fullName: 1,
        age: 1,
        email: 1,
        address: 1,
    });
    return result;
});
const getSpecipicUser = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const specificUser = yield user_model_1.userModel.findOne({ userId });
    return specificUser;
});
const updateSingleUser = (userId, userData) => __awaiter(void 0, void 0, void 0, function* () {
    const updatedUser = yield user_model_1.userModel.findOneAndUpdate({ userId }, userData, {
        new: true,
        fields: '-password',
    });
    return updatedUser;
});
const deleteSpecipicUser = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const specificUser = yield user_model_1.userModel.deleteOne({ userId });
    return specificUser;
});
const createOrder = (userId, orderInformation) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(orderInformation);
    const orders = yield user_model_1.userModel.findOneAndUpdate({ userId }, { $push: { orders: orderInformation } });
    return orders;
});
const getAllOrder = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.userModel.findOne({ userId }).select({
        _id: 0,
    });
    return result;
});
exports.userService = {
    createUserIntoDB,
    getAllUsersFromDb,
    getSpecipicUser,
    updateSingleUser,
    deleteSpecipicUser,
    createOrder,
    getAllOrder,
};
