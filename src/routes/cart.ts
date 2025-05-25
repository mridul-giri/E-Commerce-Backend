import express from "express";
import { addProductToCart, deleteProductFromCart } from "../controllers/cart";
import { authMiddleware } from "../middleware";
import { asyncHandler } from "../utils/asyncHandler";

const cartRouter = express.Router();

cartRouter
  .route("/:id")
  .post(authMiddleware, asyncHandler(addProductToCart))
  .delete(authMiddleware, asyncHandler(deleteProductFromCart));

export default cartRouter;
