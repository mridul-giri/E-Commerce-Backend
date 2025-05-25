import mongoose from "mongoose";
import { createDefaultAdmin } from "../utils/defaultAdmin";

type connectionType = { isConnected: boolean };

const connection: connectionType = { isConnected: false };

const dbConnect = async () => {
  if (connection.isConnected) {
    console.log("Already connected to database");
    return;
  }
  const URI =
    process.env.MONGODB_URI || "mongodb://localhost:27017/e-commerce-backend"; // If URI is not defined, it will automatically connect to the local db.

  try {
    await mongoose.connect(URI);
    connection.isConnected = true;
    console.log("Connected to database");
    createDefaultAdmin(); // Calling create default admin function
  } catch (error) {
    console.log("Database Connection Failed: ", error);
    process.exit(1);
  }
};

export default dbConnect;
