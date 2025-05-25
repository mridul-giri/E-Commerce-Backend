import { Request, Response } from "express";
import userModel from "../models/userModel";
import { RequestType } from "../types/requestTypes";
import cartModel from "../models/cartModel";
import { Types } from "mongoose";
import { ExpressError } from "../utils/expressError";
import productModel from "../models/productModel";

export const addProductToCart = async (
  req: RequestType,
  res: Response
): Promise<any> => {
  const currentUser = await userModel.findById(req.userId);
  if (!currentUser) throw new ExpressError(404, "You are not logged in");

  const findCurrentUserCart = await cartModel.findOne({ user: req.userId });

  const findProductById = await productModel.findById(req.params.id);
  if (!findProductById) throw new ExpressError(404, "Product not found");

  if (!findCurrentUserCart) {
    // No cart exists yet, create one
    const newCart = await cartModel.create({
      user: currentUser._id,
      products: [{ product: req.params.id, quantity: req.body.quantity }],
    });
    return res.status(200).json(newCart);
  }

  // Cart exists – check if product exists
  const existingProduct = findCurrentUserCart.products.find((p) => {
    return p.product.toString() == req.params.id;
  });

  // Increase quantity - if product exists
  if (existingProduct) {
    existingProduct.quantity += req.body.quantity;
  } else {
    // Push new product - if product not exists
    const newProduct = {
      product: new Types.ObjectId(req.params.id),
      quantity: req.body.quantity,
    };
    findCurrentUserCart.products.push(newProduct);
  }

  await findCurrentUserCart.save();
  return res.status(200).json(findCurrentUserCart);
};

export const deleteProductFromCart = async (
  req: RequestType,
  res: Response
): Promise<any> => {
  const currentUser = await userModel.findById(req.userId);
  if (!currentUser) throw new ExpressError(404, "You are not logged in");

  const findCurrentUserCart = await cartModel.findOne({ user: req.userId });

  if (!findCurrentUserCart)
    throw new ExpressError(404, "Cart not found for this user");

  const updatedProduct = findCurrentUserCart.products.filter((p) => {
    return p.product.toString() != req.params.id;
  });

  // If the product wasn't found (length didn't change)
  if (updatedProduct.length === findCurrentUserCart.products.length) {
    throw new ExpressError(404, "Product not found in cart");
  }

  findCurrentUserCart.products = updatedProduct;
  await findCurrentUserCart.save();

  return res.status(200).json({
    message: "Product deleted",
  });
};
