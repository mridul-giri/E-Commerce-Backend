import express from "express";
import {
  adminSignin,
  deleteUser,
  editUser,
  signIn,
  signUp,
} from "../controllers/user";
import { authMiddleware } from "../middleware";
import { asyncHandler } from "../utils/asyncHandler";

const userRouter = express.Router();

userRouter.post("/users/signup", asyncHandler(signUp));
userRouter.post("/users/signin", asyncHandler(signIn));
userRouter.patch("/users/edit", authMiddleware, asyncHandler(editUser));
userRouter.delete("/users/delete", authMiddleware, asyncHandler(deleteUser));

userRouter.post("/admin/signin", asyncHandler(adminSignin));

export default userRouter;
