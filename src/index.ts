import express from "express";
import dotenv from "dotenv";
import userRouter from "./routes/user";
import productRouter from "./routes/product";
import cartRouter from "./routes/cart";
import { ExpressError } from "./utils/expressError";
import { Request, Response, NextFunction } from "express";
import dbConnect from "./config/dbConnect";

const app = express();
const port = process.env.PORT || 3000;
dotenv.config();

// db connection
dbConnect();

app.use(express.json());

// api endpoints
app.use("/api/v1", userRouter);
app.use("/api/v1/product", productRouter);
app.use("/api/v1/product", cartRouter);

app.all(/(.*)/, (req, res, next) => {
  next(new ExpressError(404, "Page Not Found"));
});

// error handler middleware
app.use(
  (err: ExpressError, req: Request, res: Response, next: NextFunction) => {
    let { statusCode = 500, message = "Internal server error" } = err;
    res.status(statusCode).json({ message: message });
  }
);

app.listen(port);
