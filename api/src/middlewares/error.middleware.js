const errorMiddleware = (err, req, res, next) => {
  try {
    let error = {};
    error.statusCode = err.status || err.statusCode || 500;
    error.message = err.message || "internal server error";
    error.success = false;
    error.errors = err.errors || null;

    console.log("error middleware: ", err);

    if (err.name === "ValidationError") {
      const messages = Object.values(err.errors).map((val) => val.message);
      error.message = messages.join(", ");
    }

    res.status(error.statusCode).json(error);
  } catch (error) {
    next(error);
  }
};

export default errorMiddleware;
