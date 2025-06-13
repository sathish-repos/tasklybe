import sendResponse from "../middlewares/response.middleware.js";

export const signUp = (req, res, next) => {
  try {
    sendResponse(res, 200, "signed up");
  } catch (error) {
    next(error);
  }
};

export const signIn = (req, res, next) => {
  try {
    sendResponse(res, 200, "signed in");
  } catch (error) {
    next(error);
  }
};
