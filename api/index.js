import express from "express";

import { PORT } from "./src/config/environment.js";
import connectToMongoDB from "./src/database/mongoose.js";
import cookieParser from "cookie-parser";
import authRouter from "./src/routes/auth.routes.js";
import errorMiddleware from "./src/middlewares/error.middleware.js";
import User from "./src/models/user.model.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/api/v1/auth", authRouter);

app.get("/api/v1/users", async (req, res) => {
  const users = await User.find();
  res.send({ users });
});

app.get("/", (req, res) => {
  res.send(`<h1> Welcome to Tasklybe Backend ;)`);
});

app.use(errorMiddleware);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  connectToMongoDB();
});

export default app;
