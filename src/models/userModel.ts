import mongoose from "mongoose";

export interface IUser {
  username: string;
  email: string;
  password: string;
}

const userSchema = new mongoose.Schema<IUser>(
  {
    username: { type: String, trim: true, required: true },
    email: { type: String, unique: true, match: /.+\@.+\..+/, required: true },
    password: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const userModel =
  (mongoose.models.User as mongoose.Model<IUser>) ||
  mongoose.model<IUser>("User", userSchema);

export default userModel;
