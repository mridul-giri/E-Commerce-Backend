import mongoose, { Schema } from "mongoose";

interface IReview {
  review: string;
  rating: number;
  product: [];
  user: [];
}

const reviewSchema = new mongoose.Schema<IReview>(
  {
    review: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
      default: 1,
    },
    product: [{ type: Schema.Types.ObjectId, ref: "Product", required: true }],
    user: [{ type: Schema.Types.ObjectId, ref: "User", required: true }],
  },
  { timestamps: true }
);

const reviewModel =
  (mongoose.models.Review as mongoose.Model<IReview>) ||
  mongoose.model<IReview>("Review", reviewSchema);

export default reviewModel;
