const errorMiddleware = (err, req, res, next) => {
  try {
    let statusCode = err.statusCode || err.status || 500;
    let message = err.message || "Internal server error";
    let errors = err.errors || null;

    // Handle Mongoose validation errors
    if (err.name === "ValidationError") {
      const messages = Object.values(err.errors).map((val) => val.message);
      message = messages.join(", ");
      statusCode = 400;
    }

    // Handle duplicate key error (e.g., unique email)
    if (err.code && err.code === 11000) {
      message = `Duplicate value for: ${Object.keys(err.keyValue).join(", ")}`;
      statusCode = 409;
    }

    console.error("Error middleware:", err);

    res.status(statusCode).json({
      statusCode,
      success: false,
      message,
      errors,
    });
  } catch (error) {
    // If error handling itself fails, send generic error
    res.status(500).json({
      statusCode: 500,
      success: false,
      message: "Internal server error",
      errors: null,
    });
  }
};

export default errorMiddleware;
