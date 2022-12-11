//  asyncHandler is equal to some function that return another function (callback fun )that another function has acess to  req res
const asyncHandler = (controllerfunction) => (req, res, next) =>
  Promise.resolve(controllerfunction(req, res, next)).catch(next);

  module.exports = asyncHandler