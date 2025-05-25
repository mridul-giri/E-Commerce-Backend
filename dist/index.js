"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const user_1 = __importDefault(require("./routes/user"));
const product_1 = __importDefault(require("./routes/product"));
const cart_1 = __importDefault(require("./routes/cart"));
const expressError_1 = require("./utils/expressError");
const dbConnect_1 = __importDefault(require("./config/dbConnect"));
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
dotenv_1.default.config();
// db connection
(0, dbConnect_1.default)();
app.use(express_1.default.json());
// api endpoints
app.use("/api/v1", user_1.default);
app.use("/api/v1/product", product_1.default);
app.use("/api/v1/product", cart_1.default);
app.all(/(.*)/, (req, res, next) => {
    next(new expressError_1.ExpressError(404, "Page Not Found"));
});
// error handler middleware
app.use((err, req, res, next) => {
    let { statusCode = 500, message = "Internal server error" } = err;
    res.status(statusCode).json({ message: message });
});
app.listen(port);
