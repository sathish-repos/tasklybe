import { NODE_ENV, MONGO_URI } from "../config/environment.js";
import mongoose from "mongoose";

if (!MONGO_URI) {
  throw new Error(
    `MongoDB URI is missing in ${NODE_ENV || "unknown"} environment file`
  );
}

const connectToMongoDB = async () => {
  try {
    // Use recommended options for mongoose.connect
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`Connected to MongoDB in ${NODE_ENV || "unknown"} environment`);
  } catch (error) {
    console.error(`Failed to connect to MongoDB: ${error.message}`);
    process.exit(1);
  }
};

export default connectToMongoDB;
