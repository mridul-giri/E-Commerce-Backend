import adminModel from "../models/adminModel";
import bcrypt from "bcrypt";

export const createDefaultAdmin = async () => {
  const existingAdmin = await adminModel.findOne({ email: "admin@gmail.com" });
  if (existingAdmin) return; // Return if admin exist

  const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD!, 10);

  await adminModel.create({
    username: "Admin",
    email: "admin@gmail.com",
    password: hashedPassword,
  });

  console.log("Admin created successfully!");
};
