"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const mongoose_2 = require("mongoose");
const cartSchema = new mongoose_1.default.Schema({
    user: {
        type: mongoose_2.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    products: [
        {
            product: {
                type: mongoose_2.Schema.Types.ObjectId,
                ref: "Product",
            },
            quantity: {
                type: Number,
                required: true,
                default: 1,
            },
        },
    ],
}, { timestamps: true });
const cartModel = mongoose_1.default.models.Cart ||
    mongoose_1.default.model("Cart", cartSchema);
exports.default = cartModel;
