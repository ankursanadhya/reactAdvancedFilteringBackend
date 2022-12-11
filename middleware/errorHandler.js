const ErrorResponse = require("../utils/errorResponse");
const errorHandler = (err, req, res, next) => {
  console.log(err);
  let error = { ...error };
  error.message = err.message;
  // when mongodb id find and not found cast error

  if (err.name === "castError") {
    const message = "Resource not found";
    error = new ErrorResponse(message, 404);
  }
  if (err.code === 11000) {
    const message = "Dublicate value entered";
    error = new ErrorResponse(message, 400);
  }
  //   when we have validation error our error will be another
  //   error of object we are creating array of those errors

  if (err.name === "validationError") {
    const message = Object.values(err.errors)
      .map((error) => error.message)
      .join(",");
    error = new ErrorResponse(message, 400);
  }

  res.status(error.statusCode || 500).json({
    success: false,
    error: error.message || "Server Error",
  });
};
module.exports = errorHandler;
