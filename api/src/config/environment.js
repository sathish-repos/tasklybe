import { config } from "dotenv";

config({ path: `.env.${process.env.NODE_ENV || "dev"}.local` });

export const { PORT, NODE_ENV, MONGO_URI, JWT_SECRET, JWT_EXPIRATION } =
  process.env;
