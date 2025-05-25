import express from "express";
import {
  createProduct,
  deleteProduct,
  editProduct,
  getAllProduct,
  getProductById,
} from "../controllers/product";
import { authMiddleware } from "../middleware";
import { asyncHandler } from "../utils/asyncHandler";

const productRouter = express.Router();

productRouter.post("/add", authMiddleware, asyncHandler(createProduct));
productRouter.patch("/edit/:id", authMiddleware, asyncHandler(editProduct));
productRouter.get("/get", asyncHandler(getAllProduct));
productRouter.get("/:id", asyncHandler(getProductById));
productRouter.delete(
  "/delete/:id",
  authMiddleware,
  asyncHandler(deleteProduct)
);

export default productRouter;
