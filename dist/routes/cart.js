"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cart_1 = require("../controllers/cart");
const middleware_1 = require("../middleware");
const asyncHandler_1 = require("../utils/asyncHandler");
const cartRouter = express_1.default.Router();
cartRouter
    .route("/:id")
    .post(middleware_1.authMiddleware, (0, asyncHandler_1.asyncHandler)(cart_1.addProductToCart))
    .delete(middleware_1.authMiddleware, (0, asyncHandler_1.asyncHandler)(cart_1.deleteProductFromCart));
exports.default = cartRouter;
