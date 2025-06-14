import { Router } from "express";
import { getTask, getUserTasks } from "../controllers/task.controller.js";

const taskRouter = Router();

taskRouter.get("/:id", getTask);

taskRouter.get("/user/:id", getUserTasks);

export default taskRouter;
