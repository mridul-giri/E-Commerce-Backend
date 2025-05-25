"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_1 = require("../controllers/user");
const middleware_1 = require("../middleware");
const asyncHandler_1 = require("../utils/asyncHandler");
const userRouter = express_1.default.Router();
userRouter.post("/users/signup", (0, asyncHandler_1.asyncHandler)(user_1.signUp));
userRouter.post("/users/signin", (0, asyncHandler_1.asyncHandler)(user_1.signIn));
userRouter.patch("/users/edit", middleware_1.authMiddleware, (0, asyncHandler_1.asyncHandler)(user_1.editUser));
userRouter.delete("/users/delete", middleware_1.authMiddleware, (0, asyncHandler_1.asyncHandler)(user_1.deleteUser));
userRouter.post("/admin/signin", (0, asyncHandler_1.asyncHandler)(user_1.adminSignin));
exports.default = userRouter;
