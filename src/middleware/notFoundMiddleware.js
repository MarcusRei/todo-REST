const path = require("path");
const { NotFoundError } = require("../utils/errors");

exports.notFoundMiddleware = (req, res, next) => {
  const isApiPath = req.path && req.path.startsWith("/api/");

  if (isApiPath) {
    throw new NotFoundError("Den här endpointen finns ju inte...dumjävel");
  } else {
    return res
      .status(404)
      .sendFile(path.join(__dirname, "..", "views", "notFound.html"));
  }
};
