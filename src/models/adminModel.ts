import mongoose from "mongoose";

interface IAdmin {
  username: string;
  email: string;
  password: string;
}

const adminSchema = new mongoose.Schema<IAdmin>({
  username: { type: String, trim: true, required: true },
  email: {
    type: String,
    unique: true,
    match: /.+\@.+\..+/,
    required: true,
  },
  password: { type: String, required: true },
});

const adminModel =
  (mongoose.models.Admin as mongoose.Model<IAdmin>) ||
  mongoose.model<IAdmin>("Admin", adminSchema);

export default adminModel;
