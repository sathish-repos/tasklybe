const sendResponse = (
  res,
  statusCode = 200,
  message = "successful",
  data = null,
  success = null
) => {
  // If success is not explicitly set, infer from statusCode
  if (success === null) {
    success = statusCode >= 200 && statusCode < 400;
  }
  res.status(statusCode).json({
    statusCode,
    success,
    message,
    data,
  });
};

export default sendResponse;
