import mongoose, { Types, Schema } from "mongoose";

export interface IProduct {
  title: string;
  description: string;
  sizes: string[];
  price: number;
  images: string[];
  reviews: Types.ObjectId[];
  category: string;
  subCategory: string;
  isAvailable: boolean;
  bestSeller: boolean;
}

const productCategory = ["Mens", "Womens", "Child"]; // Change it based on your category
const productSubCategory = ["Topwear", "Bottomwear", "Footwear"]; // Change it based on your sub category
const productSizes = ["XS", "S", "M", "L", "XL"];

const productSchema = new mongoose.Schema<IProduct>(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    category: {
      type: String,
      enum: productCategory,
      required: true,
    },
    subCategory: {
      type: String,
      enum: productSubCategory,
      required: true,
    },
    isAvailable: {
      type: Boolean,
      required: true,
      default: true,
    },
    bestSeller: {
      type: Boolean,
      required: true,
      default: false,
    },
    sizes: [
      {
        type: String,
        enum: productSizes,
        required: true,
      },
    ],
    images: [{ type: String, required: true }],
    reviews: [{ type: Schema.Types.ObjectId, ref: "Review" }],
  },
  { timestamps: true }
);

const productModel =
  (mongoose.models.Product as mongoose.Model<IProduct>) ||
  mongoose.model<IProduct>("Product", productSchema);

export default productModel;
