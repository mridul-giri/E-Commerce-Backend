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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProductFromCart = exports.addProductToCart = void 0;
const userModel_1 = __importDefault(require("../models/userModel"));
const cartModel_1 = __importDefault(require("../models/cartModel"));
const mongoose_1 = require("mongoose");
const expressError_1 = require("../utils/expressError");
const productModel_1 = __importDefault(require("../models/productModel"));
const addProductToCart = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const currentUser = yield userModel_1.default.findById(req.userId);
    if (!currentUser)
        throw new expressError_1.ExpressError(404, "You are not logged in");
    const findCurrentUserCart = yield cartModel_1.default.findOne({ user: req.userId });
    const findProductById = yield productModel_1.default.findById(req.params.id);
    if (!findProductById)
        throw new expressError_1.ExpressError(404, "Product not found");
    if (!findCurrentUserCart) {
        // No cart exists yet, create one
        const newCart = yield cartModel_1.default.create({
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
    }
    else {
        // Push new product - if product not exists
        const newProduct = {
            product: new mongoose_1.Types.ObjectId(req.params.id),
            quantity: req.body.quantity,
        };
        findCurrentUserCart.products.push(newProduct);
    }
    yield findCurrentUserCart.save();
    return res.status(200).json(findCurrentUserCart);
});
exports.addProductToCart = addProductToCart;
const deleteProductFromCart = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const currentUser = yield userModel_1.default.findById(req.userId);
    if (!currentUser)
        throw new expressError_1.ExpressError(404, "You are not logged in");
    const findCurrentUserCart = yield cartModel_1.default.findOne({ user: req.userId });
    if (!findCurrentUserCart)
        throw new expressError_1.ExpressError(404, "Cart not found for this user");
    const updatedProduct = findCurrentUserCart.products.filter((p) => {
        return p.product.toString() != req.params.id;
    });
    // If the product wasn't found (length didn't change)
    if (updatedProduct.length === findCurrentUserCart.products.length) {
        throw new expressError_1.ExpressError(404, "Product not found in cart");
    }
    findCurrentUserCart.products = updatedProduct;
    yield findCurrentUserCart.save();
    return res.status(200).json({
        message: "Product deleted",
    });
});
exports.deleteProductFromCart = deleteProductFromCart;
