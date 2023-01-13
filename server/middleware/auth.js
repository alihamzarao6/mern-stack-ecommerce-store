const User = require("../models/userModel");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("./catchAsyncErrors");
const jwt = require("jsonwebtoken");

exports.isAuthenticatedUser = catchAsyncErrors(async (req, res, next) => {
  // const token=req.body.token
  // console.log(req.headers.token);
  // console.log(req.headers);

  
  // const { token } = req.cookies;
  // console.log("🚀 ~ file: auth.js:8 ~ exports.isAuthenticatedUser=catchAsyncErrors ~ token", req.cookies)
  
  // console.log(req);
  
  const token= req.headers.token.split(' ')[1];
  // console.log(token);

  if (!token) {
    return next(new ErrorHandler("Please Login to access this resource", 401));
  }

  const decodedData = jwt.verify(token, process.env.JWT_SECRET);
  // console.log(decodedData);
  req.user = await User.findById(decodedData.id);

  next();
});

exports.authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new ErrorHandler(
          `Role: ${req.user.role} is not allowed to access this resouce `,
          403
        )
      );
    }

    next();
  };
};
