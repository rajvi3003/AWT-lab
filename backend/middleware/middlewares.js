const ErrorHander = require("../utils/handler");

exports.authorizeAdmin = () => {
  return (req, res, next) => {
    if (!req.user.isAdmin) {
      return next(
        new ErrorHander(
          `Role: ${req.user.role} is not allowed to access this resouce `,
          403
        )
      );
    }
    next();
  };
};

exports.authorizeClubPresident = () => {
  return (req, res, next) => {
    if (!req.user.isClubPresident) {
      return next(
        new ErrorHander(
          `Role: ${req.user.role} is not allowed to access this resouce `,
          403
        )
      );
    }
    next();
  };
};
