const { UnauthenticatedError, UnauthorizedError } = require("../utils/errors");
const jwt = require("jsonwebtoken");

exports.isAuthenticated = async (req, res, next) => {
  let token;

  //Plockar authorization header
  const authHeader = req.headers.authorization;

  //Kollar om headern innehåller en token och separerar ut vår token
  if (authHeader && authHeader.startsWith("Bearer")) {
    token = authHeader.split(" ")[1];
  }

  if (!token) {
    throw new UnauthenticatedError("Autentiseringen är fucked bror!");
  }

  try {
    //Plocka fram vår payload ur vår token
    const payload = jwt.verify(token, process.env.JWT_SECRET);

    //Lägg vår token-info i vårt request objekt
    req.user = {
      userId: payload.userId,
      role: payload.role,
      username: payload.username,
    };

    //Hoppa vidare till nästa middleware
    next();
  } catch (error) {
    throw new UnauthenticatedError("Autentiseringen är fucked bror!");
  }
};

//Den här måste placeras efter vår autentisering

exports.authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!req.user?.role || !roles.includes(req, user.role)) {
      throw new UnauthorizedError(
        "Unauthorized Access eller Halt! Här får ingen passera!"
      );
    }
    next();
  };
};
