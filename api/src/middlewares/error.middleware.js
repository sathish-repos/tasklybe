const errorMiddleware = (err, req, res, next) => {
  try {
    let error = {};
    error.statusCode = err.statusCode || 500;
    error.message = err.message || "internal server error";
    error.success = false;
    error.data = req.data || null;

    console.log("error middleware: ", error);

    res.status(statusCode).json(error);
  } catch (error) {
    next(error);
  }
};

export default errorMiddleware;
