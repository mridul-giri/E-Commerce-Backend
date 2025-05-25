import mongoose from "mongoose";
import { Types, Schema } from "mongoose";

export interface ICart {
  user: Types.ObjectId;
  products: {
    product: Types.ObjectId;
    quantity: number;
  }[];
}

const cartSchema = new mongoose.Schema<ICart>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    products: [
      {
        product: {
          type: Schema.Types.ObjectId,
          ref: "Product",
        },
        quantity: {
          type: Number,
          required: true,
          default: 1,
        },
      },
    ],
  },
  { timestamps: true }
);

const cartModel =
  (mongoose.models.Cart as mongoose.Model<ICart>) ||
  mongoose.model<ICart>("Cart", cartSchema);

export default cartModel;
