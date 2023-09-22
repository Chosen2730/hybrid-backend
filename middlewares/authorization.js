const jwt = require("jsonwebtoken");
const { UnauthenticatedError } = require("../errors/index");
const authorizeUser = (req, res, next) => {
  const authorization = req.headers.authorization;
  if (!authorization || !authorization.startsWith("Bearer")) {
    throw new UnauthenticatedError(
      "You are not authorized to access this route"
    );
  }
  const token = authorization.split(" ")[1];
  if (!token) {
    throw new UnauthenticatedError("Authorization failed");
  }
  const tokenUser = jwt.verify(token, process.env.JWT_SECRET).user;
  req.user = tokenUser;
  next();
};

module.exports = authorizeUser;
