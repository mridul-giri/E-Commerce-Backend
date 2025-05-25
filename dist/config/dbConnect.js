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
const mongoose_1 = __importDefault(require("mongoose"));
const defaultAdmin_1 = require("../utils/defaultAdmin");
const connection = { isConnected: false };
const dbConnect = () => __awaiter(void 0, void 0, void 0, function* () {
    if (connection.isConnected) {
        console.log("Already connected to database");
        return;
    }
    const URI = process.env.MONGODB_URI || "mongodb://localhost:27017/e-commerce-backend"; // If URI is not defined, it will automatically connect to the local db.
    try {
        yield mongoose_1.default.connect(URI);
        connection.isConnected = true;
        console.log("Connected to database");
        (0, defaultAdmin_1.createDefaultAdmin)(); // Calling create default admin function
    }
    catch (error) {
        console.log("Database Connection Failed: ", error);
        process.exit(1);
    }
});
exports.default = dbConnect;
