import sendResponse from "../middlewares/response.middleware.js";
import Task from "../models/task.model.js";

export const createTask = async (req, res, next) => {
  try {
    // const dueDate = "2025-06-15T12:02:07.878Z";
    const task = await Task.create({
      ...req.body,
      userId: req.user._id,
    });
    sendResponse(res, 201, "task created successfully!", { task });
  } catch (error) {
    next(error);
  }
};

export const getTask = async (req, res, next) => {
  try {
    let task = await Task.findById(req.params.id);

    if (!task)
      sendResponse(res, 404, `Task with ID: ${req.params.id} is not found!`);

    if (task.userId.toString() !== req.user._id.toString())
      sendResponse(res, 401, "Unauthorized user");

    sendResponse(res, 200, `Got the task with ID: ${req.params.id}`, { task });
  } catch (error) {
    next(error);
  }
};

export const getUserTasks = async (req, res, next) => {
  try {
    if (req.user._id.toString() !== req.params.id)
      sendResponse(res, 401, "Unauthorized user");

    const tasks = await Task.find();

    sendResponse(res, 200, `Got all tasks with user ID: ${req.params.id}`, {
      tasks,
    });
  } catch (error) {
    next(error);
  }
};
