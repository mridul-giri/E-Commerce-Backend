import { Request, Response } from "express";
import userModel from "../models/userModel";
import bcrypt from "bcrypt";
import Jwt from "jsonwebtoken";
import { RequestType } from "../types/requestTypes";
import adminModel from "../models/adminModel";
import { ExpressError } from "../utils/expressError";

export const signUp = async (req: Request, res: Response): Promise<any> => {
  // Check if user already exist
  const existingUser = await userModel.findOne({ email: req.body.email });
  if (existingUser)
    throw new ExpressError(403, "This email has already been taken");

  // Hash password and create user
  const newUser = await userModel.create({
    username: req.body.username,
    email: req.body.email,
    password: await bcrypt.hash(req.body.password, 10),
  });

  return res.status(200).json(newUser);
};

export const signIn = async (req: Request, res: Response): Promise<any> => {
  // Check if user exist & compare password
  const findUser = await userModel.findOne({ email: req.body.email });
  if (
    findUser &&
    (await bcrypt.compare(req.body.password, findUser.password))
  ) {
    // Generate token
    const token = Jwt.sign({ id: findUser._id }, process.env.SECRET_KEY!);
    return res.status(200).json(token);
  }
  throw new ExpressError(404, "Invalid email or password");
};

export const editUser = async (
  req: RequestType,
  res: Response
): Promise<any> => {
  const currentUser = await userModel.findById({ _id: req.userId });
  if (!currentUser) throw new ExpressError(404, "You are not logged in");

  // Update user fields
  const allowedfields = ["username", "email", "password"];
  for (let field of allowedfields) {
    if (req.body[field]) {
      if (field == "password") {
        const hashedPassword = await bcrypt.hash(req.body[field], 10);
        currentUser.password = hashedPassword;
      } else {
        (currentUser as any)[field] = req.body[field];
      }
    }
    await currentUser.save();
  }

  return res.status(200).json(currentUser);
};

export const deleteUser = async (
  req: RequestType,
  res: Response
): Promise<any> => {
  const findUser = await userModel.findByIdAndDelete({ _id: req.userId });
  if (!findUser) throw new ExpressError(404, "User not found");
  return res.status(200).json({
    message: "User deleted",
  });
};

// Admin Signin
export const adminSignin = async (
  req: Request,
  res: Response
): Promise<any> => {
  // // Validate request data
  // const data = { email, password };
  // const result = signinSchema.safeParse(data);
  // if (!result.success) {
  //   const resultError = result.error?.errors.map((err) => ({
  //     fiels: err.path[0],
  //     message: err.message,
  //   }));
  //   return res.status(400).json({ success: false, message: resultError });
  // }

  const findAdmin = await adminModel.findOne({ email: req.body.email });
  if (
    findAdmin &&
    (await bcrypt.compare(req.body.password, findAdmin.password))
  ) {
    // Generate admin token
    const adminToken = Jwt.sign({ id: findAdmin._id }, process.env.SECRET_KEY!);
    return res.status(200).json(adminToken);
  }
  throw new ExpressError(404, "Invalid email or password ");
};
