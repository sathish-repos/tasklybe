import { Router } from "express";
import {
  createTask,
  deleteTask,
  getTask,
  getUserTasks,
  updateTask,
} from "../controllers/task.controller.js";
import authorize from "../middlewares/auth.middleware.js";

const taskRouter = Router();

taskRouter.get("/:id", authorize, getTask);

taskRouter.get("/user/:id", authorize, getUserTasks);

taskRouter.post("/", authorize, createTask);

taskRouter.patch("/:id", authorize, updateTask);

taskRouter.delete("/delete/:id", authorize, deleteTask);

export default taskRouter;
