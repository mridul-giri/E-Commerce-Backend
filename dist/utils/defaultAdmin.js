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
exports.createDefaultAdmin = void 0;
const adminModel_1 = __importDefault(require("../models/adminModel"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const createDefaultAdmin = () => __awaiter(void 0, void 0, void 0, function* () {
    const existingAdmin = yield adminModel_1.default.findOne({ email: "admin@gmail.com" });
    if (existingAdmin)
        return; // Return if admin exist
    const hashedPassword = yield bcrypt_1.default.hash(process.env.ADMIN_PASSWORD, 10);
    yield adminModel_1.default.create({
        username: "Admin",
        email: "admin@gmail.com",
        password: hashedPassword,
    });
    console.log("Admin created successfully!");
});
exports.createDefaultAdmin = createDefaultAdmin;
