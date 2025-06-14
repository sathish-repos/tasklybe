import cors from "cors";
import express from "express";

import { PORT } from "./src/config/environment.js";
import authRouter from "./src/routes/auth.routes.js";
import connectToMongoDB from "./src/database/mongoose.js";
import cookieParser from "cookie-parser";
import errorMiddleware from "./src/middlewares/error.middleware.js";
import taskRouter from "./src/routes/task.routes.js";

const app = express();

const allowedDomains = ["http://localhost:4200"];

const corsOptions = {
  origin: allowedDomains,
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/tasks", taskRouter);

app.get("/", (req, res) => {
  res.send(`<h1> Welcome to Tasklybe Backend ;)`);
});

app.use(errorMiddleware);

// Ensure DB connects before server starts accepting requests
const startServer = async () => {
  try {
    await connectToMongoDB();
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
};

startServer();

export default app;
