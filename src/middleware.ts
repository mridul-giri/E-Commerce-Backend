import { NextFunction, Request, Response } from "express";
import Jwt, { JwtPayload } from "jsonwebtoken";
import { RequestType } from "./types/requestTypes";
import { ExpressError } from "./utils/expressError";

export const authMiddleware = (
  req: RequestType,
  res: Response,
  next: NextFunction
) => {
  // Fetching authorization header
  const header = req.headers["authorization"];

  // Verify header
  const decoded = Jwt.verify(
    header as string,
    process.env.SECRET_KEY!
  ) as JwtPayload;

  if (decoded) {
    req.userId = decoded.id; // Set decoded Id to the req body
    return next();
  }
  throw new ExpressError(403, "Invalid token");
};
