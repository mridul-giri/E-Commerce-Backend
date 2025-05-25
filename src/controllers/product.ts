import { Request, Response } from "express";
import adminModel from "../models/adminModel";
import { RequestType } from "../types/requestTypes";
import productModel from "../models/productModel";
import { ExpressError } from "../utils/expressError";

export const createProduct = async (
  req: RequestType,
  res: Response
): Promise<any> => {
  const currentAdmin = await adminModel.findOne({ _id: req.userId });
  if (!currentAdmin) throw new ExpressError(404, "Admin not found");
  const {
    title,
    description,
    price,
    category,
    subCategory,
    isAvailable,
    bestSeller,
    sizes,
    // images,
  } = req.body;

  const newProduct = await productModel.create({
    title,
    description,
    price,
    category,
    subCategory,
    isAvailable,
    bestSeller,
    sizes,
    // images,
  });

  return res.status(200).json(newProduct);
};

export const getAllProduct = async (
  req: Request,
  res: Response
): Promise<any> => {
  const allProduct = await productModel.find({});
  return res.status(200).json(allProduct);
};

export const getProductById = async (
  req: Request,
  res: Response
): Promise<any> => {
  const findProductById = await productModel.findById({ _id: req.params.id });
  if (!findProductById) throw new ExpressError(404, "Product not found");
  return res.status(200).json(findProductById);
};

export const editProduct = async (
  req: RequestType,
  res: Response
): Promise<any> => {
  const currentAdmin = await adminModel.findById({ _id: req.userId });
  if (!currentAdmin) throw new ExpressError(404, "Admin not found");

  const currentProduct = await productModel.findById({
    _id: req.params.id,
  });

  if (!currentProduct) throw new ExpressError(404, "Product not found");
  const allowedFields = [
    "title",
    "description",
    "price",
    "category",
    "subCategory",
    "isAvailable",
    "bestSeller",
    "sizes",
    // "images",
  ];

  // Update product
  for (let field of allowedFields) {
    if (req.body[field]) {
      (currentProduct as any)[field] = req.body[field];
    }
    await currentProduct.save();
  }

  return res.status(200).json(currentProduct);
};

export const deleteProduct = async (
  req: RequestType,
  res: Response
): Promise<any> => {
  const currentAdmin = await adminModel.findById({ _id: req.userId });
  if (!currentAdmin) throw new ExpressError(404, "Admin not found");

  // Find proudct by id and delete it
  const currentProduct = await productModel.findByIdAndDelete({
    _id: req.params.id,
  });
  if (!currentProduct) throw new ExpressError(404, "Product not found");
  return res.status(200).json({ message: "Product deleted" });
};
