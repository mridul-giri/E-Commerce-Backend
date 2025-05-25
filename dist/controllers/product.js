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
exports.deleteProduct = exports.editProduct = exports.getProductById = exports.getAllProduct = exports.createProduct = void 0;
const adminModel_1 = __importDefault(require("../models/adminModel"));
const productModel_1 = __importDefault(require("../models/productModel"));
const expressError_1 = require("../utils/expressError");
const createProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const currentAdmin = yield adminModel_1.default.findOne({ _id: req.userId });
    if (!currentAdmin)
        throw new expressError_1.ExpressError(404, "Admin not found");
    const { title, description, price, category, subCategory, isAvailable, bestSeller, sizes,
    // images,
     } = req.body;
    const newProduct = yield productModel_1.default.create({
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
});
exports.createProduct = createProduct;
const getAllProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const allProduct = yield productModel_1.default.find({});
    return res.status(200).json(allProduct);
});
exports.getAllProduct = getAllProduct;
const getProductById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const findProductById = yield productModel_1.default.findById({ _id: req.params.id });
    if (!findProductById)
        throw new expressError_1.ExpressError(404, "Product not found");
    return res.status(200).json(findProductById);
});
exports.getProductById = getProductById;
const editProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const currentAdmin = yield adminModel_1.default.findById({ _id: req.userId });
    if (!currentAdmin)
        throw new expressError_1.ExpressError(404, "Admin not found");
    const currentProduct = yield productModel_1.default.findById({
        _id: req.params.id,
    });
    if (!currentProduct)
        throw new expressError_1.ExpressError(404, "Product not found");
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
            currentProduct[field] = req.body[field];
        }
        yield currentProduct.save();
    }
    return res.status(200).json(currentProduct);
});
exports.editProduct = editProduct;
const deleteProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const currentAdmin = yield adminModel_1.default.findById({ _id: req.userId });
    if (!currentAdmin)
        throw new expressError_1.ExpressError(404, "Admin not found");
    // Find proudct by id and delete it
    const currentProduct = yield productModel_1.default.findByIdAndDelete({
        _id: req.params.id,
    });
    if (!currentProduct)
        throw new expressError_1.ExpressError(404, "Product not found");
    return res.status(200).json({ message: "Product deleted" });
});
exports.deleteProduct = deleteProduct;
