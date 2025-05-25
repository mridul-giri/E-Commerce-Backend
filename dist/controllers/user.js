"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminSignin = exports.deleteUser = exports.editUser = exports.signIn = exports.signUp = void 0;
const userModel_1 = __importDefault(require("../models/userModel"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const adminModel_1 = __importDefault(require("../models/adminModel"));
const expressError_1 = require("../utils/expressError");
const signUp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Check if user already exist
    const existingUser = yield userModel_1.default.findOne({ email: req.body.email });
    if (existingUser)
        throw new expressError_1.ExpressError(403, "This email has already been taken");
    // Hash password and create user
    const newUser = yield userModel_1.default.create({
        username: req.body.username,
        email: req.body.email,
        password: yield bcrypt_1.default.hash(req.body.password, 10),
    });
    return res.status(200).json(newUser);
});
exports.signUp = signUp;
const signIn = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Check if user exist & compare password
    const findUser = yield userModel_1.default.findOne({ email: req.body.email });
    if (findUser &&
        (yield bcrypt_1.default.compare(req.body.password, findUser.password))) {
        // Generate token
        const token = jsonwebtoken_1.default.sign({ id: findUser._id }, process.env.SECRET_KEY);
        return res.status(200).json(token);
    }
    throw new expressError_1.ExpressError(404, "Invalid email or password");
});
exports.signIn = signIn;
const editUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const currentUser = yield userModel_1.default.findById({ _id: req.userId });
    if (!currentUser)
        throw new expressError_1.ExpressError(404, "You are not logged in");
    // Update user fields
    const allowedfields = ["username", "email", "password"];
    for (let field of allowedfields) {
        if (req.body[field]) {
            if (field == "password") {
                const hashedPassword = yield bcrypt_1.default.hash(req.body[field], 10);
                currentUser.password = hashedPassword;
            }
            else {
                currentUser[field] = req.body[field];
            }
        }
        yield currentUser.save();
    }
    return res.status(200).json(currentUser);
});
exports.editUser = editUser;
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const findUser = yield userModel_1.default.findByIdAndDelete({ _id: req.userId });
    if (!findUser)
        throw new expressError_1.ExpressError(404, "User not found");
    return res.status(200).json({
        message: "User deleted",
    });
});
exports.deleteUser = deleteUser;
// Admin Signin
const adminSignin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
    const findAdmin = yield adminModel_1.default.findOne({ email: req.body.email });
    if (findAdmin &&
        (yield bcrypt_1.default.compare(req.body.password, findAdmin.password))) {
        // Generate admin token
        const adminToken = jsonwebtoken_1.default.sign({ id: findAdmin._id }, process.env.SECRET_KEY);
        return res.status(200).json(adminToken);
    }
    throw new expressError_1.ExpressError(404, "Invalid email or password ");
});
exports.adminSignin = adminSignin;
