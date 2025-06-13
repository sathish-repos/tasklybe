import express from "express";
import { PORT } from "./src/config/environment.js";

const app = express();

app.get("/", (req, res) => {
  res.send(`<h1> Welcome to Tasklybe Backend ;)`);
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

export default app;
