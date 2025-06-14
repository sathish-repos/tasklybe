import sendResponse from "../middlewares/response.middleware.js";

export const getTask = async (req, res, next) => {
  try {
    let task = {};
    sendResponse(res, 200, `Got the task with ID: ${req.params.id}`, { task });
  } catch (error) {
    next(error);
  }
};

export const getUserTasks = async (req, res, next) => {
  try {
    let tasks = [];
    sendResponse(res, 200, `Got all tasks with user ID: ${req.params.id}`, {
      tasks,
    });
  } catch (error) {
    next(error);
  }
};
