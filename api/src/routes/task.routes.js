import { Router } from "express";
import {
  createTask,
  getTask,
  getUserTasks,
} from "../controllers/task.controller.js";
import authorize from "../middlewares/auth.middleware.js";

const taskRouter = Router();

taskRouter.get("/:id", authorize, getTask);

taskRouter.get("/user/:id", authorize, getUserTasks);

taskRouter.post("/", authorize, createTask);

export default taskRouter;
