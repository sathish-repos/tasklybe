const errorMiddleware = (err, req, res, next) => {
  try {
    let error = {};
    error.statusCode = err.status || 500;
    error.message = err.message || "internal server error";
    error.success = false;
    error.errors = err.errors || null;

    console.log("error middleware: ", error);

    res.status(error.statusCode).json(error);
  } catch (error) {
    next(error);
  }
};

export default errorMiddleware;
