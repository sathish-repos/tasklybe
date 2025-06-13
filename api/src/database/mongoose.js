import mongoose from "mongoose";

import { NODE_ENV, MONGO_URI } from "../config/environment.js";

if (!MONGO_URI) {
  throw new Error(`Mongo DB URI is missing in ${NODE_ENV} environment file`);
}

const connectToMongoDB = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log(`connected to mongoDB in ${NODE_ENV} environment`);
  } catch (error) {
    console.log(`Failed to connect to MongoDB: ${error.message}`);
    process.exit(1);
  }
};

export default connectToMongoDB;
