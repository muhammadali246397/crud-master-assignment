"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserUpdatevalidationSchema = exports.orderValidationSchema = exports.UservalidationSchema = void 0;
const joi_1 = __importDefault(require("joi"));
const orderValidationSchema = joi_1.default.object().keys({
    productName: joi_1.default.string().required(),
    price: joi_1.default.number().required(),
    quantity: joi_1.default.number().required(),
});
exports.orderValidationSchema = orderValidationSchema;
const UservalidationSchema = joi_1.default.object({
    userId: joi_1.default.number().required(),
    username: joi_1.default.string().required(),
    password: joi_1.default.string().required(),
    fullName: joi_1.default.object({
        firstName: joi_1.default.string().required(),
        lastName: joi_1.default.string().required(),
    }).required(),
    age: joi_1.default.number().required(),
    email: joi_1.default.string().required(),
    isActive: joi_1.default.boolean().required(),
    hobbies: joi_1.default.array().items(joi_1.default.string()).required(),
    address: joi_1.default.object({
        street: joi_1.default.string().required(),
        city: joi_1.default.string().required(),
        country: joi_1.default.string().required(),
    }).required(),
    orders: joi_1.default.array().items(orderValidationSchema)
});
exports.UservalidationSchema = UservalidationSchema;
const UserUpdatevalidationSchema = joi_1.default.object({
    userId: joi_1.default.number().optional(),
    username: joi_1.default.string().optional(),
    password: joi_1.default.string().optional(),
    fullName: joi_1.default.object({
        firstName: joi_1.default.string().optional(),
        lastName: joi_1.default.string().optional(),
    }).required(),
    age: joi_1.default.number().optional(),
    email: joi_1.default.string().optional(),
    isActive: joi_1.default.boolean().optional(),
    hobbies: joi_1.default.array().items(joi_1.default.string()).optional(),
    address: joi_1.default.object({
        street: joi_1.default.string().optional(),
        city: joi_1.default.string().optional(),
        country: joi_1.default.string().optional(),
    }).optional(),
});
exports.UserUpdatevalidationSchema = UserUpdatevalidationSchema;
