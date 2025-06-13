const sendResponse = (
  res,
  statusCode = 200,
  message = "successful",
  data = null,
  success = true
) => {
  res.status(statusCode).json({
    statusCode,
    success,
    message,
    data,
  });
};

export default sendResponse;
