"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const product_1 = require("../controllers/product");
const middleware_1 = require("../middleware");
const asyncHandler_1 = require("../utils/asyncHandler");
const productRouter = express_1.default.Router();
productRouter.post("/add", middleware_1.authMiddleware, (0, asyncHandler_1.asyncHandler)(product_1.createProduct));
productRouter.patch("/edit/:id", middleware_1.authMiddleware, (0, asyncHandler_1.asyncHandler)(product_1.editProduct));
productRouter.get("/get", (0, asyncHandler_1.asyncHandler)(product_1.getAllProduct));
productRouter.get("/:id", (0, asyncHandler_1.asyncHandler)(product_1.getProductById));
productRouter.delete("/delete/:id", middleware_1.authMiddleware, (0, asyncHandler_1.asyncHandler)(product_1.deleteProduct));
exports.default = productRouter;
