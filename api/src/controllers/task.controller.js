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
    const userId = req.params.id;
    if (req.user._id.toString() !== req.params.id)
      sendResponse(res, 401, "Unauthorized user");

    const tasks = await Task.find({ userId });

    sendResponse(res, 200, `Got all tasks with user ID: ${req.params.id}`, {
      tasks,
    });
  } catch (error) {
    next(error);
  }
};

export const updateTask = async (req, res, next) => {
  try {
    if (req.user._id.toString() !== req.body.userId)
      sendResponse(res, 401, "Unauthorized user");

    const taskId = req.params.id;
    const updatedTask = req.body;

    const result = await Task.findByIdAndUpdate(taskId, updatedTask, {
      new: true,
    });

    if (!result) return sendResponse(res, 400, "Updating unsuccessful!");

    sendResponse(res, 201, "Updated successfully!", { result }, true);
  } catch (error) {
    next(error);
  }
};

export const deleteTask = async (req, res, next) => {
  try {
    const taskId = req.params.id;
    const task = await Task.findById(taskId);

    if (!task) return sendResponse(res, 404, "Task not found!");

    if (req.user._id.toString() !== task.userId.toString())
      sendResponse(res, 401, "Unauthorized user");

    await Task.findByIdAndDelete(taskId);

    sendResponse(res, 200, "Deleted successfully!", null, true);
  } catch (error) {
    next(error);
  }
};
