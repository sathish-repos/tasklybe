import { config } from "dotenv";

const envFile = `.env.${process.env.NODE_ENV || "dev"}.local`;
config({ path: envFile });

export const { PORT, NODE_ENV, MONGO_URI, JWT_SECRET, JWT_EXPIRATION } =
  process.env;

if (!MONGO_URI) {
  throw new Error(`MONGO_URI is not set. Check your environment variables and the file: ${envFile}`);
}
