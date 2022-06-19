const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const reqToken = req.headers.authorization;
  if (reqToken) {
    const token = reqToken.split(" ")[1];
    jwt.verify(token, process.env.SECRET_KEY, (error, user) => {
      if (error) {
        res.status(403).json({
          message: "Invalid token"
        });
      }
      req.user = user;
      next();
    });
  } else {
    return res.status(401).json({
      message: "You are not authenticated"
    });
  }
};

const verifyAuthorizeToken = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.id === req.params.id || req.user.admin) {
      next();
    } else {
      res.status(403).json({
        message: "Account is limited to perform action"
      });
    }
  });
};

const verifyAdminToken = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.admin) {
      next();
    } else {
      res.status(403).json({
        message: "Unable to verify account as admin"
      });
    }
  });
};

module.exports = {
  verifyToken,
  verifyAuthorizeToken,
  verifyAdminToken,
};
