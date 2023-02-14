exports.errorMiddleware = (error, req, res, next) => {
  let customError = {
    statusCode: error.statusCode || 500,
    message: error.message || "Nåt blev fel, försök igen senare!",
  };

  if (process.env.NODE_ENV === "development") {
    console.error(error);

    customError.message =
      errormessage || "Det finns ingen error... *viftar med handen*";
    customError.error = error;
  }

  if (error.name === "ValidationError") {
    customError.validationErrors = Object.values(error.errors).map(
      (item) => item.message
    );

    customError.statusCode = 400;
  }

  if (error.code && error.code === 11000) {
    customError.message = `Duplicate value entered for ${Object.keys(
      error.keyValue
    )} field, please choose another value`;
    customError.statusCode = 400;
  }

  if (error.name === "CastError") {
    customError.message = `no item found with id : ${error.value}`;
    customError.statusCode = 400;
  }

  if (error.name === "CastError") {
    customError.message = `no item found with id : ${error.value}`;
    customError.statusCode = 404;
  }

  return res.status(customError.statusCode).json(customError);
};
