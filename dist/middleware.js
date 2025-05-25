"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const expressError_1 = require("./utils/expressError");
const authMiddleware = (req, res, next) => {
    // Fetching authorization header
    const header = req.headers["authorization"];
    // Verify header
    const decoded = jsonwebtoken_1.default.verify(header, process.env.SECRET_KEY);
    if (decoded) {
        req.userId = decoded.id; // Set decoded Id to the req body
        return next();
    }
    throw new expressError_1.ExpressError(403, "Invalid token");
};
exports.authMiddleware = authMiddleware;
