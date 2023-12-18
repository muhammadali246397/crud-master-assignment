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
exports.userContoller = void 0;
const user_service_1 = require("./user.service");
const user_validator_1 = require("./user.validator");
const user_model_1 = require("./user.model");
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = req.body;
        const { error } = user_validator_1.UservalidationSchema.validate(user);
        const result = yield user_service_1.userService.createUserIntoDB(user);
        if (error) {
            return res.status(500).json({
                success: false,
                message: 'joi validation error',
                error,
            });
        }
        res.status(200).json({
            success: true,
            message: 'User created successfully!',
            data: result,
        });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: 'something is worng',
            error: err,
        });
    }
});
const getAllUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield user_service_1.userService.getAllUsersFromDb();
        res.status(200).json({
            success: true,
            message: 'Users fetched successfully!',
            data: result,
        });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: 'user not found!',
            error: err,
        });
    }
});
const getSpecificUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.params;
        const UserId = parseInt(userId);
        const getOneUser = yield user_service_1.userService.getSpecipicUser(UserId);
        if (!getOneUser) {
            return res.status(404).json({
                success: false,
                message: 'User not found!',
                error: {
                    code: 404,
                    description: 'user not found',
                },
            });
        }
        res.status(200).json({
            success: true,
            message: 'User fetched successfully!',
            data: getOneUser,
        });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: 'user not found',
            error: err,
        });
    }
});
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userData = req.body;
        const { error } = user_validator_1.UserUpdatevalidationSchema.validate(userData);
        if (error) {
            return res.status(500).json({
                success: false,
                message: 'joi validation error',
                error,
            });
        }
        const { userId } = req.params;
        const Id = parseInt(userId);
        const user = yield user_model_1.userModel.findOne({ userId });
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found!',
                error: {
                    code: 404,
                    description: 'user not found',
                },
            });
        }
        const result = yield user_service_1.userService.updateSingleUser(Id, userData);
        res.status(200).json({
            success: true,
            message: 'User updated successfully!',
            data: result,
        });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: 'something went worng',
            error: err,
        });
    }
});
const deleteSingleUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = parseInt(req.params.userId);
        const user = yield user_model_1.userModel.findOne({ userId });
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found!',
                error: {
                    code: 404,
                    description: 'user not found',
                },
            });
        }
        const deleteUser = yield user_service_1.userService.deleteSpecipicUser(userId);
        res.status(200).json({
            success: true,
            message: 'User deleted successfully!',
            data: null,
        });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: 'something went worng',
            error: err,
        });
    }
});
const createAOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = parseInt(req.params.userId);
        const orderInformation = req.body;
        const { error } = user_validator_1.orderValidationSchema.validate(orderInformation);
        if (error) {
            return res.status(500).json({
                success: false,
                message: 'joi validation error',
                error,
            });
        }
        const user = yield user_service_1.userService.getSpecipicUser(userId);
        if (!user)
            return res.status(404).json({
                success: false,
                message: 'User not found',
                error: {
                    code: 404,
                    description: 'User not found!',
                },
            });
        yield user_service_1.userService.createOrder(userId, orderInformation);
        res.status(201).json({
            success: true,
            message: 'Order created successfully!',
            data: null,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'Something went wrong!',
            error: error,
        });
    }
});
const getOrders = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = parseInt(req.params.userId);
        const user = yield user_model_1.userModel.findOne({ userId });
        if (!user)
            return res.status(404).json({
                success: false,
                message: 'User not found',
                error: {
                    code: 404,
                    description: 'User not found!',
                },
            });
        const result = yield user_service_1.userService.getAllOrder(userId);
        res.status(200).json({
            success: true,
            message: 'Order fetched successfully!',
            data: {
                orders: user.orders || []
            },
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'Something went wrong!',
            error: error,
        });
    }
});
exports.userContoller = {
    createUser,
    getAllUser,
    getSpecificUser,
    updateUser,
    deleteSingleUser,
    createAOrder,
    getOrders,
};
