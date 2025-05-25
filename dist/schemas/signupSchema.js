"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signupSchema = void 0;
const zod_1 = __importDefault(require("zod"));
exports.signupSchema = zod_1.default.object({
    username: zod_1.default.string(),
    email: zod_1.default.string().email({ message: "Invalid email address" }),
    password: zod_1.default
        .string()
        .min(8, { message: "password must be at least 8 characters" }),
});
